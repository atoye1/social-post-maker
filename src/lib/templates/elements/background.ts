import { z } from "zod"

export const backgroundSchema = z.object({
  type: z.enum(["color", "image", "gradient"]).default("color"),
  value: z.string(),
  opacity: z.number().min(0).max(1).default(1),
})

export type BackgroundElement = z.infer<typeof backgroundSchema>

// Color background schema
export const colorBackgroundSchema = backgroundSchema.extend({
  type: z.literal("color"),
  value: z.string().regex(/^#[0-9A-F]{6}$/i),
})

// Image background schema  
export const imageBackgroundSchema = backgroundSchema.extend({
  type: z.literal("image"),
  value: z.string().url(),
  objectFit: z.enum(["cover", "contain", "fill", "none"]).default("cover"),
})

// Gradient background schema
export const gradientBackgroundSchema = backgroundSchema.extend({
  type: z.literal("gradient"),
  value: z.string(), // CSS gradient string
  direction: z.enum(["to right", "to left", "to bottom", "to top", "to bottom right"]).default("to bottom"),
})

// Common background presets
export const BACKGROUND_PRESETS = {
  WHITE: { type: "color" as const, value: "#FFFFFF", opacity: 1 },
  BLACK: { type: "color" as const, value: "#000000", opacity: 1 },
  BLUE_GRADIENT: { 
    type: "gradient" as const, 
    value: "linear-gradient(to bottom, #667eea 0%, #764ba2 100%)", 
    opacity: 1 
  },
  SUNSET_GRADIENT: { 
    type: "gradient" as const, 
    value: "linear-gradient(to bottom, #f093fb 0%, #f5576c 100%)", 
    opacity: 1 
  },
  OCEAN_GRADIENT: { 
    type: "gradient" as const, 
    value: "linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)", 
    opacity: 1 
  },
} as const