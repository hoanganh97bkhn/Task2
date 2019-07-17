import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';
import config from "./../config/index"

function uploadApi(listData){
  return axios({
    method: "POST",
    url: `${config.baseUrl}/api/del-image`,
    data : listData
  });
}

function* signupFlow(action){
  const listData = action.data;
  try {
    const response = yield call(uploadApi,listData); 
    const data = response.data;
    yield put({ type: "DEL_SUCCESS", data,listData })
  } catch(error){
    yield put({ type: "DEL_ERROR", error })
  }
}

export function* watchDelImage() {
  yield takeLatest("API_DEL_IMAGE", signupFlow);
}
