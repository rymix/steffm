import styled from "styled-components";

type StyledMixesSearchBoxProps = {
  resultsBoxWidth: number | undefined;
};

const StyledMixesSearchBox = styled.div<StyledMixesSearchBoxProps>`
  justify-content: center;
  position: relative;
  text-align: center;
  width: 100%;

  div.wrapper {
    position: relative;
    width: 100%;
    z-index: 3;
  }

  ul.track-list {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    position: relative;
    width: fit-content;

    animation: scroll-left 30s linear infinite;

    @keyframes scroll-left {
      0% {
        transform: ${({ resultsBoxWidth }) =>
          `translateX(${resultsBoxWidth || ""}px);`};
      }

      100% {
        transform: translateX(-100%);
      }
    }

    li.track-list-item {
      color: #aaaaaa;
      position: relative;
    }
  }
`;

export default StyledMixesSearchBox;
