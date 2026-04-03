import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NEXT_OUTPUT === "export",
  },
  output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
};

export default nextConfig;
