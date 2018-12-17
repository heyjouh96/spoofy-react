import { FETCH_ALBUMS, FETCH_TRACKS, FETCH_ARTIST_ALBUMS } from '../actions/types';

const initialState = {
    items: {},
    item: {},
    tracks: {},
    artist_albums: {},
    search: '',
    cache: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_ALBUMS:
            state.cache.push({ search: action.search, payload: action.payload });
            return {
                ...state,
                items: action.payload,
                search: action.search
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