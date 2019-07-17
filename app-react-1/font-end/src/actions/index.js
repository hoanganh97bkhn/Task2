import * as types from './../constants/ActionTypes';
let data = [];

export const status = () => {
    return{
        type : types.TOGGLE_STATUS,
    }
}

export const modals = () => {
    return{
        type : types.TOGGLE_MODALS,
    }
}

export const modalsFile = (temp,title,url) => {
    return{
        type : types.TOGGLE_MODALS_FILE,
        data : {
            temp,
            title,
            url
        }
    }
}

export const showData = (data) => {
    return {
        type : types.SHOW_DATA,
        data
    }
}

export const showAll = () => {
    return {
        type : types.SHOW_ALL,
        data
    }
}

export const showModel = () => {
    return {
        type : types.SHOW_MODEL,
        data
    }
}

export const showGood = () => {
    return {
        type : types.SHOW_GOOD,
        data
    }
}

export const callApiSingIn = (data) => {
    return {
        type : types.CALL_API_SINGIN,
        data
    }
}

export const callApiUpload = (formData,url,imagePreviewUrl) => {
    return {
        type : types.CALL_API_UPLOAD,
        data : {
            formData,
            url,
            imagePreviewUrl
        }
    }
}

export const delImage = () => {
    return {
        type : types.DEL_IMAGE,
    }
}

export const handleDel = (data) => {
    return {
        type : types.API_DEL_IMAGE,
        data
    }
}
