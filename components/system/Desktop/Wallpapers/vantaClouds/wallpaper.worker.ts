import type { OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";
import {
  config,
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

let cloudEffect: VantaClouds;

globalThis.addEventListener(
  "message",
  ({ data }: { data: DOMRect | OffscreenRenderProps | string }) => {
    if (typeof WebGLRenderingContext === "undefined") return;

    if (data === "init") {
      globalThis.importScripts(...libs);
    } else if (data instanceof DOMRect) {
      const { width, height } = data;

      cloudEffect?.renderer.setSize(width, height);
      cloudEffect?.resize();
    } else {
      const {
        canvas,
        config: offscreenConfig,
        devicePixelRatio,
      } = data as OffscreenRenderProps;
      const {
        VANTACLOUDS: { current: currentEffect = cloudEffect, CLOUDS } = {},
      } = globalThis;

      // eslint-disable-next-line no-console
      console.log("globalThis", globalThis);

      if (!canvas || !CLOUDS) return;
      if (currentEffect) currentEffect.destroy();

      cloudEffect = CLOUDS({
        ...(config || offscreenConfig),
        canvas,
        devicePixelRatio,
      });
    }
  },
  { passive: true }
);
