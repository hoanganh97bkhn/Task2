import {watchSingIn} from './callAPISingIn';
import {watchUpload} from './callAPIUpload';
import {watchDelImage} from './callAPIDelImage';
import {watchRegister} from './callAPIRegister';

const watchSaga = {
  watchSingIn : watchSingIn,
  watchUpload : watchUpload,
  watchDelImage : watchDelImage,
  watchRegister : watchRegister,
}

export default watchSaga;  