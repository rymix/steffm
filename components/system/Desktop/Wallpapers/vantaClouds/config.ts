import type { VantaCloudsConfig } from "components/system/Desktop/Wallpapers/vantaClouds/types";

export const config: VantaCloudsConfig = {
  Color: 0xff9900,
  backgroundColor: 0x000000,
  cloudColor: 0xadc1de,
  cloudShadowColor: 0x183550,
  forceAnimate: false,
  gyroControls: false,
  mouseControls: false,
  scale: 1,
  scaleMobile: 12,
  skyColor: 0x68b8d7,
  speed: 0.5,
  sunColor: 0xff9919,
  sunGlareColor: 0xff6633,
  sunlightColor: 0xff9933,
  touchControls: false,
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
