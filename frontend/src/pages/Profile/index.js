import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword ? field.required('Senha é obrigatória') : field
  ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirmação da senha é obrigatória')
          .oneOf([Yup.ref('password')])
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Digite seu e-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />

        <Input type="password" name="password" placeholder="Nova senha" />

        <Input
          type="password"
          name="confinrmPassword"
          placeholder="Confirmação da senha"
        />

        <button type="submit">
          <MdAddCircleOutline size={18} />
          Salvar perfil
        </button>
      </Form>
    </Container>
  );
}
