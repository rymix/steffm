import styled from "styled-components";

type StyledTracklistItemProps = {
  trackProgressPercentage: number;
};

const StyledTracklistItem = styled.li<StyledTracklistItemProps>`
  cursor: pointer;
  position: relative;

  &::after {
    background: #777;
    content: "";
    height: 100%;
    left: 0;
    opacity: 0.2;
    position: absolute;
    top: 0;
    transition: width 1s ease-out;
    width: ${({ trackProgressPercentage }) => `${trackProgressPercentage}%`};
  }
`;

export default StyledTracklistItem;
