import status from './status';
import sort from './sort';
import modals from './modals';
import singIn from './singIn';
import modalsFile from './modalsFile';
import uploadImage from './uploadImage';
import delImage from './deleteImage';
import openModalShow from './openModalShow';
import { combineReducers } from 'redux';

const myReducer = combineReducers({
    status : status,
    sort : sort,
    modals : modals,
    singIn : singIn,
    modalsFile : modalsFile,
    uploadImage : uploadImage,
    delImage : delImage,
    openModalShow : openModalShow,
});

export default myReducer;