import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
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
      border: 1px solid ${darken(0.01, '#e5556d')};
      border-radius: 4px;
      color: #fff;
      background: #e5556d;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#e5556d')};
      }

      svg {
        margin-right: 10px;
      }
    }
  }
`;
