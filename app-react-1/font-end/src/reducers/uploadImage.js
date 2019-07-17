import * as types from '../constants/ActionTypes'

let initialState = {status : false};

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.UPLOAD_SUCCESS :
            if(action.data.message === "success"){
                state.status = true;
                state.data = action.data.data;
                return state;
            }    
        default : 
            state.status = false;
            state.data = null;
            return state;
    }
}

export default myReducer;
