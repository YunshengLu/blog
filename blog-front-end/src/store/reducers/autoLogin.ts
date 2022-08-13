import { AnyAction } from 'redux';
import * as ActionTypes from "../constants";

const initialState: never[] = []

const autoLoginReducer = (state = initialState, action: AnyAction) => {
    
    switch (action.type) {
        case ActionTypes.POST_AUTOLOGIN:
            return action.data
        default: 
            return state
    }
}

export default autoLoginReducer
