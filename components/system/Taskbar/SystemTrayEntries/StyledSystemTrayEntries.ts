import styled from "styled-components";

const StyledSystemTrayEntries = styled.ol`
  column-gap: 1px;
  display: flex;
  height: 100%;
  justify-content: right;
  margin: 0 3px;
  min-width: ${({ theme }) => theme.sizes.systemTray.tileSize};
  overflow: hidden;
  position: absolute;
  right: ${({ theme }) => `calc(${theme.sizes.clock.width} + 4px)`};
`;

export default StyledSystemTrayEntries;
