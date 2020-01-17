import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.section`
  max-width: 800px;
  margin: 50px auto 0;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      width: 100%;
      height: 44px;
      margin: 0 0 10px;
      padding: 0 15px;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: rgba(0, 0, 0, 0.1);

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      height: calc(3 * 44px);
      margin: 0 0 10px;
      padding: 15px;
      border: 0;
      border-radius: 4px;
      resize: none;
      color: #fff;
      background: rgba(0, 0, 0, 0.1);

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      align-self: flex-start;
      margin: 0 0 10px;
      color: #fb6f91;
      font-weight: bold;
    }

    hr {
      height: 1px;
      margin: 10px 0 20px;
      border: 0;
      background: rgba(255, 255, 255, 0.2);
    }

    button {
      display: flex;
      align-self: flex-end;
      align-items: center;

      height: 36px;
      margin: 5px 0 0;
      padding: 8px 15px;
      border: 1px solid ${darken(0.01, '#f94d6a')};
      border-radius: 4px;
      color: #fff;
      background: #f94d6a;
      font-weight: bold;
      transition: background 0.2s;

      &:disabled {
        border-color: #d9d9d9;
        color: rgba(0, 0, 0, 0.25);
        background-color: ${darken(0.2, '#f5f5f5')};
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${darken(0.03, '#f94d6a')};
      }

      svg {
        margin-right: 10px;
      }
    }
  }
`;
