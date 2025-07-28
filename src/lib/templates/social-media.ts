import { z } from "zod"
import { AlignmentOptions, FontFamilyOptions, PositionOptions } from "@/types"
import { canvasSchema } from "./elements/canvas"
import { textSchema } from "./elements/text"
import { backgroundSchema } from "./elements/background"
import { imageSchema } from "./elements/image"

// 9GAG style template schema
export const ninegagSchema = z.object({
  name: z.literal("9gag"),
  params: z.object({
    title: textSchema.merge(
      z.object({
        bgColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#000000"),
        position: z.nativeEnum(PositionOptions).default(PositionOptions.TOP),
      })
    ),
    mainImage: imageSchema,
    background: backgroundSchema,
    watermark: z.object({
      show: z.boolean().default(true),
      text: z.string().default("@9GAG"),
      position: z.enum(["top-left", "top-right", "bottom-left", "bottom-right"]).default("bottom-right"),
    }),
  }),
  canvas: canvasSchema,
})

// Pubity style template schema
export const pubitySchema = z.object({
  name: z.literal("pubity"),
  params: z.object({
    title: textSchema.merge(
      z.object({
        bgColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#FFFFFF"),
        borderColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#FF0066"),
        position: z.nativeEnum(PositionOptions).default(PositionOptions.TOP),
      })
    ),
    mainImage: imageSchema,
    background: backgroundSchema,
    hashtags: z.array(z.string()).max(10).default(["#pubity"]),
    watermark: z.object({
      show: z.boolean().default(true),
      logo: imageSchema.optional(),
    }),
  }),
  canvas: canvasSchema,
})

// TDT (The Dodo Things) style template schema
export const tdtSchema = z.object({
  name: z.literal("tdt"),
  params: z.object({
    title: textSchema.merge(
      z.object({
        style: z.enum(["bold", "playful", "emotional"]).default("playful"),
        bgColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#FFD700"),
        position: z.nativeEnum(PositionOptions).default(PositionOptions.BOTTOM),
      })
    ),
    mainImage: imageSchema,
    background: backgroundSchema,
    emoji: z.object({
      show: z.boolean().default(true),
      symbol: z.string().emoji().default("🐶"),
      size: z.number().min(24).max(120).default(48),
    }),
    watermark: z.object({
      show: z.boolean().default(true),
      text: z.string().default("THE DODO"),
      style: z.enum(["minimal", "bold"]).default("minimal"),
    }),
  }),
  canvas: canvasSchema,
})

// Quote card template schema
export const quoteCardSchema = z.object({
  name: z.literal("quote-card"),
  params: z.object({
    quote: textSchema.merge(
      z.object({
        alignment: z.nativeEnum(AlignmentOptions).default(AlignmentOptions.CENTER),
        lineHeight: z.number().min(1).max(3).default(1.5),
      })
    ),
    author: textSchema.merge(
      z.object({
        prefix: z.string().default("—"),
      })
    ),
    background: backgroundSchema,
    decoration: z.object({
      type: z.enum(["quotes", "border", "minimal", "none"]).default("quotes"),
      color: z.string().regex(/^#[0-9A-F]{6}$/i).default("#000000"),
    }),
  }),
  canvas: canvasSchema,
})

// Business card template schema
export const businessCardSchema = z.object({
  name: z.literal("business-card"),
  params: z.object({
    name: textSchema,
    title: textSchema,
    company: textSchema.optional(),
    contact: z.object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      website: z.string().url().optional(),
      linkedin: z.string().optional(),
    }),
    logo: imageSchema.optional(),
    background: backgroundSchema,
    layout: z.enum(["minimal", "modern", "classic", "creative"]).default("modern"),
    accentColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#000000"),
  }),
  canvas: canvasSchema,
})

// Type exports
export type NineGag = z.infer<typeof ninegagSchema>
export type Pubity = z.infer<typeof pubitySchema>
export type TDT = z.infer<typeof tdtSchema>
export type QuoteCard = z.infer<typeof quoteCardSchema>
export type BusinessCard = z.infer<typeof businessCardSchema>

// Default templates
export const socialMediaDefaults = {
  "9gag": {
    name: "9gag" as const,
    params: {
      title: {
        text: "When you realize it's Monday tomorrow",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 700,
        fontSize: 36,
        color: "#FFFFFF",
        alignment: AlignmentOptions.CENTER,
        bgColor: "#000000",
        position: PositionOptions.TOP,
      },
      mainImage: {
        url: "/api/placeholder/meme",
        alt: "Funny meme",
        width: 1080,
        height: 1080,
        objectFit: "cover" as const,
      },
      background: {
        type: "color" as const,
        value: "#000000",
        opacity: 1,
      },
      watermark: {
        show: true,
        text: "@9GAG",
        position: "bottom-right" as const,
      },
    },
    canvas: {
      width: 1080,
      height: 1080,
    },
  },
  "pubity": {
    name: "pubity" as const,
    params: {
      title: {
        text: "This is why we can't have nice things 😂",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 700,
        fontSize: 32,
        color: "#000000",
        alignment: AlignmentOptions.LEFT,
        bgColor: "#FFFFFF",
        borderColor: "#FF0066",
        position: PositionOptions.TOP,
      },
      mainImage: {
        url: "/api/placeholder/viral",
        alt: "Viral content",
        width: 1080,
        height: 1080,
        objectFit: "cover" as const,
      },
      background: {
        type: "color" as const,
        value: "#FFFFFF",
        opacity: 1,
      },
      hashtags: ["#pubity", "#viral", "#funny"],
      watermark: {
        show: true,
      },
    },
    canvas: {
      width: 1080,
      height: 1080,
    },
  },
  "quote-card": {
    name: "quote-card" as const,
    params: {
      quote: {
        text: "The only way to do great work is to love what you do.",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 400,
        fontSize: 48,
        color: "#000000",
        alignment: AlignmentOptions.CENTER,
        lineHeight: 1.5,
      },
      author: {
        text: "Steve Jobs",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 600,
        fontSize: 24,
        color: "#666666",
        alignment: AlignmentOptions.CENTER,
        prefix: "—",
      },
      background: {
        type: "gradient" as const,
        value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        opacity: 1,
      },
      decoration: {
        type: "quotes",
        color: "#FFFFFF",
      },
    },
    canvas: {
      width: 1080,
      height: 1080,
    },
  },
}