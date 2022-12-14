import type { WallpaperConfig } from "components/system/Desktop/Wallpapers/types";
import {
  disableControls,
  libs,
  nightColors,
} from "components/system/Desktop/Wallpapers/vantaClouds/config";
import type { VantaCloudsConfig } from "components/system/Desktop/Wallpapers/vantaClouds/types";
import { loadFiles } from "utils/functions";

const vantaClouds = (
  el: HTMLElement | null,
  config: WallpaperConfig = {} as WallpaperConfig
): void => {
  const { VANTACLOUDS: { current: currentEffect } = {} } = window;

  try {
    currentEffect?.destroy();
  } catch {
    // Failed to cleanup effect
  }

  if (!el || typeof WebGLRenderingContext === "undefined") return;

  loadFiles(libs, true).then(() => {
    const { VANTACLOUDS: { CLOUDS } = {} } = window;

    if (CLOUDS) {
      CLOUDS({
        el,
        ...disableControls,
        ...nightColors,
        ...(config as VantaCloudsConfig),
      });
    }
  });
};

export default vantaClouds;
