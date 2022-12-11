import styled from "styled-components";

const StyledMixHeader = styled.figure`
  display: flex;
  flex-flow: column;

  figcaption {
    background: #eeeeee;
    display: flex;
    flex: 0 1 auto;
    flex-flow: row;
    min-height: 100px;

    .title-card {
      margin: 1em;
    }

    h1 {
      font-size: 18px;
    }

    h2 {
      color: #777777;
      font-size: 14px;
    }

    p {
      color: #777777;
      font-size: 14px;
    }
  }
`;

export default StyledMixHeader;
