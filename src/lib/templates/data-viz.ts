import { z } from "zod"
import { AlignmentOptions, FontFamilyOptions } from "@/types"
import { canvasSchema } from "./elements/canvas"
import { textSchema } from "./elements/text"
import { backgroundSchema } from "./elements/background"

// Data point schema for charts
export const dataPointSchema = z.object({
  label: z.string().min(1).max(50),
  value: z.number(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  description: z.string().max(100).optional(),
})

// Chart type enum
export const chartTypeSchema = z.enum(["bar", "line", "pie", "donut", "area"])

export const dataVizSchema = z.object({
  name: z.literal("data-viz"),
  params: z.object({
    title: textSchema.merge(
      z.object({
        bgColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#FFFFFF"),
        alignment: z.nativeEnum(AlignmentOptions).default(AlignmentOptions.CENTER),
      })
    ),
    subtitle: textSchema.optional(),
    chartType: chartTypeSchema.default("bar"),
    data: z.array(dataPointSchema).min(2).max(20),
    background: backgroundSchema,
    chartStyle: z.object({
      primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#3B82F6"),
      secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#EF4444"),
      accentColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#10B981"),
      gridColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#E5E7EB"),
      textColor: z.string().regex(/^#[0-9A-F]{6}$/i).default("#374151"),
      showGrid: z.boolean().default(true),
      showValues: z.boolean().default(true),
      showLegend: z.boolean().default(true),
      animation: z.boolean().default(false), // For static images
    }),
    layout: z.object({
      chartWidth: z.number().min(200).max(800).default(600),
      chartHeight: z.number().min(150).max(600).default(400),
      marginTop: z.number().min(20).max(100).default(40),
      marginBottom: z.number().min(20).max(100).default(40),
      marginLeft: z.number().min(20).max(100).default(60),
      marginRight: z.number().min(20).max(100).default(40),
    }),
    dataLabels: z.object({
      show: z.boolean().default(true),
      position: z.enum(["inside", "outside", "top", "bottom"]).default("outside"),
      fontSize: z.number().min(8).max(24).default(12),
      color: z.string().regex(/^#[0-9A-F]{6}$/i).default("#374151"),
    }),
    // Instagram-style annotations and insights
    insights: z.object({
      show: z.boolean().default(true),
      highlight: z.object({
        dataIndex: z.number().min(0).optional(),
        text: z.string().max(200).optional(),
        color: z.string().regex(/^#[0-9A-F]{6}$/i).default("#F59E0B"),
      }).optional(),
      footer: z.object({
        text: z.string().max(300).optional(),
        source: z.string().max(100).optional(),
      }).optional(),
    }),
  }),
  canvas: canvasSchema,
})

export type DataViz = z.infer<typeof dataVizSchema>
export type DataPoint = z.infer<typeof dataPointSchema>
export type ChartType = z.infer<typeof chartTypeSchema>

// Predefined color palettes (inspired by Information is Beautiful)
export const COLOR_PALETTES = {
  MODERN: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"],
  PASTEL: ["#BFDBFE", "#FCA5A5", "#86EFAC", "#FDE68A", "#DDD6FE", "#F9A8D4"],
  MONOCHROME: ["#1F2937", "#4B5563", "#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6"],
  WARM: ["#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16", "#22C55E"],
  COOL: ["#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#D946EF", "#EC4899"],
  INFOGRAPHIC: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"],
} as const

// Default templates inspired by famous Instagram data viz accounts
export const dataVizDefaults = {
  // Mona Chalabi style - hand-drawn feel with personal annotations
  "personal-stats": {
    name: "data-viz" as const,
    params: {
      title: {
        text: "How I Spend My Screen Time",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 600,
        fontSize: 36,
        color: "#1F2937",
        alignment: AlignmentOptions.LEFT,
        bgColor: "#FFFFFF",
      },
      subtitle: {
        text: "Average daily usage over the past month",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 400,
        fontSize: 18,
        color: "#6B7280",
        alignment: AlignmentOptions.LEFT,
      },
      chartType: "bar" as ChartType,
      data: [
        { label: "Social Media", value: 3.2, color: "#EF4444", description: "Too much scrolling 😅" },
        { label: "Work Apps", value: 5.8, color: "#3B82F6", description: "Productivity mode" },
        { label: "Entertainment", value: 2.1, color: "#10B981", description: "Netflix & chill" },
        { label: "Reading", value: 1.5, color: "#F59E0B", description: "Need to read more!" },
        { label: "Other", value: 0.8, color: "#8B5CF6", description: "Random apps" },
      ],
      background: { type: "color", value: "#FEFEFE", opacity: 1 },
      chartStyle: {
        primaryColor: "#3B82F6",
        secondaryColor: "#EF4444",
        accentColor: "#10B981",
        gridColor: "#F3F4F6",
        textColor: "#374151",
        showGrid: true,
        showValues: true,
        showLegend: false,
        animation: false,
      },
      layout: {
        chartWidth: 600,
        chartHeight: 400,
        marginTop: 40,
        marginBottom: 60,
        marginLeft: 80,
        marginRight: 40,
      },
      dataLabels: {
        show: true,
        position: "outside" as const,
        fontSize: 14,
        color: "#374151",
      },
      insights: {
        show: true,
        highlight: {
          dataIndex: 1,
          text: "Work takes up most of my screen time - is this healthy? 🤔",
          color: "#F59E0B",
        },
        footer: {
          text: "Data collected from iOS Screen Time settings",
          source: "@dataviz_daily",
        },
      },
    },
    canvas: { width: 1080, height: 1080 },
  },

  // Information is Beautiful style - clean, professional
  "global-comparison": {
    name: "data-viz" as const,
    params: {
      title: {
        text: "Global Internet Users by Region",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 700,
        fontSize: 42,
        color: "#000000",
        alignment: AlignmentOptions.CENTER,
        bgColor: "#FFFFFF",
      },
      subtitle: {
        text: "Number of internet users (in billions) as of 2024",
        fontFamily: FontFamilyOptions.INTER,
        fontWeight: 400,
        fontSize: 20,
        color: "#4B5563",
        alignment: AlignmentOptions.CENTER,
      },
      chartType: "pie" as ChartType,
      data: [
        { label: "Asia", value: 2.8, color: "#3B82F6" },
        { label: "Europe", value: 0.7, color: "#EF4444" },
        { label: "North America", value: 0.4, color: "#10B981" },
        { label: "South America", value: 0.3, color: "#F59E0B" },
        { label: "Africa", value: 0.6, color: "#8B5CF6" },
        { label: "Oceania", value: 0.03, color: "#EC4899" },
      ],
      background: { type: "color", value: "#FFFFFF", opacity: 1 },
      chartStyle: {
        primaryColor: "#3B82F6",
        secondaryColor: "#EF4444",
        accentColor: "#10B981",
        gridColor: "#E5E7EB",
        textColor: "#111827",
        showGrid: false,
        showValues: true,
        showLegend: true,
        animation: false,
      },
      layout: {
        chartWidth: 500,
        chartHeight: 500,
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 40,
        marginRight: 40,
      },
      dataLabels: {
        show: true,
        position: "outside" as const,
        fontSize: 16,
        color: "#111827",
      },
      insights: {
        show: true,
        highlight: {
          dataIndex: 0,
          text: "Asia represents over 60% of global internet users",
          color: "#3B82F6",
        },
        footer: {
          text: "Source: International Telecommunication Union (ITU)",
          source: "@infobeautiful",
        },
      },
    },
    canvas: { width: 1080, height: 1080 },
  },
} as const