import type {
  cloudColors,
  VantaCloudsConfig,
} from "components/system/Desktop/Wallpapers/vantaClouds/types";

export const dayColors: cloudColors = {
  cloudColor: 0xadc1de,
  cloudShadowColor: 0x183550,
  skyColor: 0x68b8d7,
  sunColor: 0xff9919,
  sunGlareColor: 0xff6633,
  sunlightColor: 0xff9933,
};

export const initialColors: cloudColors = {
  cloudColor: 0xadc1de,
  cloudShadowColor: 0x183550,
  skyColor: 0x68b8d7,
  sunColor: 0xff9919,
  sunGlareColor: 0xff6633,
  sunlightColor: 0xff9933,
};

export const nightColors: cloudColors = {
  cloudColor: 0x636970,
  cloudShadowColor: 0x20262d,
  skyColor: 0x171718,
  sunColor: 0xe6e4e4,
  sunGlareColor: 0x6b5b55,
  sunlightColor: 0xf2f0ec,
};

export const config: VantaCloudsConfig = {
  gyroControls: true,
  mouseControls: true,
  mouseEase: true,
  scale: 4,
  scaleMobile: 12,
  speed: 1,
  touchControls: true,
};

export const disableControls = {
  gyroControls: false,
  mouseControls: false,
  mouseEase: false,
  touchControls: false,
};

export const libs = [
  "/System/Vanta.js/three.r134.min.js",
  "/System/Vanta.js/vanta.clouds.min.js",
];
