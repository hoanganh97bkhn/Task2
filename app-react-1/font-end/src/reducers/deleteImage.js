import * as types from './../constants/ActionTypes'

let initialState = false;
let myReducer = (state = initialState,action) => {
    if(action.type === types.DEL_IMAGE || action.type === types.DEL_SUCCESS){
        state = !state;
        return state;
    }
    return state;
}

export default myReducer;