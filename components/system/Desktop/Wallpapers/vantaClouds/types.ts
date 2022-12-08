import type { OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";

type VantaCloudsCycleColor = {
  colorCycleSpeed?: number;
  hue?: number;
  lightness?: number;
  saturation?: number;
};

export type VantaCloudsConfig = VantaCloudsCycleColor & {
  camera: {
    far: number;
    fov: number;
    near: number;
  };
  color: string;
  forceAnimate?: boolean;
  gyroControls?: boolean;
  hh: number;
  material: {
    options: {
      fog?: boolean;
      wireframe: boolean;
    };
  };
  mouseControls?: boolean;
  mouseEase?: boolean;
  shininess: number;
  touchControls?: boolean;
  waveHeight: number;
  waveSpeed: number;
  ww: number;
  zoom?: number;
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
