import { FETCH_POSTS, FETCH_TRACKS, FETCH_ARTIST_ALBUMS } from '../actions/types';

const initialState = {
    items: {},
    item: {},
    tracks: {},
    artist_albums: {}
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
        case FETCH_ARTIST_ALBUMS:
            return {
                ...state,
                artist_albums: action.payload 
            };
        default:    
            return state;                
    }
}