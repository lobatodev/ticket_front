export function signInRequest(payload){
	const {email, password} = payload
  return {
    type:'@auth/SIGN_IN_REQUEST',
    payload: { email, password }
  };
}

export function changeLoadingState(payload){
	const { loading } = payload
  return {
    type:'@auth/CHANGE_LOAD_STATE',
    payload: { loading }
  };
}

export function signInRequestSucess(token, user){
  return {
    type:'@auth/SIGN_IN_REQUEST_SUCCESS',
    payload: {token,user}
  };
}

export function signInRequestFailure(){
  return{
    type: `@auth/SIGN_IN_FAILURE`
  }
}