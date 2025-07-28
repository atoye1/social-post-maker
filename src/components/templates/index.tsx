import { Template } from "@/lib/templates"
import { RankingTableTemplate } from "./ranking-table"
import { DataVizTemplate } from "./data-viz"
import { NineGagTemplate } from "./9gag"
import { PubityTemplate } from "./pubity"
import { QuoteCardTemplate } from "./quote-card"

// Template component registry
export const templates = {
  "ranking-table": {
    Template: RankingTableTemplate,
    name: "Ranking Table",
    description: "Korean-style ranking tables with logos and descriptions",
  },
  "data-viz": {
    Template: DataVizTemplate,
    name: "Data Visualization",
    description: "Interactive charts and data visualizations",
  },
  "9gag": {
    Template: NineGagTemplate,
    name: "9GAG Meme",
    description: "Classic 9GAG meme format",
  },
  "pubity": {
    Template: PubityTemplate,
    name: "Pubity Style",
    description: "Viral content format",
  },
  "quote-card": {
    Template: QuoteCardTemplate,
    name: "Quote Card",
    description: "Beautiful quote cards",
  },
} as const

// Template renderer component
interface TemplateRendererProps {
  template: Template
}

export function TemplateRenderer({ template }: TemplateRendererProps) {
  const templateConfig = templates[template.name as keyof typeof templates]
  
  if (!templateConfig) {
    return (
      <div style={{ 
        width: template.canvas.width, 
        height: template.canvas.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F4F6",
        color: "#6B7280",
        fontSize: "18px",
        fontFamily: "inter",
      }}>
        Template "{template.name}" not found
      </div>
    )
  }

  const { Template: TemplateComponent } = templateConfig
  
  // @ts-ignore - Dynamic template rendering with type assertion
  return <TemplateComponent template={template} />
}