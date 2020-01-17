import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  margin: 20px 0 30px;
  background: rgba(255, 255, 255, 0.2);
`;

export const Form = styled.ScrollView.attrs({
  showVerticalsScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 20 },
})`
  align-self: stretch;
  margin-top: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;
export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  background: #d44359;
`;
