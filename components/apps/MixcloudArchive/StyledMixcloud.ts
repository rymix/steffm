import styled from "styled-components";

const StyledMixcloud = styled.div`
  height: 100%;

  /* This hack overrides height to enable the MixDetail component
     to size correctly when used independently and also work properly
     when displayed alongside other Mixcloud components */
  div[class^="StyledMixDetail"] {
    height: calc(100% - 220px) !important;
  }
`;

export default StyledMixcloud;
