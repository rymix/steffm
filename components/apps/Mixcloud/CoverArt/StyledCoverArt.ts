import styled from "styled-components";

const StyledCoverArt = styled.div`
  font-size: 75%;
  overflow-y: scroll;

  button {
    margin 0.5em;
    padding: 1em;

    &:hover {
      background: lightgrey;
    }
  }

  code {
    background: lightgrey;
    display: block;
    font-size: 12px;
    max-height: 200px;
    overflow-y: scroll;
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
