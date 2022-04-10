export function signInRequest(payload) {
  const { tokenGoogle } = payload;
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { tokenGoogle },
  };
}

export function changeLoadingState(payload) {
  const { loading } = payload;
  return {
    type: '@auth/CHANGE_LOAD_STATE',
    payload: { loading },
  };
}

export function signInRequestSucess(token, user) {
  return {
    type: '@auth/SIGN_IN_REQUEST_SUCCESS',
    payload: { token, user },
  };
}

export function signInRequestFailure(payload) {
  const { errorLogin } = payload;
  return {
    type: `@auth/SIGN_IN_FAILURE`,
    payload: { errorLogin },
  };
}
