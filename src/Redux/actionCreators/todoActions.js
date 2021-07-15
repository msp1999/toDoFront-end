import { actionTypes } from "../actionTypes"

export const saveTodoData = (data) => {
    return {
        type : actionTypes.SAVE_TODO_DATA,
        payload : data
    }
}