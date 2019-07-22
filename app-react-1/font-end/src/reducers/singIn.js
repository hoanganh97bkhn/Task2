import * as types from '../constants/ActionTypes'

let initialState = false;

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.SIGNUP_SUCCESS :
            console.log(action.data);
            if(action.data.message === "success"){
                state = true;
                return state;
            }    
        default : 
            return state;
    }
}

export default myReducer;
