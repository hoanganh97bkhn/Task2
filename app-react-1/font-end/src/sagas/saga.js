import {watchSingIn} from './callAPISingIn';
import {watchUpload} from './callAPIUpload';
import {watchDelImage} from './callAPIDelImage';

const watchSaga = {
  watchSingIn : watchSingIn,
  watchUpload : watchUpload,
  watchDelImage : watchDelImage
}

export default watchSaga;  