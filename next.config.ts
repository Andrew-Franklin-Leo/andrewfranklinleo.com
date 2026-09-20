import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.GITHUB_PAGES === "true" ? "/andrewfranklinleo.com" : "",
  assetPrefix: process.env.GITHUB_PAGES === "true" ? "/andrewfranklinleo.com/" : undefined,
};

export default nextConfig;
