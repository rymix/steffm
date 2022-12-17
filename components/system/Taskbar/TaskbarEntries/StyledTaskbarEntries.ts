import styled from "styled-components";

const StyledTaskbarEntries = styled.ol`
  column-gap: 1px;
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 0 3px;
  overflow: hidden;
  position: absolute;
  right: ${({ theme }) =>
    theme.sizes.clock.width + theme.sizes.systemTray.width};
  width: ${({ theme }) =>
    `calc(100% - ${theme.sizes.clock.width} - ${theme.sizes.systemTray.width})`};
`;

export default StyledTaskbarEntries;
