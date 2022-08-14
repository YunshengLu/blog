import { AnyAction } from 'redux';
import * as ActionTypes from "../constants";

const initialState: never[] = []

const deleteArticleReducer = (state = initialState, action: AnyAction) => {
    
    switch (action.type) {
        case ActionTypes.DELETE_ARTICLE:
            return action.data
        default: 
            return state
    }
}

export default deleteArticleReducer
