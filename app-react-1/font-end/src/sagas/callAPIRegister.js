import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';
import config from "../config/index"

function registerApi(emailRegister,passRegister){
  return axios({
    method: "POST",
    url: `${config.baseUrl}/api/register`,
    data : {emailRegister,passRegister}
  });
}

function* registerFlow(action){
  console.log(action.data)
  const { emailRegister, passRegister } = action.data
  
  try {
    const response = yield call(registerApi,emailRegister,passRegister); 
    const data = response.data;
    yield put({ type: "REGISTER_SUCCESS", data })
  } catch(error){
    yield put({ type: "SIGNUP_ERROR", error })
  }
}

export function* watchRegister() {
  yield takeLatest("CALL_API_REGISTER", registerFlow);
}
