import { NextResponse } from "next/server"
import { templateDefaults, templateMetadata, templateCategories } from "@/lib/templates"

export async function GET() {
  try {
    // Return all available templates with metadata
    const templates = Object.entries(templateDefaults).map(([key, template]) => ({
      id: key,
      template,
      metadata: templateMetadata[key as keyof typeof templateMetadata],
    }))

    return NextResponse.json({
      templates,
      categories: templateCategories,
      total: templates.length,
    })
  } catch (error) {
    console.error("Templates API error:", error)
    return new Response("Failed to fetch templates", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // This could be used for saving custom templates in the future
    const body = await request.json()
    
    return NextResponse.json({
      message: "Custom template creation not yet implemented",
      received: body,
    }, { status: 501 })
  } catch (error) {
    console.error("Template creation error:", error)
    return new Response("Failed to create template", { status: 500 })
  }
}