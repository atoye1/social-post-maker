import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params
  
  const typeConfigs = {
    logo: {
      width: 200,
      height: 200,
      bg: "#e5e7eb",
      text: "LOGO",
    },
    meme: {
      width: 1080,
      height: 1080,
      bg: "#374151",
      text: "MEME",
    },
    viral: {
      width: 1080,
      height: 1080,
      bg: "#ef4444",
      text: "VIRAL",
    },
  }

  const config = typeConfigs[type as keyof typeof typeConfigs] || typeConfigs.logo

  return new ImageResponse(
    (
      <div
        style={{
          width: config.width,
          height: config.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: config.bg,
          color: "#ffffff",
          fontSize: config.width > 500 ? 72 : 24,
          fontWeight: "bold",
          fontFamily: "sans-serif",
        }}
      >
        {config.text}
      </div>
    ),
    {
      width: config.width,
      height: config.height,
    }
  )
}