import {all} from 'redux-saga/effects'

import signIn from "./auth/sagas";

export default function* rootSaga(){
  return yield all([signIn])
}
