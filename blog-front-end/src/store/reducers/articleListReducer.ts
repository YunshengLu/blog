import { AnyAction } from 'redux';
import * as ActionTypes from "../constants";

const initialState: never[] = []

const articleListReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case ActionTypes.GET_ARTICLE_LIST:
            return action.data
        default: 
            return state
    }
}

export default articleListReducer
