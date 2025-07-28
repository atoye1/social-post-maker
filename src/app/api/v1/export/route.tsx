import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { TemplateRenderer } from "@/components/templates"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const template = body // Skip validation for now
    
    // Ensure we have required fields
    if (!template.canvas?.width || !template.canvas?.height) {
      return new Response(
        JSON.stringify({ error: "Missing canvas dimensions" }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      )
    }

    // Load fonts
    const geistSansFont = await fetch(
      new URL("../../../fonts/GeistVF.woff", import.meta.url)
    ).then((res) => res.arrayBuffer())

    // Generate image using ImageResponse
    return new ImageResponse(
      <TemplateRenderer template={template} />,
      {
        width: template.canvas.width,
        height: template.canvas.height,
        fonts: [
          {
            name: "Geist Sans",
            data: geistSansFont,
            weight: 400,
            style: "normal",
          },
        ],
      }
    )
  } catch (error: any) {
    console.error("Export error:", error)
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate image", 
        message: error.message 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    )
  }
}