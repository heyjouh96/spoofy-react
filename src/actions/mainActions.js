import { FETCH_ALBUMS, FETCH_TRACKS, FETCH_ARTIST_ALBUMS } from './types';

var timeout = null;

export const fetchAlbums = (search) => (dispatch, getState) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        const auth = JSON.parse(localStorage.getItem('authorization'));
        const url = process.env.REACT_APP_SPOTIFY_API_URL + 'search?q=' + search + '&type=album';
        const state = getState();

        const cachedResult = state.albumReducer.cache.filter(item => item.search === search)[0];
        
        if (cachedResult) {
            dispatch({
                type: FETCH_ALBUMS,
                payload: cachedResult.payload,
                search: cachedResult.search
            });
            return;
        }
        
        fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.access_token
                }
            })
            .then(res => res.json())
            .then(posts => dispatch({
                type: FETCH_ALBUMS,
                payload: posts,
                search: search
            }));
    }, 500);

}

export const fetchTracks = (albumid) => dispatch => {

    if (albumid !== '') {
        const auth = JSON.parse(localStorage.getItem('authorization'));
        const url = process.env.REACT_APP_SPOTIFY_API_URL + 'albums/' + albumid;
        
        fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.access_token
                }
            })
            .then(res => res.json())
            .then(tracks => dispatch({
                type: FETCH_TRACKS,
                payload: tracks
            }));
    }
}

export const fetchArtistAlbums = (artistid) => dispatch => {
    
    if (artistid !== '') {
        const auth = JSON.parse(localStorage.getItem('authorization'));
        const url = process.env.REACT_APP_SPOTIFY_API_URL + 'artists/' + artistid + '/albums';
        
        fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + auth.access_token
                }
            })
            .then(res => res.json())
            .then(artist => dispatch({
                type: FETCH_ARTIST_ALBUMS,
                payload: artist
            }));
    }
}

