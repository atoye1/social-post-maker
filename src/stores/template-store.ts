import { create } from "zustand"
import { Template, templateDefaults, getTemplateByName } from "@/lib/templates"

export interface TemplateState {
  // Current template
  currentTemplate: Template | null
  previewSvg: string | null
  
  // UI state
  selectedTemplateId: string | null
  isGenerating: boolean
  generatedImageUrl: string | null
  
  // Editor state
  isDirty: boolean
  lastSaved: Date | null
  
  // Actions
  setTemplate: (templateId: string) => void
  updateTemplateParams: (params: Partial<Template["params"]>) => void
  updateCanvas: (canvas: Partial<Template["canvas"]>) => void
  setPreviewSvg: (svg: string) => void
  setGenerating: (generating: boolean) => void
  setGeneratedImageUrl: (url: string | null) => void
  resetTemplate: () => void
  markClean: () => void
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  // Initial state
  currentTemplate: templateDefaults["ranking-table"],
  previewSvg: null,
  selectedTemplateId: "ranking-table",
  isGenerating: false,
  generatedImageUrl: null,
  isDirty: false,
  lastSaved: null,

  // Actions
  setTemplate: (templateId: string) => {
    const template = getTemplateByName(templateId)
    if (template) {
      set({
        currentTemplate: template,
        selectedTemplateId: templateId,
        previewSvg: null,
        generatedImageUrl: null,
        isDirty: false,
      })
    }
  },

  updateTemplateParams: (params) => {
    const { currentTemplate } = get()
    if (currentTemplate) {
      set({
        currentTemplate: {
          ...currentTemplate,
          params: {
            ...currentTemplate.params,
            ...params,
          },
        },
        isDirty: true,
        previewSvg: null,
        generatedImageUrl: null,
      })
    }
  },

  updateCanvas: (canvas) => {
    const { currentTemplate } = get()
    if (currentTemplate) {
      set({
        currentTemplate: {
          ...currentTemplate,
          canvas: {
            ...currentTemplate.canvas,
            ...canvas,
          },
        },
        isDirty: true,
        previewSvg: null,
        generatedImageUrl: null,
      })
    }
  },

  setPreviewSvg: (svg) => {
    set({ previewSvg: svg })
  },

  setGenerating: (generating) => {
    set({ isGenerating: generating })
  },

  setGeneratedImageUrl: (url) => {
    set({ generatedImageUrl: url })
  },

  resetTemplate: () => {
    const { selectedTemplateId } = get()
    if (selectedTemplateId) {
      const template = getTemplateByName(selectedTemplateId)
      if (template) {
        set({
          currentTemplate: template,
          previewSvg: null,
          generatedImageUrl: null,
          isDirty: false,
        })
      }
    }
  },

  markClean: () => {
    set({
      isDirty: false,
      lastSaved: new Date(),
    })
  },
}))

// UI Store for editor interface state
export interface UIState {
  sidebarOpen: boolean
  selectedTab: "templates" | "settings" | "export"
  previewMode: "mobile" | "desktop" | "fullscreen"
  showGrid: boolean
  zoom: number
  
  // Actions
  setSidebarOpen: (open: boolean) => void
  setSelectedTab: (tab: "templates" | "settings" | "export") => void
  setPreviewMode: (mode: "mobile" | "desktop" | "fullscreen") => void
  setShowGrid: (show: boolean) => void
  setZoom: (zoom: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  sidebarOpen: true,
  selectedTab: "templates",
  previewMode: "desktop",
  showGrid: false,
  zoom: 1,

  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setShowGrid: (show) => set({ showGrid: show }),
  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(3, zoom)) }),
}))

// Theme Store
export interface ThemeState {
  mode: "light" | "dark" | "system"
  primaryColor: string
  
  // Actions
  setMode: (mode: "light" | "dark" | "system") => void
  setPrimaryColor: (color: string) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  // Initial state
  mode: "system",
  primaryColor: "#3B82F6",

  // Actions
  setMode: (mode) => set({ mode }),
  setPrimaryColor: (color) => set({ primaryColor: color }),
}))