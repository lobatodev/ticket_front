import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  errorLogin: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
      });
    case '@auth/CHANGE_LOAD_STATE':
      return produce(state, draft => {
        draft.loading = action.loading;
      });
    case '@auth/SIGN_IN_FAILURE':
      return produce(state, draft => {
        draft.errorLogin = action.payload.errorLogin;
      });
    default:
      return state;
  }
}
