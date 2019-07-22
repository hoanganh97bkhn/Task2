import * as types from './../constants/ActionTypes'

let initialState = false;
let myReducer = (state = initialState,action) => {
    if(action.type === types.TOGGLE_MODALS){
        state = !state;
        return state;
    }
    else if(action.type === types.SIGNUP_SUCCESS){
        state = !state;
        return state;
    }
    return state;
}

export default myReducer;