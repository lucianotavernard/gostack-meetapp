import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  align-self: center;
  margin-top: 30px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const List = styled.FlatList.attrs({
  showVerticalsScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})``;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#999',
})`
  margin: 30px 0;
`;
