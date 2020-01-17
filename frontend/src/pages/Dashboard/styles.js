import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.section`
  display: flex;
  flex-direction: column;

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

      &:hover {
        background: ${darken(0.03, '#e5556d')};
      }

      svg {
        margin-right: 10px;
      }
    }
  }
`;

export const Meetup = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
  padding: 15px 20px;
  border-radius: 4px;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);

  div {
    display: flex;
    align-items: center;

    span {
      margin-right: 30px;
      color: #8f8b95;
    }

    button {
      display: flex;
      border: 0;
      background: none;
      transition: transform ease-in 0.2s;

      &:hover {
        transform: scale(1.3);
      }
    }
  }
`;
