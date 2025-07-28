import { z } from "zod"
import { AlignmentOptions, FontFamilyOptions } from "@/types"
import { canvasSchema } from "./elements/canvas"
import { textSchema } from "./elements/text"
import { backgroundSchema } from "./elements/background"
import { logoSchema } from "./elements/image"

// Table row schema
export const tableRowSchema = z.object({
  rank: z.number().min(1).max(100),
  name: z.string().min(1).max(50),
  logo: logoSchema.optional(),
  category: z.string().min(1).max(30),
  description: z.string().min(1).max(100),
  value: z.union([z.string(), z.number()]).optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
})

export const rankingTableSchema = z.object({
  name: z.literal("ranking-table"),
  params: z.object({
    title: textSchema.merge(
      z.object({
        bgColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#000000"),
        alignment: z.nativeEnum(AlignmentOptions).default(AlignmentOptions.CENTER),
      })
    ),
    subtitle: textSchema.optional(),
    data: z.array(tableRowSchema).min(1).max(20),
    background: backgroundSchema,
    headerStyle: z.object({
      backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#000000"),
      textColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#FFFFFF"),
      fontSize: z.number().min(12).max(32).default(16),
      fontWeight: z.number().min(400).max(900).default(600),
    }),
    rowStyle: z.object({
      alternateRowColor: z.boolean().default(true),
      primaryRowColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#FFFFFF"),
      alternateRowColorValue: z.string().regex(/^#[0-9A-F]{6}$/i).default("#F8F9FA"),
      textColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#000000"),
      borderColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#E0E0E0"),
      fontSize: z.number().min(10).max(24).default(14),
    }),
    showRankNumbers: z.boolean().default(true),
    showLogos: z.boolean().default(true),
    tableLayout: z.object({
      rankWidth: z.number().min(40).max(100).default(60),
      nameWidth: z.number().min(100).max(300).default(180),
      logoWidth: z.number().min(60).max(120).default(80),
      categoryWidth: z.number().min(80).max(200).default(120),
      descriptionWidth: z.number().min(200).max(400).default(300),
      padding: z.number().min(8).max(24).default(12),
    }),
  }),
  canvas: canvasSchema,
})

export type RankingTable = z.infer<typeof rankingTableSchema>
export type TableRow = z.infer<typeof tableRowSchema>

// Default Korean-style ranking table (inspired by the stat_based_insta_posts)
export const rankingTableDefault: RankingTable = {
  name: "ranking-table",
  params: {
    title: {
      text: "한때 잘 나갔지만 시라진 브랜드",
      fontFamily: FontFamilyOptions.INTER,
      fontWeight: 700,
      fontSize: 32,
      color: "#000000",
      alignment: AlignmentOptions.CENTER,
      bgColor: "#FFFFFF",
    },
    subtitle: {
      text: "출처: 각 브랜드의 공식 발표, 언론 보도(매일경제·한겨레·이데일리 등), 업계 지료를 기반으로 재구성",
      fontFamily: FontFamilyOptions.INTER,
      fontWeight: 400,
      fontSize: 14,
      color: "#666666",
      alignment: AlignmentOptions.CENTER,
    },
    data: [
      {
        rank: 1,
        name: "크라운베이커리",
        category: "베이커리",
        description: "전 매장 철수, 브랜드 종료",
        logo: {
          url: "/api/placeholder/logo",
          alt: "크라운베이커리",
          width: 60,
          height: 60,
          borderRadius: 8,
          objectFit: "cover" as any,
        },
      },
      {
        rank: 2,
        name: "아웃백",
        category: "레스토랑",
        description: "점범 이상 폐점, 브랜드 축소",
        logo: {
          url: "/api/placeholder/logo",
          alt: "아웃백",
          width: 60,
          height: 60,
          borderRadius: 8,
          objectFit: "cover" as any,
        },
      },
      {
        rank: 3,
        name: "민들레영토",
        category: "커피",
        description: "대부분 폐점, 주력 브랜드",
        logo: {
          url: "/api/placeholder/logo",
          alt: "민들레영토",
          width: 60,
          height: 60,
          borderRadius: 8,
          objectFit: "cover" as any,
        },
      },
    ],
    background: {
      type: "color",
      value: "#FFFFFF",
      opacity: 1,
    },
    headerStyle: {
      backgroundColor: "#000000",
      textColor: "#FFFFFF",
      fontSize: 16,
      fontWeight: 600,
    },
    rowStyle: {
      alternateRowColor: true,
      primaryRowColor: "#FFFFFF",
      alternateRowColorValue: "#F8F9FA",
      textColor: "#000000",
      borderColor: "#E0E0E0",
      fontSize: 14,
    },
    showRankNumbers: true,
    showLogos: true,
    tableLayout: {
      rankWidth: 60,
      nameWidth: 180,
      logoWidth: 80,
      categoryWidth: 120,
      descriptionWidth: 300,
      padding: 12,
    },
  },
  canvas: {
    width: 1080,
    height: 1080,
  },
}