import { FETCH_POSTS, FETCH_TRACKS, NEW_POST } from '../actions/types';

const initialState = {
    items: [],
    item: {},
    tracks: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            };
        case FETCH_TRACKS:
            return {
                ...state,
                tracks: action.payload
            };
        case NEW_POST:
            return {
                ...state,
                item: action.payload 
            };
        default:    
            return state;                
    }
}