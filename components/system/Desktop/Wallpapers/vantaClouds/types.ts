import type { OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";

export type cloudColors = {
  cloudColor: number;
  cloudShadowColor: number;
  skyColor: number;
  sunColor: number;
  sunGlareColor: number;
  sunlightColor: number;
};

export type VantaCloudsConfig = {
  gyroControls: boolean;
  mouseControls: boolean;
  mouseEase: boolean;
  scale?: number;
  scaleMobile?: number;
  speed?: number;
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
  onDestroy: () => void;
  renderer: {
    setSize: (width: number, height: number) => void;
  };
  resize: () => void;
  setOptions: (settings: Partial<cloudColors>) => void;
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
