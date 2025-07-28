import { z } from "zod"

export const canvasSchema = z.object({
  width: z.number().min(100).max(2000).default(1080),
  height: z.number().min(100).max(2000).default(1080),
})

export type Canvas = z.infer<typeof canvasSchema>

// Common canvas presets
export const CANVAS_PRESETS = {
  INSTAGRAM_SQUARE: { width: 1080, height: 1080 },
  INSTAGRAM_PORTRAIT: { width: 1080, height: 1350 },
  INSTAGRAM_STORY: { width: 1080, height: 1920 },
  TWITTER_POST: { width: 1200, height: 675 },
  FACEBOOK_POST: { width: 1200, height: 630 },
  LINKEDIN_POST: { width: 1200, height: 627 },
} as const