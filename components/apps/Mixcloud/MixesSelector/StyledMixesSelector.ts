import styled from "styled-components";

const StyledMixesSelector = styled.div`
  align-items: center;
  background: #ccc;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  height: 110px;
  width: 100%;

  #category-wrapper {
    padding: 5px 10px;
  }

  #select-wrapper {
    padding: 5px 10px;
  }

  #search-wrapper {
    grid-column: 1 / span 2;
    padding: 5px 10px;
  }
`;

export default StyledMixesSelector;
