import type MatrixConfig from "components/system/Desktop/Wallpapers/Matrix/config";
import type TartanConfig from "components/system/Desktop/Wallpapers/Tartan/config";
import type { VantaCloudsConfig } from "components/system/Desktop/Wallpapers/vantaClouds/types";
import type { VantaWavesConfig } from "components/system/Desktop/Wallpapers/vantaWaves/types";
import type { Size } from "components/system/Window/RndWindow/useResizable";

export type WallpaperConfig =
  | Partial<typeof MatrixConfig>
  | Partial<typeof TartanConfig>
  | VantaCloudsConfig
  | VantaWavesConfig;

export type WallpaperFunc = (
  el: HTMLCanvasElement | HTMLDivElement | HTMLElement | null,
  config?: WallpaperConfig
) => Promise<void> | void;

export type OffscreenRenderProps = {
  canvas: OffscreenCanvas;
  clockSize?: Size;
  config?: VantaCloudsConfig | VantaWavesConfig;
  devicePixelRatio: number;
};
