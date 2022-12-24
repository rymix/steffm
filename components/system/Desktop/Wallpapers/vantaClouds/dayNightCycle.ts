import {
  dayColors,
  nightColors,
} from "components/system/Desktop/Wallpapers/vantaClouds/config";
import type { cloudColors } from "components/system/Desktop/Wallpapers/vantaClouds/types";
import daynight from "daynight";
import { mix } from "polished";
import { MILLISECONDS_IN_SECOND } from "utils/constants";

const fps = 1;
const timePerFrame = MILLISECONDS_IN_SECOND / fps;

type ColorCycle = {
  stop: () => null | void;
};

const sigmoid = (number: number): number => 1 / (1 + Math.exp(-number));

const dayNightLightCurve = (
  brightness: number,
  extremetiesFactor = 30
): number => sigmoid((brightness - 0.5) * extremetiesFactor);

const mixIndexDayNight = (): number => {
  const { brightness } = daynight({
    date: new Date(),
    timeZone: "Europe/London",
  });
  return dayNightLightCurve(brightness);
};

const vantaFormat = (color: string): number => Number(color.replace("#", "0x"));

let first = true;

const colorCycle = (
  callback: (updatedColors: cloudColors) => void
): ColorCycle => {
  let lastFrameTime = Date.now();
  let animationFrameId: number;

  const updateColor = (): void => {
    const currentFrameTime = Date.now();
    const timeSinceLastFrame = currentFrameTime - lastFrameTime;

    if (timeSinceLastFrame > timePerFrame) {
      if (first) {
        const node = document.querySelector<HTMLElement>(".vanta-canvas");
        if (node && node.style) {
          node.style.opacity = "1";
        }
      }
      first = false;
      const pulseIndex = mixIndexDayNight();

      lastFrameTime = currentFrameTime - (timeSinceLastFrame % timePerFrame);

      const updatedColors = {
        cloudColor: vantaFormat(
          mix(
            pulseIndex,
            `#${dayColors.cloudColor.toString(16)}`,
            `#${nightColors.cloudColor.toString(16)}`
          )
        ),
        cloudShadowColor: vantaFormat(
          mix(
            pulseIndex,
            `#${dayColors.cloudShadowColor.toString(16)}`,
            `#${nightColors.cloudShadowColor.toString(16)}`
          )
        ),
        skyColor: vantaFormat(
          mix(
            pulseIndex,
            `#${dayColors.skyColor.toString(16)}`,
            `#${nightColors.skyColor.toString(16)}`
          )
        ),
        sunColor: vantaFormat(
          mix(
            pulseIndex,
            `#${dayColors.sunColor.toString(16)}`,
            `#${nightColors.sunColor.toString(16)}`
          )
        ),
        sunGlareColor: vantaFormat(
          mix(
            pulseIndex,
            `#${dayColors.sunGlareColor.toString(16)}`,
            `#${nightColors.sunGlareColor.toString(16)}`
          )
        ),
        sunlightColor: vantaFormat(
          mix(
            pulseIndex,
            `#${dayColors.sunlightColor.toString(16)}`,
            `#${nightColors.sunlightColor.toString(16)}`
          )
        ),
      };

      callback(updatedColors);
    }

    animationFrameId = requestAnimationFrame(updateColor);
  };

  animationFrameId = requestAnimationFrame(updateColor);

  const stop = (): void => cancelAnimationFrame(animationFrameId);

  return { stop };
};

export default colorCycle;
