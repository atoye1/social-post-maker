# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Social Post Maker is a modern web application for generating Instagram posts with both UI and CLI support. It combines the best features from two predecessor projects to create a comprehensive solution for data-driven social media content creation.

## Architecture

### Technology Stack
- **Next.js 15** with App Router for the main application
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Zod** for schema validation
- **Satori** for server-side image generation
- **Recharts** for data visualization components

### Project Structure
```
src/
├── app/                          # Next.js App Router
│   ├── api/v1/                  # RESTful API endpoints
│   │   ├── images/route.tsx     # Image generation API
│   │   └── templates/route.tsx  # Template management API
│   ├── (editor)/                # Editor page group
│   ├── fonts/                   # Custom fonts
│   └── layout.tsx              # Root layout
├── components/
│   ├── editor/                  # Editor UI components
│   ├── templates/               # Template React components
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   └── forms/                  # Form components
├── lib/
│   ├── templates/              # Template definitions and schemas
│   │   ├── elements/           # Shared template elements
│   │   └── schemas/            # Zod validation schemas
│   ├── utils/                  # Utility functions
│   └── fonts/                  # Font management
├── stores/                     # Zustand state stores
└── types/                      # TypeScript type definitions

legacy/                         # Previous React implementation (archived)
instagram-posts-generator/      # Reference Next.js implementation
stat_based_insta_posts/        # Korean ranking table examples
```

## Development Commands

### Primary Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Jest tests
```

### Code Formatting
```bash
npm run format:write    # Format code with Prettier
npm run format:check    # Check code formatting
```

### Legacy Support
```bash
npm run legacy:start    # Run legacy React app
npm run legacy:build    # Build legacy React app
```

## Template System

### Template Architecture
Templates are defined using Zod schemas and rendered as React components for both UI preview and server-side image generation.

### Core Template Types
1. **Social Media Templates** - 9GAG, Pubity, TDT style posts
2. **Data Visualization** - Charts, graphs, infographics
3. **Ranking Tables** - Korean-style statistical rankings
4. **Business Cards** - Professional branding templates
5. **Quote Cards** - Text-focused inspirational posts

### Template Definition Pattern
```typescript
// Schema definition (lib/templates/[name].ts)
export const templateSchema = z.object({
  name: z.literal("template-name"),
  params: z.object({
    // Template-specific parameters
  }),
  canvas: canvasSchema,
})

// React component (components/templates/[name].tsx)
export const Template = ({ template }: { template: TemplateType }) => {
  // JSX for both preview and image generation
}
```

## State Management

### Zustand Stores
- **Template Store** - Current template state, parameters, canvas settings
- **UI Store** - Editor state, selected tools, preview modes
- **Theme Store** - Dark/light mode, user preferences

### Store Pattern
```typescript
export const useTemplateStore = create<TemplateStore>((set, get) => ({
  // State
  template: defaultTemplate,
  // Actions
  updateTemplate: (updates) => set(state => ({ 
    template: { ...state.template, ...updates } 
  })),
}))
```

## API Design

### Image Generation Endpoint
`POST /api/v1/images`
- Validates template data with Zod schemas
- Generates images using Satori + @resvg/resvg-wasm
- Supports rate limiting (100 requests/minute per IP)
- Returns optimized PNG images

### Template Management
`GET /api/v1/templates` - List available templates
`POST /api/v1/templates` - Create custom template

## Component Patterns

### UI Components (shadcn/ui)
- Located in `src/components/ui/`
- Consistent design system based on Radix UI
- Tailwind CSS for styling

### Template Components
- Pure functions that render SVG-compatible JSX
- Support both browser preview and server-side rendering
- Use inline styles for Satori compatibility

### Form Components
- Zod-validated forms with React Hook Form
- Type-safe parameter editing
- Real-time preview updates

## Data-Driven Templates

### Inspiration Sources
- @infobeautiful (Information is Beautiful)
- Mona Chalabi (Guardian/FiveThirtyEight style)
- @surrealdataviz (Witty data visualization)
- Korean ranking format (from stat_based_insta_posts)

### Chart Types Supported
- Bar charts, line graphs, pie charts
- Ranking tables with logos/images
- Statistical comparisons
- Time-series data visualization

## CLI Support

The application supports JSON-based CLI input for automated post generation:

```bash
curl -X POST http://localhost:3000/api/v1/images \
  -H "Content-Type: application/json" \
  -d @template.json \
  -o output.png
```

## Testing Strategy

### Unit Tests
- Template schema validation
- Utility functions
- Store actions and state updates

### Integration Tests
- API endpoint functionality
- Image generation pipeline
- Template rendering accuracy

### Visual Tests
- Component snapshots
- Generated image consistency

## Performance Considerations

### Image Generation
- Server-side rendering with edge runtime
- Font caching and optimization
- Compression for web delivery

### Frontend Optimization
- Next.js Image component for assets
- Code splitting for template components
- Lazy loading for large template galleries

## Migration from Legacy

The `legacy/` folder contains the previous React implementation. Key architectural changes:

1. **State Management**: Redux Toolkit → Zustand
2. **Styling**: Sass modules → Tailwind CSS
3. **Rendering**: String templating → React components
4. **Build System**: Create React App → Next.js

## Environment Variables

Required for production:
```env
UPSTASH_REDIS_REST_URL=    # For rate limiting
UPSTASH_REDIS_REST_TOKEN=  # For rate limiting
```

## Common Patterns

### Adding New Templates
1. Define Zod schema in `lib/templates/[name].ts`
2. Create React component in `components/templates/[name].tsx`
3. Add to template registry in `lib/templates/index.ts`
4. Create form components for parameter editing

### Data Integration
1. Use Recharts for interactive data visualization
2. Support CSV/JSON data import
3. Validate data structure with Zod
4. Provide sensible defaults for missing data

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive preview modes in editor
- Touch-friendly interface elements
- Canvas zoom and pan functionality