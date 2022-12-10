import type { VantaCloudsConfig } from "components/system/Desktop/Wallpapers/vantaClouds/types";

export const config: VantaCloudsConfig = {
  backgroundColor: 0x000000,
  camera: {
    far: 400,
    fov: 30,
    near: 0.1,
    position: {
      x: 0,
      y: 10,
      z: 10,
    },
  },
  cloudColor: 0xadc1de,
  cloudShadowColor: 0x183550,
  gyroControls: true,
  mouseControls: true,
  mouseEase: true,
  scale: 4,
  scaleMobile: 12,
  skyColor: 0x68b8d7,
  speed: 1,
  sunColor: 0xff9919,
  sunGlareColor: 0xff6633,
  sunlightColor: 0xff9933,
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
