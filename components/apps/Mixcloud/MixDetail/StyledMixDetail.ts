import styled from "styled-components";

const StyledMixDetail = styled.div`
  height: 100%;
  position: relative;
  width: 100%;

  ol {
    flex: 1 1 auto;
    flex-flow: column;
    height: calc(100% - 295px);
    overflow-y: scroll;
    padding: 25px 0;
    width: 100%;

    & * {
      cursor: pointer;
    }

    &::after {
      background: linear-gradient(180deg, #fff, transparent);
      content: close-quote;
      height: 30px;
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: calc(100% - 18px);
      z-index: 1;
    }

    &::before {
      background: linear-gradient(0deg, #fff, transparent);
      bottom: 295px;
      content: close-quote;
      height: 30px;
      left: 0;
      pointer-events: none;
      position: absolute;
      width: calc(100% - 18px);
      z-index: 1;
    }

    li {
      display: flex;
      list-style: none;
      padding: 10px 0;
      scroll-margin-top: 10px;
      transition-duration: 0.2s;

      &.active {
        animation: background-fade 2s forwards;
        background: transparent;

        @keyframes background-fade {
          0% {
            background: transparent;
          }

          20% {
            background: #ff0;
          }

          100% {
            background: transparent;
          }
        }
      }

      :hover {
        background: #eee;
      }

      h1 {
        font-size: 16px;
      }

      h2 {
        color: #777;
        font-size: 12px;
      }

      .section-number {
        flex: 0 0 50px;
        font-size: 16px;
        text-align: center;
      }

      .track-details {
        flex: 1;
      }

      .start-time {
        color: #777;
        flex: 0 0 80px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
`;

export default StyledMixDetail;
