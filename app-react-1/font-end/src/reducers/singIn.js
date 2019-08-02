import * as types from '../constants/ActionTypes'

let initialState = {status: false};

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.SIGNUP_SUCCESS :
            if(action.data.message === "success"){
                state.status = true;
                state.author = action.data.author;
                state.permissions = action.data.permissions
                return state;
            }    
        default : 
            return state;
    }
}

export default myReducer;
