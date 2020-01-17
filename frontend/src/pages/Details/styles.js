import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto 0;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;

    h1 {
      color: #fff;
      font-size: 32px;
    }

    div {
      display: flex;
      justify-content: space-between;

      button {
        display: flex;
        align-items: center;

        padding: 8px 15px;
        border: 1px solid ${darken(0.01, '#e5556d')};
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        background: #e5556d;
        transition: background 0.2s;

        &:first-of-type {
          background: #4cbafa;
          border: 1px solid ${darken(0.01, '#4cbafa')};

          &:hover {
            background: ${darken(0.03, '#4cbafa')};
          }
        }

        &:not(:last-of-type) {
          margin-right: 20px;
        }

        &:hover {
          background: ${darken(0.03, '#e5556d')};
        }

        svg {
          margin-right: 10px;
        }
      }
    }
  }

  section {
    margin-bottom: 20px;

    picture {
      display: block;
      height: 300px;
      margin-bottom: 20px;
      border-radius: 8px;
      overflow: hidden;

      img {
        width: 100%;
        object-fit: contain;
        object-position: center;
      }
    }

    div p {
      line-height: 1.7;
      color: #fff;
      font-size: 16px;
    }
  }

  footer {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      display: flex;
      align-items: center;

      color: #fff;
      opacity: 0.4;

      &:not(:last-of-type) {
        margin-right: 20px;
      }

      svg {
        margin-right: 10px;
      }
    }
  }
`;
