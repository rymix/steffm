import styled from "styled-components";

const StyledMixesSelector = styled.div`
  align-items: center;
  background: #ccc;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  height: 75px;
  width: 100%;

  #select-wrapper {
    padding: 0 10px;
  }

  #search-wrapper {
    padding: 0 10px;
  }
`;

export default StyledMixesSelector;
