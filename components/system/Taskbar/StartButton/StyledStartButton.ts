import styled from "styled-components";
import Button from "styles/common/Button";

type StyledStartButtonProps = {
  $active: boolean;
};

const StyledStartButton = styled(Button)<StyledStartButtonProps>`
  background-color: ${({ $active, theme }) =>
    $active && theme.colors.taskbar.foregroundFocussed};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.taskbar.entry.border : "transparent"};
  border-radius: ${({ theme }) => theme.sizes.taskbar.entry.borderRadius};
  display: flex;
  fill: ${({ theme }) => theme.colors.startButton};
  height: ${({ theme }) => theme.sizes.taskbar.entry.tileSize};
  margin: 4px 0 0;
  min-width: 0;
  overflow: hidden;
  place-content: center;
  place-items: center;

  && {
    width: ${({ theme }) => theme.sizes.startButton.width};
  }

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active
        ? theme.colors.taskbar.foregroundHover
        : theme.colors.taskbar.foregroundFocussed};
  }

  svg {
    height: ${({ theme }) => theme.sizes.startButton.iconSize};
  }

  &:hover {
    background-color: ${({ $active, theme }) =>
      !$active && theme.colors.taskbar.hover};

    svg {
      fill: ${({ theme }) => theme.colors.highlight};
    }
  }

  &:active {
    background-color: hsla(0, 0%, 20%, 70%);

    svg {
      fill: hsla(207, 100%, 60%, 80%);
    }
  }
`;

export default StyledStartButton;
