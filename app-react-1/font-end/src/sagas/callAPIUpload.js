import { takeLatest, call, put } from 'redux-saga/effects'
import axios from 'axios';
import config from "./../config/index"

function uploadApi(data,url){
  return axios({
    method: "POST",
    url: `${config.baseUrl}/api/${url}`,
    data : data
  });
}

function* signupFlow(action){
  const { formData, url, imagePreviewUrl } = action.data
  try {
    const response = yield call(uploadApi,formData,url); 
    const data = response.data;
    data.data.imagePreviewUrl = imagePreviewUrl;
    console.log(data);
    yield put({ type: "UPLOAD_SUCCESS", data})
  } catch(error){
    yield put({ type: "UPLOAD_ERROR", error })
  }
}

export function* watchUpload() {
  yield takeLatest("CALL_API_UPLOAD", signupFlow);
}
