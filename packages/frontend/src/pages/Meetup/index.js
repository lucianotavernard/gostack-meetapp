import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { createRequest, updateRequest } from '~/store/modules/meetup/actions';

import AvatarInput from '~/components/AvatarInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  file_id: Yup.string().required('A imagem é obrigatória'),
  description: Yup.string().required('A descrição é obrigatória'),
  location: Yup.string().required('A localização é obrigatória'),
  date: Yup.string().required('A data é obrigatória'),
});

export default function Meetup({ match }) {
  const dispatch = useDispatch();
  const meetup = useSelector(state => state.meetup.selected);

  function handleCreate(data) {
    dispatch(createRequest(data));
  }

  function handleUpdate(data) {
    const { id } = match.params;

    dispatch(updateRequest(id, data));
  }

  return (
    <Container>
      <Form
        schema={schema}
        onSubmit={match.params.id ? handleUpdate : handleCreate}
        initialData={match.params.id ? meetup : null}
      >
        <AvatarInput name="file_id" />
        <Input name="title" placeholder="Título do Meetup" />
        <Input multiline name="description" placeholder="Descrição completa" />
        <DatePicker name="date" />
        <Input name="location" placeholder="Localização" />

        <button type="submit" disabled={match.params.id && meetup.past}>
          <MdAddCircleOutline size={18} />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
