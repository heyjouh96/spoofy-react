import { FETCH_POSTS, FETCH_TRACKS, NEW_POST } from './types';

var timeout = null;

export const fetchPosts = (search) => dispatch => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        if (search !== '') {
            const auth = JSON.parse(localStorage.getItem('authorization'));
            const url = process.env.REACT_APP_SPOTIFY_API_URL + 'search?q=' + search + '&type=album';
            
            fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + auth.access_token
                    }
                })
                .then(res => res.json())
                .then(posts => dispatch({
                    type: FETCH_POSTS,
                    payload: posts
                }));
        }
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

export const createPost = postData => dispatch => {
    console.log("called");
    fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(post => 
                dispatch({
                    type: NEW_POST,
                    payload: post
            }));    
}

