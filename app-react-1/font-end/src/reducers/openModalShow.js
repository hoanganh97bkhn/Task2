import * as types from './../constants/ActionTypes'

let initialState ={
  status : false,
}

let myReducer = (state = initialState,action) => {
    if(action.type === types.OPEN_MODAL_SHOW){
        state.status = !state.status;
        state.name = action.data.name;
        state.description = action.data.description;
        state.price = action.data.price;
        state.author = action.data.author;
        state.id = action.data._id
        return state;
    }
    return state;
}

export default myReducer;