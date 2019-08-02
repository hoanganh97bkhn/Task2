import * as types from './../constants/ActionTypes'

let initialState = [];

let myReducer = (state = initialState,action) => {

    let newState = [...initialState];
    let listArray = [...initialState];
    switch(action.type){
        case types.SHOW_DATA:
            initialState = action.data;
            return initialState;
        case types.UPLOAD_SUCCESS:
            if(action.data.message === "upload-success"){
                initialState = [...initialState,action.data.data]
            }
            else if(action.data.message === "edit-success"){
                initialState.forEach((item, index)=>{
                    if(item._id === action.data.data._id){
                        initialState[index] = action.data.data;
                    }
                })
            }
            return initialState;
        case types.DEL_SUCCESS :
            if(action.data.message === "delete-success"){
                action.listData.forEach((element,index) => {
                    initialState = initialState.filter((temp, i) => {
                        if(temp._id === element) return false;
                        else return true;
                    })
                });
            }
            return initialState;

        case types.SHOW_ALL:
            return newState;
        case types.SHOW_MODEL:
            listArray = newState.filter((item,index)=>{
                if(item.model === 1) {
                    return true
                }  
                else return false;
                })
                return listArray;
        case types.SHOW_GOOD:
            listArray = newState.filter((item,index)=>{
                if(item.good === 1) {
                    return true
                }  
                else return false;
                })
                return listArray;
        default : return newState;
    }
}

export default myReducer;