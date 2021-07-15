import { actionTypes } from "../actionTypes"

const initialState = {
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SAVE_TODO_DATA:
            return {...state, selectedTodo : action.payload}
        default:
            return state;
    }
}

export default todoReducer;