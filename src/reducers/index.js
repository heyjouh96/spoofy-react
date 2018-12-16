import {combineReducers} from 'redux';
import albumReducer from './albumReducer';

export default combineReducers({
    posts: albumReducer
})