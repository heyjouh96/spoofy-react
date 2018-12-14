import React, { Component } from 'react';
import './style/components/App.scss';
import { Provider } from 'react-redux';
import { tokenValidation } from "./helpers/utils";

import Routes from './routes/routes';
import store from './store';

class App extends Component {

    componentWillMount = () => {

        tokenValidation();

    };

    render() {
        return (
            <Provider store={store}>

                <Routes />

            </Provider>
        );
    }
}

export default App;