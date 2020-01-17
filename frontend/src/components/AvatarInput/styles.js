import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: center;
  align-items: center;

  height: calc(4 * 44px);
  margin: 0 0 10px;
  border: 0;
  border-radius: 4px;
  color: #fff;
  background: rgba(0, 0, 0, 0.4);

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      object-fit: contain;
      object-position: center;
    }

    svg,
    p {
      opacity: 0.6;
    }

    p {
      margin: 10px 0 0;
      font-weight: bold;
    }

    cursor: pointer;

    input {
      display: none;
    }
  }
`;
