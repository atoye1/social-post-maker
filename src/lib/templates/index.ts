import { z } from "zod"
import { rankingTableSchema, rankingTableDefault } from "./ranking-table"
import { dataVizSchema, dataVizDefaults } from "./data-viz"
import { 
  ninegagSchema, 
  pubitySchema, 
  tdtSchema, 
  quoteCardSchema, 
  businessCardSchema,
  socialMediaDefaults 
} from "./social-media"

// Template union schema
export const templateSchema = z.discriminatedUnion("name", [
  rankingTableSchema,
  dataVizSchema,
  ninegagSchema,
  pubitySchema,
  tdtSchema,
  quoteCardSchema,
  businessCardSchema,
])

export type Template = z.infer<typeof templateSchema>

// Template defaults registry
export const templateDefaults = {
  "ranking-table": rankingTableDefault,
  "data-viz": dataVizDefaults["personal-stats"],
  "global-comparison": dataVizDefaults["global-comparison"],
  "9gag": socialMediaDefaults["9gag"],
  "pubity": socialMediaDefaults["pubity"],
  "quote-card": socialMediaDefaults["quote-card"],
} as const

// Template metadata for UI
export const templateMetadata = {
  "ranking-table": {
    name: "Ranking Table",
    description: "Korean-style ranking tables with logos and descriptions",
    category: "Tables",
    tags: ["ranking", "comparison", "korean", "business"],
    preview: "/templates/ranking-table-preview.png",
    difficulty: "Easy",
  },
  "data-viz": {
    name: "Personal Data Viz",
    description: "Personal statistics visualization (Mona Chalabi style)",
    category: "Data Visualization", 
    tags: ["personal", "statistics", "annotations", "hand-drawn"],
    preview: "/templates/data-viz-preview.png",
    difficulty: "Medium",
  },
  "global-comparison": {
    name: "Global Data Comparison",
    description: "Professional data visualization (Information is Beautiful style)",
    category: "Data Visualization",
    tags: ["global", "professional", "clean", "infographic"],
    preview: "/templates/global-comparison-preview.png", 
    difficulty: "Medium",
  },
  "9gag": {
    name: "9GAG Meme",
    description: "Classic 9GAG meme format with black header",
    category: "Social Media",
    tags: ["meme", "9gag", "funny", "viral"],
    preview: "/templates/9gag-preview.png",
    difficulty: "Easy",
  },
  "pubity": {
    name: "Pubity Style",
    description: "Pubity-inspired viral content format",
    category: "Social Media",
    tags: ["pubity", "viral", "social", "trendy"],
    preview: "/templates/pubity-preview.png",
    difficulty: "Easy",
  },
  "quote-card": {
    name: "Quote Card",
    description: "Beautiful quote cards for inspiration",
    category: "Social Media",
    tags: ["quote", "inspirational", "typography", "minimal"],
    preview: "/templates/quote-card-preview.png",
    difficulty: "Easy",
  },
} as const

// Template categories
export const templateCategories = [
  {
    id: "tables",
    name: "Tables & Rankings",
    description: "Structured data in table format",
    templates: ["ranking-table"],
  },
  {
    id: "data-viz",
    name: "Data Visualization", 
    description: "Charts, graphs, and infographics",
    templates: ["data-viz", "global-comparison"],
  },
  {
    id: "social-media",
    name: "Social Media",
    description: "Popular social media post formats", 
    templates: ["9gag", "pubity", "quote-card"],
  },
] as const

// Helper functions
export function getTemplateByName(name: string): Template | undefined {
  if (name in templateDefaults) {
    return JSON.parse(JSON.stringify(templateDefaults[name as keyof typeof templateDefaults])) as Template
  }
  return undefined
}

export function getTemplateMetadata(name: string) {
  if (name in templateMetadata) {
    return templateMetadata[name as keyof typeof templateMetadata]
  }
  return null
}

export function getTemplatesByCategory(categoryId: string) {
  const category = templateCategories.find(cat => cat.id === categoryId)
  if (!category) return []
  
  return category.templates.map(templateName => ({
    ...getTemplateByName(templateName),
    metadata: getTemplateMetadata(templateName),
  })).filter(Boolean)
}

// Validation helper
export function validateTemplate(data: unknown): Template | null {
  try {
    return templateSchema.parse(data)
  } catch (error) {
    console.error("Template validation error:", JSON.stringify(error, null, 2))
    if (error instanceof Error) {
      console.error("Error message:", error.message)
    }
    return null
  }
}