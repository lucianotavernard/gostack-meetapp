import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  createFailure,
  updateSuccess,
  updateFailure,
  cancelFailure,
} from './actions';

export function* createMeetup({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, `meetups`, data);

    toast.success('Meetup criado com sucesso');

    history.push('/dashboard');
  } catch (error) {
    toast.error('Erro ao criar novo meetup, confira os dados');
    yield put(createFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { id, data } = payload;

    const response = yield call(api.put, `meetups/${id}`, data);

    toast.success('Meetup atualizado com sucesso');

    yield put(updateSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar meetup, confira os dados');
    yield put(updateFailure());
  }
}

export function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `meetups/${id}`);

    toast.success('Meetup removido com sucesso');

    history.push('/dashboard');
  } catch (error) {
    toast.error('Erro ao remover meetup, confira os dados');
    yield put(cancelFailure());
  }
}

export default all([
  takeLatest('@meetup/CREATE_REQUEST', createMeetup),
  takeLatest('@meetup/UPDATE_REQUEST', updateMeetup),
  takeLatest('@meetup/CANCEL_REQUEST', cancelMeetup),
]);
