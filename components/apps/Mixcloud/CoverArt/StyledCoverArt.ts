import styled from "styled-components";

const StyledCoverArt = styled.div`
  font-size: 75%;
  overflow-y: scroll;

  button {
    margin: 0.5em;
    padding: 1em;

    &:hover {
      background: #ccc;
    }
  }

  dl {
    dt {
      font-weight: bold;
    }

    dd {
      margin-left: 2em;
    }
  }

  h2 {
    margin-top: 1em;
  }

  pre {
    background: #ccc;
    display: block;
    font-size: 11px;
    max-height: 200px;
    overflow-y: scroll;
  }

  ul {
    li {
      margin-bottom: 1em;
    }
  }
`;

export default StyledCoverArt;
