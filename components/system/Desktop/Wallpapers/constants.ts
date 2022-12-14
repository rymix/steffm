import type { WallpaperFunc } from "components/system/Desktop/Wallpapers/types";
import type { WallpaperFit } from "contexts/session/types";

export const cssFit: Record<WallpaperFit, string> = {
  center: "background-repeat: no-repeat;",
  fill: "background-size: cover;",
  fit: `
    background-repeat: no-repeat;
    background-size: contain;
  `,
  stretch: "background-size: 100% 100%;",
  tile: "",
};

export const WALLPAPER_PATHS: Record<
  string,
  () => Promise<{ default: WallpaperFunc }>
> = {
  MATRIX: () => import("components/system/Desktop/Wallpapers/Matrix"),
  TARTAN: () => import("components/system/Desktop/Wallpapers/Tartan"),
  VANTACLOUDS: () => import("components/system/Desktop/Wallpapers/vantaClouds"),
};

export const WALLPAPER_WORKERS: Record<string, (info?: string) => Worker> = {
  VANTACLOUDSCYCLE: (info?: string): Worker =>
    new Worker(
      new URL(
        "components/system/Desktop/Wallpapers/vantaClouds/wallpaper.worker.cycle",
        import.meta.url
      ),
      {
        name: `Wallpaper (Vanta Clouds Day/Night Cycle)${
          info ? ` [${info}]` : ""
        }`,
      }
    ),
  VANTACLOUDSDAY: (info?: string): Worker =>
    new Worker(
      new URL(
        "components/system/Desktop/Wallpapers/vantaClouds/wallpaper.worker.day",
        import.meta.url
      ),
      { name: `Wallpaper (Vanta Clouds Day)${info ? ` [${info}]` : ""}` }
    ),
  VANTACLOUDSNIGHT: (info?: string): Worker =>
    new Worker(
      new URL(
        "components/system/Desktop/Wallpapers/vantaClouds/wallpaper.worker.night",
        import.meta.url
      ),
      { name: `Wallpaper (Vanta Clouds Night)${info ? ` [${info}]` : ""}` }
    ),
};

export const BASE_CANVAS_SELECTOR = ":scope > canvas";
