import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 20px;
  border-radius: 4px;

  background: #fff;
  opacity: ${props => (props.past ? 0.8 : 1)};
`;

export const Cover = styled.Image.attrs({ resizeMode: 'cover' })`
  width: 100%;
  height: 170px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  margin-bottom: 10px;
  color: #333;
  font-size: 22px;
  font-weight: bold;
`;

export const InfoItem = styled.View`
  flex-direction: row;
`;

export const Text = styled.Text`
  margin: 0 0 10px 5px;
  color: #999;
  font-size: 14px;
`;

export const InfoButton = styled(Button)`
  margin-top: 10px;
`;
