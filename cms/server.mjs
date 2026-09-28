import { createServer } from "node:http";
import { timingSafeEqual } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const port = Number(process.env.CMS_PORT ?? 4000);
const token = process.env.CMS_ADMIN_TOKEN;
const contentDirectory = path.resolve(process.env.CMS_CONTENT_DIR ?? path.join(process.cwd(), "content"));
const maxBodySize = 1024 * 1024;
const requiredFields = ["entityId", "entityName", "entityType", "version", "status", "created", "updated"];

if (!token) {
  console.error("CMS_ADMIN_TOKEN must be configured before the CMS service can start.");
  process.exit(1);
}

function authorized(request) {
  const supplied = request.headers.authorization?.replace(/^Bearer\s+/i, "") ?? "";
  const expected = Buffer.from(token);
  const received = Buffer.from(supplied);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

function send(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function filenameFromUrl(url) {
  const value = decodeURIComponent(url.split("?")[0].replace("/entities/", ""));
  if (!/^[a-z0-9][a-z0-9-]*\.md$/i.test(value)) return null;
  return value;
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodySize) throw new Error("Request body exceeds 1 MB.");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function validateMarkdown(content) {
  const parsed = matter(content);
  const missing = requiredFields.filter((field) => parsed.data[field] === undefined);
  if (missing.length) throw new Error(`Missing required frontmatter: ${missing.join(", ")}`);
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === "GET" && request.url === "/health") {
      send(response, 200, { ok: true, service: "cms" });
      return;
    }
    if (!authorized(request)) {
      send(response, 401, { error: "Unauthorized" });
      return;
    }
    const filename = request.url?.startsWith("/entities/") ? filenameFromUrl(request.url) : null;
    if (!filename) {
      send(response, 404, { error: "Use /entities/<filename>.md" });
      return;
    }
    const filePath = path.join(contentDirectory, filename);
    if (request.method === "PUT" || request.method === "POST") {
      const content = await readBody(request);
      validateMarkdown(content);
      await mkdir(contentDirectory, { recursive: true });
      await writeFile(filePath, content, "utf8");
      send(response, 200, { ok: true, filename });
      return;
    }
    if (request.method === "GET") {
      const content = await readFile(filePath, "utf8");
      send(response, 200, { filename, content });
      return;
    }
    if (request.method === "DELETE") {
      await unlink(filePath);
      send(response, 200, { ok: true, filename });
      return;
    }
    send(response, 405, { error: "Method not allowed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    send(response, message.includes("ENOENT") ? 404 : 400, { error: message });
  }
});

server.listen(port, () => {
  console.log(`CMS service listening on http://localhost:${port}`);
  console.log(`Content directory: ${contentDirectory}`);
});
