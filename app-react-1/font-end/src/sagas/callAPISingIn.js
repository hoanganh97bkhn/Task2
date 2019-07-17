import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';
import config from "../config/index"

function signupApi(id,pass){
  return axios({
    method: "POST",
    url: `${config.baseUrl}/api/sing-in`,
    data : {id:id,pass:pass}
  });
}

function* signupFlow(action){
  const { id, pass } = action.data
  try {
    const response = yield call(signupApi,id,pass); 
    const data = response.data;
    yield put({ type: "SIGNUP_SUCCESS", data })
  } catch(error){
    yield put({ type: "SIGNUP_ERROR", error })
  }
}

export function* watchSingIn() {
  yield takeLatest("CALL_API_SINGIN", signupFlow);
}
