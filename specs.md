# Social Post Maker - Comprehensive Project Specifications

## Project Overview

A modern web-based Instagram post generator that combines the best features from multiple legacy projects. The application allows users to create visually appealing social media posts through both web UI and CLI interfaces.

## Current Status Analysis

### ✅ Completed Components

1. **Infrastructure Setup**
   - Next.js 15 with App Router
   - TypeScript configuration
   - Tailwind CSS styling
   - Zustand state management
   - API routes for image generation

2. **Template System**
   - Base template schemas with Zod validation
   - Template renderer component system
   - Server-side image generation with Next.js ImageResponse

3. **Working Templates**
   - Ranking Table (Korean-style) - ✅ Fully functional
   - Data Visualization - ⚠️ Partially working (Satori rendering issues)

### 🚧 In Progress Issues

1. **Data Visualization Templates**
   - SVG `<text>` elements not supported by Satori
   - Need to convert to CSS-based layouts
   - Bar chart and pie chart components need refactoring

2. **Missing Templates from Legacy Code**
   - 9GAG style posts
   - Pubity style posts
   - TDT (The Daily Telegraph) style
   - Tatva India style
   - Additional data visualization styles from stat_based_insta_posts

### ❌ Not Started

1. **CLI Support**
   - JSON input processing
   - Command-line interface
   - Batch generation

2. **UI Components**
   - Editor interface
   - Live preview
   - Template gallery
   - Export functionality

## Required Specifications

### 1. Template Requirements

#### 1.1 Social Media Templates (from legacy)
```typescript
interface SocialMediaTemplate {
  name: "9gag" | "pubity" | "tdt" | "tatva-india"
  params: {
    title: {
      text: string
      bgColor: string
      fontSize: number
      fontWeight: number
    }
    background: {
      type: "image" | "color"
      value: string // URL or hex color
    }
    position: "top" | "bottom" | "center"
    logo?: {
      url: string
      position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
    }
    watermark?: {
      text: string
      position: "bottom-right"
    }
  }
}
```

#### 1.2 Enhanced Data Visualization Templates
```typescript
interface DataVisualizationTemplate {
  name: "bar-chart" | "pie-chart" | "line-chart" | "infographic"
  style: "mona-chalabi" | "information-is-beautiful" | "minimalist"
  params: {
    // ... existing params
    annotations?: {
      arrows?: Array<{
        from: { x: number; y: number }
        to: { x: number; y: number }
        text: string
      }>
      highlights?: Array<{
        dataIndex: number
        style: "circle" | "underline" | "box"
      }>
    }
    handDrawnEffect?: boolean // For Mona Chalabi style
  }
}
```

#### 1.3 Legacy stat_based_insta_posts Templates
- Korean news style rankings
- Comparison tables with icons
- Before/After visualizations
- Timeline graphics
- Statistical infographics with illustrations

### 2. Technical Requirements

#### 2.1 Satori/ImageResponse Constraints
- No SVG `<text>` elements - use CSS text
- All divs with multiple children need explicit `display: flex`
- Limited CSS support - avoid complex animations
- Font loading must be handled properly
- Maximum image size constraints

#### 2.2 Performance Requirements
- Image generation < 3 seconds
- Support for batch generation
- Caching for repeated templates
- CDN-ready output formats

### 3. UI/UX Requirements

#### 3.1 Web Interface
```typescript
interface EditorUI {
  components: {
    TemplateGallery: {
      categories: string[]
      search: boolean
      preview: boolean
    }
    PropertyEditor: {
      livePreview: boolean
      undo/redo: boolean
      presets: boolean
    }
    ExportOptions: {
      formats: ["png", "jpg", "webp"]
      sizes: ["1080x1080", "1080x1920", "1200x630"]
      quality: number // 0-100
    }
  }
}
```

#### 3.2 CLI Interface
```bash
# Basic usage
social-post-maker generate --template ranking-table --data data.json --output output.png

# Batch generation
social-post-maker batch --config batch-config.json --output-dir ./outputs

# Available commands
- generate: Create single image
- batch: Create multiple images
- list-templates: Show available templates
- validate: Validate JSON data against template schema
```

### 4. Data Input Requirements

#### 4.1 JSON Schema for CLI
```json
{
  "template": "ranking-table",
  "output": {
    "filename": "output.png",
    "format": "png",
    "quality": 95
  },
  "data": {
    // Template-specific data matching Zod schemas
  }
}
```

#### 4.2 Batch Configuration
```json
{
  "defaults": {
    "format": "png",
    "quality": 95,
    "outputDir": "./outputs"
  },
  "posts": [
    {
      "template": "ranking-table",
      "filename": "korean-brands.png",
      "data": { /* ... */ }
    },
    {
      "template": "bar-chart",
      "filename": "screen-time.png",
      "data": { /* ... */ }
    }
  ]
}
```

### 5. Design System Requirements

#### 5.1 Typography
- Primary: Inter (Latin)
- Korean: Noto Sans KR
- Decorative: Custom fonts for specific templates
- Sizes: Responsive scaling based on canvas size

#### 5.2 Color Palettes
```typescript
const palettes = {
  modern: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"],
  pastel: ["#BFDBFE", "#FCA5A5", "#86EFAC", "#FDE68A"],
  monochrome: ["#1F2937", "#4B5563", "#6B7280", "#9CA3AF"],
  korean: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
}
```

#### 5.3 Layout Systems
- Grid-based layouts for structured content
- Flexible layouts for creative templates
- Responsive scaling for different aspect ratios

### 6. Integration Requirements

#### 6.1 Export Integrations
- Direct upload to social media APIs
- Cloud storage integration (S3, Cloudinary)
- Webhook notifications for batch jobs

#### 6.2 Data Source Integrations
- CSV import for bulk data
- Google Sheets integration
- REST API for dynamic data

### 7. Quality & Testing Requirements

#### 7.1 Visual Testing
- Screenshot comparison tests
- Cross-browser rendering validation
- Font rendering consistency

#### 7.2 Performance Testing
- Load testing for concurrent generations
- Memory usage optimization
- CDN performance metrics

### 8. Deployment Requirements

#### 8.1 Infrastructure
- Vercel/Netlify deployment ready
- Docker containerization
- Environment variable management

#### 8.2 Monitoring
- Error tracking (Sentry)
- Performance monitoring
- Usage analytics

## Priority Implementation Order

1. **High Priority**
   - Fix data visualization rendering issues
   - Import missing templates from legacy code
   - Implement basic web UI with template gallery

2. **Medium Priority**
   - Add CLI support with JSON input
   - Implement batch generation
   - Add more template variations

3. **Low Priority**
   - Social media API integrations
   - Advanced analytics
   - Collaborative features

## Success Criteria

1. All templates render correctly with aesthetic appeal
2. Generation time < 3 seconds per image
3. Support for Korean and English content
4. CLI and web interfaces fully functional
5. Comprehensive test coverage
6. Production-ready deployment

## Appendix: Legacy Code Assets to Import

1. **From src folder**
   - HTML string templates
   - Redux template configurations
   - UI component designs

2. **From instagram-posts-generator**
   - Modern component architecture
   - Zustand store patterns
   - Next.js 15 setup

3. **From stat_based_insta_posts**
   - Korean ranking table designs
   - Data visualization styles
   - Color schemes and typography

## Next Steps

1. Review and approve specifications
2. Fix current rendering issues
3. Import missing templates
4. Build UI components
5. Implement CLI
6. Deploy and test