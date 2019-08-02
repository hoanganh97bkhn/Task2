import * as types from '../constants/ActionTypes'

let initialState = "";

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.REGISTER_SUCCESS :
            state = action.data;
            return state; 
        case types.FORM_CHANGE :
            state = "";
            return state; 
        default : 
            return state;
    }
}

export default myReducer;
