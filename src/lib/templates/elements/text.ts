import { z } from "zod"
import { AlignmentOptions, FontFamilyOptions } from "@/types"

export const textSchema = z.object({
  text: z.string().min(1).max(500),
  fontFamily: z.nativeEnum(FontFamilyOptions).default(FontFamilyOptions.INTER),
  fontWeight: z.number().min(100).max(900).step(100).default(400),
  fontSize: z.number().min(8).max(200).default(24),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).default("#000000"),
  alignment: z.nativeEnum(AlignmentOptions).default(AlignmentOptions.LEFT),
})

export type TextElement = z.infer<typeof textSchema>

// Font weight presets
export const FONT_WEIGHTS = {
  THIN: 100,
  EXTRA_LIGHT: 200,
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMI_BOLD: 600,
  BOLD: 700,
  EXTRA_BOLD: 800,
  BLACK: 900,
} as const

// Common text presets
export const TEXT_PRESETS = {
  TITLE: {
    fontSize: 48,
    fontWeight: FONT_WEIGHTS.BOLD,
    color: "#000000",
  },
  SUBTITLE: {
    fontSize: 32,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    color: "#333333",
  },
  BODY: {
    fontSize: 24,
    fontWeight: FONT_WEIGHTS.REGULAR,
    color: "#666666",
  },
  CAPTION: {
    fontSize: 16,
    fontWeight: FONT_WEIGHTS.LIGHT,
    color: "#999999",
  },
} as const