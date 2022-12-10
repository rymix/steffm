import type { OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";
import {
  config,
  disableControls,
  libs,
} from "components/system/Desktop/Wallpapers/vantaWaves/config";
import type {
  VantaWaves,
  VantaWavesObject,
} from "components/system/Desktop/Wallpapers/vantaWaves/types";

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var VANTAWAVES: VantaWavesObject;
}

let waveEffect: VantaWaves;

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
        VANTAWAVES: { current: currentEffect = waveEffect, WAVES } = {},
      } = globalThis;

      if (!canvas || !WAVES) return;
      if (currentEffect) currentEffect.destroy();

      waveEffect = WAVES({
        ...(config || offscreenConfig),
        ...disableControls,
        canvas,
        devicePixelRatio,
      });
    }
  },
  { passive: true }
);
