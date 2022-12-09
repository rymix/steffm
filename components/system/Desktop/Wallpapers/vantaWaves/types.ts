import type { OffscreenRenderProps } from "components/system/Desktop/Wallpapers/types";

type VantaCycleColor = {
  colorCycleSpeed?: number;
  hue?: number;
  lightness?: number;
  saturation?: number;
};

export type VantaConfig = VantaCycleColor & {
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

type VantaSettings = RenderProps &
  VantaConfig & {
    THREE?: unknown;
  };

export type VantaWaves = {
  destroy: () => void;
  renderer: {
    setSize: (width: number, height: number) => void;
  };
  resize: () => void;
};

export type VantaObject = {
  WAVES: (settings: VantaSettings) => VantaWaves;
  current: VantaWaves;
};
