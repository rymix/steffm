import type MatrixConfig from "components/system/Desktop/Wallpapers/Matrix/config";
import type {
  VantaCloudsConfig,
  VantaCloudsObject,
} from "components/system/Desktop/Wallpapers/vantaClouds/types";
import type {
  VantaWavesConfig,
  VantaWavesObject,
} from "components/system/Desktop/Wallpapers/vantaWaves/types";
import type { Size } from "components/system/Window/RndWindow/useResizable";

export type WallpaperConfig = Partial<typeof MatrixConfig> | VantaWavesConfig;

export type WallpaperFunc = (
  el: HTMLElement | null,
  config?: WallpaperConfig
) => Promise<void> | void;

export type OffscreenRenderProps = {
  canvas: OffscreenCanvas;
  clockSize?: Size;
  config?: VantaCloudsConfig | VantaWavesConfig;
  devicePixelRatio: number;
};

declare global {
  interface Window {
    THREE: unknown;
    VANTA: VantaCloudsObject | VantaWavesObject;
  }
}
