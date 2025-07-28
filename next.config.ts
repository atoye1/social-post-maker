import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  serverExternalPackages: ["@resvg/resvg-wasm"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http", 
        hostname: "localhost",
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]
    return config
  },
}

export default nextConfig