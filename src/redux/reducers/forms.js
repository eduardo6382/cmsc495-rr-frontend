/* eslint-disable import/no-anonymous-default-export */
import {
    ADD_COOKTIME,
    ADD_INGREDIENTS,
    ADD_PROCEDURES
} from '../actions/types';

const initialState = {
    ingredients: [],
    procedures: [],
    picture: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            };
        case ADD_PROCEDURES:
            return {
                ...state,
                procedures: action.payload
            };
        case ADD_COOKTIME:
            return {
                ...state,
                cook_time: action.payload
            };
        default:
            return state;
    }
}
