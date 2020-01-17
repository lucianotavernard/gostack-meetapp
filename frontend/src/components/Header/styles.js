import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 30px;
  background: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 900px;
  height: 70px;
  margin: 0 auto;

  nav {
    display: flex;
    align-items: center;

    a {
      display: block;
      width: 32px;

      img {
        width: 100%;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    margin-right: 20px;
    text-align: right;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  button {
    padding: 5px 15px;
    border: 1px solid ${darken(0.01, '#e5556d')};
    border-radius: 4px;
    color: #fff;
    background: #e5556d;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#e5556d')};
    }
  }
`;
