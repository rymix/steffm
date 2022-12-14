import styled from "styled-components";

const StyledCoverArt = styled.div`
  font-size: 75%;
  overflow-y: scroll;

  code {
    background: lightgrey;
    display: block;
    font-size: 12px;
  }

  dl {
    dt {
      font-weight: bold;
    }

    dd {
      margin-left: 2em;
    }
  }

  ul {
    li {
      margin-bottom: 1em;
    }
  }
`;

export default StyledCoverArt;
