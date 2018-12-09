import React, {Component} from 'react';
import {Provider} from 'react-redux';

import Posts from './components/Posts';
import PostForm from './components/PostForm';

import store from './store';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <h1>My React App</h1>
                    <PostForm />
                    <hr/>
                    <Posts />
                </div>
            </Provider>
        );
    }
}

export default App;