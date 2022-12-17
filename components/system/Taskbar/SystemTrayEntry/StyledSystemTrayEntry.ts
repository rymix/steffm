import { m as motion } from "framer-motion";
import styled from "styled-components";

const StyledSystemTrayEntry = styled(motion.li)`
  border-radius: ${({ theme }) => theme.sizes.taskbar.entry.borderRadius};
  height: ${({ theme }) => theme.sizes.taskbar.entry.tileSize};
  margin: 4px 0 0;
  min-width: 0;
  overflow: hidden;
  position: relative;
  width: ${({ theme }) => theme.sizes.systemTray.tileSize};

  &:hover {
    background-color: ${({ theme }) => theme.colors.taskbar.foregroundHover};
    border: 1px solid ${({ theme }) => theme.colors.taskbar.entry.border};
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
  }
`;

export default StyledSystemTrayEntry;
