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

                <div className="wrapper">
                    <div className="side">
                        <img src={require('./images/logo.png')} alt="logo spotify" />
                    </div>
                    
                    <div className="main-content">
                        <Routes />
                    </div>
                </div>

            </Provider>
        );
    }
}

export default App;