import type { OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";

export type VantaCloudsConfig = {
  // backgroundColor: { space: string; values: number[] };
  cloudColor: number;
  cloudShadowColor: number;
  gyroControls: boolean;
  mouseControls: boolean;
  mouseEase: boolean;
  scale?: number;
  scaleMobile?: number;
  skyColor: number;
  speed?: number;
  sunColor: number;
  sunGlareColor: number;
  sunlightColor: number;
  touchControls: boolean;
};

type MainThreadRenderProps = {
  el: HTMLElement;
};

type RenderProps = MainThreadRenderProps | OffscreenRenderProps;

type VantaCloudsSettings = RenderProps &
  VantaCloudsConfig & {
    THREE?: unknown;
  };

export type VantaClouds = {
  destroy: () => void;
  renderer: {
    setSize: (width: number, height: number) => void;
  };
  resize: () => void;
};

export type VantaCloudsObject = {
  CLOUDS: (settings: VantaCloudsSettings) => VantaClouds;
  current: VantaClouds;
};

declare global {
  interface Window {
    THREE: unknown;
    VANTACLOUDS: VantaCloudsObject;
  }
}
