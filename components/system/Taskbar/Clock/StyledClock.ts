import styled from "styled-components";

const StyledClock = styled.div`
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  font-size: ${({ theme }) => theme.sizes.clock.fontSize};
  height: calc(100% - 8px);
  margin: 4px 0 20px 0;
  max-width: ${({ theme }) => `calc(${theme.sizes.clock.width} + 10px)}`};
  min-width: ${({ theme }) => theme.sizes.clock.width};
  padding: 0 5px;
  place-content: center;
  place-items: center;
  position: absolute;
  right: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.taskbar.hover};
    border: 1px solid ${({ theme }) => theme.colors.taskbar.entry.border};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.taskbar.foreground};
    border: 1px solid ${({ theme }) => theme.colors.taskbar.entry.border};
  }
`;

export default StyledClock;
