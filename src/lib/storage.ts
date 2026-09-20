import { del, list, put } from "@vercel/blob";
import fs from "node:fs/promises";
import path from "node:path";

export type ContentStorage = {
  get(key: string): Promise<string | null>;
  put(key: string, content: string): Promise<void>;
  delete(key: string): Promise<void>;
};

class BlobContentStorage implements ContentStorage {
  async get(key: string) {
    const result = await list({ prefix: key, limit: 1 });
    const blob = result.blobs[0];
    if (!blob) return null;
    const response = await fetch(blob.url, { cache: "no-store" });
    return response.ok ? response.text() : null;
  }

  async put(key: string, content: string) {
    await put(key, content, { access: "public", addRandomSuffix: false });
  }

  async delete(key: string) {
    await del(key);
  }
}

class LocalContentStorage implements ContentStorage {
  private root = path.join(process.cwd(), "content");

  async get(key: string) {
    try {
      return await fs.readFile(path.join(this.root, key), "utf8");
    } catch {
      return null;
    }
  }

  async put(key: string, content: string) {
    await fs.mkdir(this.root, { recursive: true });
    await fs.writeFile(path.join(this.root, key), content, "utf8");
  }

  async delete(key: string) {
    await fs.rm(path.join(this.root, key), { force: true });
  }
}

export function getContentStorage(): ContentStorage {
  if (process.env.BLOB_READ_WRITE_TOKEN) return new BlobContentStorage();
  return new LocalContentStorage();
}
