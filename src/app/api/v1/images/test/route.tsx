import { ImageResponse } from "next/og"
import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            width: 1080,
            height: 1080,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f4f6",
            fontSize: 48,
            fontWeight: "bold",
          }}
        >
          Test Image Generation
        </div>
      ),
      {
        width: 1080,
        height: 1080,
      }
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}