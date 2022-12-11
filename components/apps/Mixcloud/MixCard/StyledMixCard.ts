import styled from "styled-components";

const StyledMixCard = styled.figure`
  display: flex;
  flex-flow: column;

  figcaption {
    background: #eeeeee;
    display: flex;
    flex: 0 1 auto;
    flex-flow: row;
    height: 100px;

    .title-card {
      margin: 1em;
    }

    h1 {
      font-size: 22px;
    }

    h2 {
      color: #777777;
      font-size: 14px;
    }

    img {
      height: 100px;
      width: 100px;
    }
  }
`;

export default StyledMixCard;
