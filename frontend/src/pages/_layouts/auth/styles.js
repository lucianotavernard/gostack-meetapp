import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  background: linear-gradient(0deg, #402845, #22202c);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    picture {
      align-self: center;
      width: 40px;
      margin-bottom: 50px;

      img {
        width: 100%;
      }
    }

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

    button {
      height: 44px;
      margin: 5px 0 0;
      border: 0;
      border-radius: 4px;
      color: #fff;
      background: #f94d6a;
      font-size: 16px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }

    a {
      margin-top: 15px;
      color: #fff;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
