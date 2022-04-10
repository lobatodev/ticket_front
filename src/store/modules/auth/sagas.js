import { all, call, put, takeLatest } from 'redux-saga/effects';
// import { useToast } from '@chakra-ui/react';
import api from '../../../service/api';
import { signInRequestFailure, signInRequestSucess } from './actions';
import jwt_decode from 'jwt-decode';

export function* signIn({ action, payload }) {
  try {
    // const toast = useToast();
    const { tokenGoogle } = payload;
    const response = yield call(api.post, 'auth', { tokenGoogle });

    const { token, user } = response.data;
    localStorage.setItem('user', JSON.stringify(user));

    api.defaults.headers.Authorization = `Bearer ${token}`;
    // toast({
    //   title: 'Logado com sucesso.',
    //   description: `Bem-vindo, ${name}`,
    //   status: 'success',
    //   duration: 5000,
    //   isClosable: true,
    // });
    window.location.reload();
    yield put(signInRequestSucess(token));
  } catch (e) {
    // toast({
    //   title: 'Erro ao logar',
    //   description: 'Erro ao autenticar o usuário',
    //   status: 'error',
    //   duration: 5000,
    //   isClosable: true,
    // });
    yield put(signInRequestFailure(true));
  }
}
export function setToken({ payload }) {
  if (!payload) return;

  if (!payload.auth) return;

  const { token } = payload.auth;

  if (token) {
    const expires_date = jwt_decode(token).exp;
    const now = (Date.now() / 1000).toFixed(0);

    if (now >= expires_date) {
      window.localStorage.clear();
      window.location.href = '/';
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('persist/REHYDRATE', setToken),
]);
