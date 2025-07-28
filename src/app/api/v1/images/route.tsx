import { ImageResponse } from "next/og"
import { NextResponse, type NextRequest } from "next/server"
import { templateSchema, validateTemplate } from "@/lib/templates"
import { TemplateRenderer } from "@/components/templates"

export const runtime = "edge"

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    console.log("Received template data:", JSON.stringify(body, null, 2))
    
    // For now, skip validation to identify the issue
    // const template = validateTemplate(body)
    // if (!template) {
    //   console.error("Template validation failed for:", body)
    //   return new NextResponse("Invalid template data", { status: 400 })
    // }
    
    const template = body as any // Temporarily bypass validation
    
    console.log("Processing template:", template.name)

    // Ensure we have required fields
    if (!template.canvas?.width || !template.canvas?.height) {
      return new NextResponse("Missing canvas dimensions", { status: 400 })
    }

    // Generate image using Satori
    return new ImageResponse(
      <TemplateRenderer template={template} />,
      {
        width: template.canvas.width,
        height: template.canvas.height,
      }
    )
  } catch (error: any) {
    console.error("Image generation error:", error)
    console.error("Stack trace:", error.stack)
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to generate image", 
        message: error.message,
        stack: error.stack 
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    )
  }
}

// GET method to test the API
export async function GET() {
  return NextResponse.json({
    message: "Image generation API is running",
    usage: "POST with template data to generate images",
    example: {
      name: "ranking-table",
      params: {
        title: {
          text: "Top 10 Brands",
          fontSize: 32,
          color: "#000000",
        },
        // ... other template params
      },
      canvas: {
        width: 1080,
        height: 1080,
      },
    },
  })
}