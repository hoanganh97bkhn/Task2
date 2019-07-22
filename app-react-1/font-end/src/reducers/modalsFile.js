import * as types from './../constants/ActionTypes'

let initialState = {status : false};
let myReducer = (state = initialState,action) => {
    if(action.type === types.TOGGLE_MODALS_FILE){
        state.status = !state.status;
        state.temp = action.data.temp;
        state.title = action.data.title;
        state.url = action.data.url;
        console.log(state)
        return state;
    }
    else if(action.type === types.UPLOAD_SUCCESS){
        state.status = !state.status;
        return state;
    }
    return state;
}

export default myReducer;