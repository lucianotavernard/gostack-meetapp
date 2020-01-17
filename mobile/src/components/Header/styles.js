import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding: 0;
  background: #191620;
`;

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 32px;
  padding: 0;
`;
