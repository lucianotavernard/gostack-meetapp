import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
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

export const SelectDate = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 0 40px;
`;

export const Button = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
  },
})``;

export const Label = styled.Text`
  padding: 0 20px;
  color: #fff;
  font-size: 32px;
`;
