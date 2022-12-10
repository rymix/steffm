import type { OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";
import {
  config,
  disableControls,
  libs,
} from "components/system/Desktop/Wallpapers/vantaClouds/config";
import type {
  VantaClouds,
  VantaCloudsObject,
} from "components/system/Desktop/Wallpapers/vantaClouds/types";

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var VANTACLOUDS: VantaCloudsObject;
}

let waveEffect: VantaClouds;

globalThis.addEventListener(
  "message",
  ({ data }: { data: DOMRect | OffscreenRenderProps | string }) => {
    if (typeof WebGLRenderingContext === "undefined") return;

    if (data === "init") {
      globalThis.importScripts(...libs);
    } else if (data instanceof DOMRect) {
      const { width, height } = data;

      waveEffect?.renderer.setSize(width, height);
      waveEffect?.resize();
    } else {
      const {
        canvas,
        config: offscreenConfig,
        devicePixelRatio,
      } = data as OffscreenRenderProps;
      const {
        VANTACLOUDS: { current: currentEffect = waveEffect, CLOUDS } = {},
      } = globalThis;

      if (!canvas || !CLOUDS) return;
      if (currentEffect) currentEffect.destroy();

      waveEffect = CLOUDS({
        ...(offscreenConfig || config),
        ...disableControls,
        canvas,
        devicePixelRatio,
      });
    }
  },
  { passive: true }
);
