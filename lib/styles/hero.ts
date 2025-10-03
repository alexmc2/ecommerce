// lib/styles/hero.ts
import { cn } from "@/lib/utils";

type HeroTitleFontFamily = "sans" | "display" | "serif" | "mono";
type HeroTitleFontWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";
type HeroTitleFontSize = "sm" | "md" | "lg" | "xl" | "2xl";

export type HeroTitleStyle = {
  fontFamily?: HeroTitleFontFamily | null;
  fontWeight?: HeroTitleFontWeight | null;
  fontSize?: HeroTitleFontSize | null;
};

type HeroTitleDefaults = {
  fontFamily?: HeroTitleFontFamily;
  fontWeight?: HeroTitleFontWeight;
  fontSize?: HeroTitleFontSize;
};

const fontFamilyClassMap: Record<HeroTitleFontFamily, string> = {
  sans: "font-sans",
  display: "font-[var(--font-display)]",
  serif: "font-serif",
  mono: "font-mono",
};

const fontWeightClassMap: Record<HeroTitleFontWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const fontSizeClassMap: Record<HeroTitleFontSize, string> = {
  sm: "text-3xl md:text-4xl lg:text-5xl",
  md: "text-4xl md:text-5xl lg:text-6xl",
  lg: "text-5xl md:text-6xl lg:text-7xl",
  xl: "text-6xl md:text-7xl lg:text-8xl",
  "2xl": "text-7xl md:text-8xl lg:text-9xl",
};

export const getHeroTitleClasses = (
  style?: HeroTitleStyle | null,
  defaults?: HeroTitleDefaults
) => {
  const fontFamily = style?.fontFamily ?? defaults?.fontFamily ?? "display";
  const fontWeight = style?.fontWeight ?? defaults?.fontWeight ?? "bold";
  const fontSize = style?.fontSize ?? defaults?.fontSize ?? "md";

  return cn(
    fontFamilyClassMap[fontFamily],
    fontWeightClassMap[fontWeight],
    fontSizeClassMap[fontSize]
  );
};
