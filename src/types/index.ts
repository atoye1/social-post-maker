// Core types for the social post maker application

export enum AlignmentOptions {
  LEFT = "flex-start",
  CENTER = "center", 
  RIGHT = "flex-end",
}

export enum PositionOptions {
  TOP = "top",
  BOTTOM = "bottom",
  CENTER = "center",
}

export enum FontFamilyOptions {
  INTER = "inter",
  ROBOTO = "roboto", 
  OPEN_SANS = "open-sans",
  LATO = "lato",
  MONTSERRAT = "montserrat",
  POPPINS = "poppins",
}

export interface CanvasSize {
  width: number;
  height: number;
}

export interface TextElement {
  text: string;
  fontFamily: FontFamilyOptions;
  fontWeight: number;
  fontSize: number;
  color: string;
  alignment: AlignmentOptions;
}

export interface ImageElement {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BackgroundElement {
  type: "color" | "image" | "gradient";
  value: string; // Color hex, image URL, or gradient CSS
}

export interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TableRow {
  rank: number;
  name: string;
  logo?: string;
  category: string;
  description: string;
  value?: string | number;
}

// Template base interface
export interface BaseTemplate {
  name: string;
  canvas: CanvasSize;
  params: Record<string, any>;
}

// Specific template types
export interface SocialMediaTemplate extends BaseTemplate {
  name: "9gag" | "pubity" | "tdt" | "tatva-india";
  params: {
    title: TextElement & { bgColor: string };
    background: ImageElement;
    position: PositionOptions;
  };
}

export interface DataVisualizationTemplate extends BaseTemplate {
  name: "bar-chart" | "line-chart" | "pie-chart" | "infographic";
  params: {
    title: TextElement;
    data: DataPoint[];
    background: BackgroundElement;
    showLegend: boolean;
    showValues: boolean;
  };
}

export interface RankingTableTemplate extends BaseTemplate {
  name: "ranking-table" | "comparison-table";
  params: {
    title: TextElement;
    subtitle?: TextElement;
    data: TableRow[];
    background: BackgroundElement;
    headerColor: string;
    alternateRowColor: boolean;
  };
}

export type Template = SocialMediaTemplate | DataVisualizationTemplate | RankingTableTemplate;

// Store types
export interface TemplateState extends BaseTemplate {
  previewSvg: string | null;
}

export interface UIState {
  selectedTemplate: string | null;
  isGenerating: boolean;
  sidebarOpen: boolean;
  previewMode: "mobile" | "desktop";
}

export interface ThemeState {
  mode: "light" | "dark" | "system";
  primaryColor: string;
}