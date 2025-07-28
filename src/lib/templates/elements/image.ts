import { z } from "zod"

export const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  width: z.number().min(1).optional(),
  height: z.number().min(1).optional(),
  objectFit: z.enum(["cover", "contain", "fill", "none", "scale-down"]).default("cover"),
  borderRadius: z.number().min(0).max(50).default(0),
})

export type ImageElement = z.infer<typeof imageSchema>

// Logo image schema (typically smaller, square)
export const logoSchema = imageSchema.extend({
  width: z.number().min(20).max(200).default(60),
  height: z.number().min(20).max(200).default(60),
  borderRadius: z.number().min(0).max(50).default(8),
})

// Avatar image schema (typically circular)
export const avatarSchema = imageSchema.extend({
  width: z.number().min(30).max(150).default(80),
  height: z.number().min(30).max(150).default(80),
  borderRadius: z.number().min(0).max(50).default(50), // Circular by default
})

// Common image presets
export const IMAGE_PRESETS = {
  LOGO_SMALL: { width: 40, height: 40, borderRadius: 8 },
  LOGO_MEDIUM: { width: 60, height: 60, borderRadius: 8 },
  LOGO_LARGE: { width: 80, height: 80, borderRadius: 8 },
  AVATAR_SMALL: { width: 50, height: 50, borderRadius: 50 },
  AVATAR_MEDIUM: { width: 80, height: 80, borderRadius: 50 },
  AVATAR_LARGE: { width: 120, height: 120, borderRadius: 50 },
  BANNER: { width: 1080, height: 300, borderRadius: 0 },
} as const