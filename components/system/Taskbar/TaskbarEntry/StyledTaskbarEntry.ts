import { m as motion } from "framer-motion";
import styled from "styled-components";

type StyledTaskbarEntryProps = {
  $foreground: boolean;
  $progress?: number;
};

const StyledTaskbarEntry = styled(motion.li)<StyledTaskbarEntryProps>`
  background-color: ${({ $foreground, theme }) =>
    $foreground ? theme.colors.taskbar.foregroundFocussed : ""};
  border: 1px solid
    ${({ $foreground, theme }) =>
      $foreground ? theme.colors.taskbar.entry.border : "transparent"};
  border-radius: ${({ theme }) => theme.sizes.taskbar.entry.borderRadius};
  height: ${({ theme }) => theme.sizes.taskbar.entry.tileSize};
  margin: 4px 0 0;
  min-width: 0;
  overflow: hidden;
  position: relative;
  width: ${({ theme }) => theme.sizes.taskbar.entry.tileSize};

  &::before {
    background-color: ${({ $foreground, $progress, theme }) =>
      $foreground
        ? $progress && $progress > 0 && $progress < 100
          ? theme.colors.taskbar.foregroundProgress
          : theme.colors.taskbar.foreground
        : ""};
    background-image: ${({ $progress, theme }) =>
      $progress && $progress > 0 && $progress < 100
        ? `linear-gradient(to right, ${theme.colors.progressBackground} 0% ${$progress}%, transparent ${$progress}% 100%)`
        : ""};
    bottom: 0;
    content: "";
    height: ${({ $foreground }) => ($foreground ? "100%" : 0)};
    margin: ${({ $foreground }) => ($foreground ? "" : "0 4px")};
    position: absolute;
    transition-duration: 0.1s;
    transition-property: ${({ $foreground }) =>
      $foreground ? "all" : "width"};
    z-index: -1;
  }

  &:hover {
    &::before {
      background-color: ${({ $foreground, theme }) =>
        $foreground
          ? theme.colors.taskbar.foregroundHover
          : theme.colors.taskbar.hover};
      height: 100%;
      margin: 0;
      width: 100%;
    }
  }

  &:active {
    &::before {
      background-color: ${({ $foreground, theme }) =>
        $foreground
          ? theme.colors.taskbar.activeForeground
          : theme.colors.taskbar.active};
    }
  }

  figure {
    align-items: center;
    display: grid;
    grid-template-rows: 34px 6px;
    justify-items: center;
    margin: 4px 0 0;

    figcaption {
      color: ${({ theme }) => theme.colors.text};
      font-size: ${({ theme }) => theme.sizes.taskbar.entry.fontSize};
      margin: 0 4px;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    picture {
      height: 100%;
      position: relative;
    }

    progress {
      border: 0;
      border-radius: 2.5px;
      color: ${({ theme }) => theme.colors.taskbar.indicator.dormant};
      display: block;
      height: 4px;
      margin: 0;
      padding: 0 0 12px;
      transition-duration: 300ms;
      width: ${({ $foreground, theme }) =>
        $foreground
          ? theme.sizes.taskbar.indicator.on
          : theme.sizes.taskbar.indicator.dormant};

      &::-webkit-progress-value {
        background: ${({ $foreground, theme }) =>
          $foreground
            ? theme.colors.taskbar.indicator.on
            : theme.colors.taskbar.indicator.dormant};
        border: 0;
        border-radius: 2px;
        height: 4px;
      }

      &::-moz-progress-bar {
        background: ${({ $foreground, theme }) =>
          $foreground
            ? theme.colors.taskbar.indicator.on
            : theme.colors.taskbar.indicator.dormant};
        border: 0;
        border-radius: 2px;
        height: 4px;
      }

      &::-webkit-progress-bar {
        background: ${({ $foreground, theme }) =>
          $foreground
            ? theme.colors.taskbar.indicator.on
            : theme.colors.taskbar.indicator.dormant};
        border: 0;
        border-radius: 2px;
        height: 4px;
      }
    }
  }
`;

export default StyledTaskbarEntry;
