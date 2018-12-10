import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { extractQueryString } from "./helpers/utils";

import Search from './components/Search';
import ResultList from './components/ResultList';

import Routes from './routes/routes';
import store from './store';

class App extends Component {

    componentWillMount = () => {

        const token = this.getToken();

        console.log("token ->", token);

        if (!token) {
            console.log("3");

            this.redirectToSpotify();
        } else {
            console.log("4");
            // this.redirectToSpotify();
            if (window.location.hash.length === 0) this.validateExpireToken(token);

            this.clearHashToken();

            localStorage.setItem(
                "authorization",
                JSON.stringify({
                    ...token,
                    authorizationTime: new Date()
                })
            );
        }
    };

    clearHashToken = () => {
        history.pushState(
            "initial",
            document.title,
            window.location.href.split("#")[0]
        );
    };

    // validateExpireToken = (token) => {
    //     const now = new Date();
    //     const expireDate = new Date(
    //         new Date(token.authorizationTime).setSeconds(3600)
    //     );
    //     const keepValid = now <= expireDate;
    //     if (!keepValid) {
    //         this.redirectToSpotify();
    //         console.log("invalid");
    //     }
    // };

    validateExpireToken = token => {
        const now = new Date();
        const expire = new Date();
    
        expire.setSeconds(
          expire.getSeconds() + parseInt(token.expires_in)
        );
    
        const expireDate = token.authorizationTime
          ? new Date(new Date(new Date(token.authorizationTime)))
          : expire;
    
        const valid = now <= expireDate;
    
        return valid;
    };

    redirectToSpotify = () => {
        const url = process.env.REACT_APP_SPOTIFY_ACCOUNTS_URL;
        const clientId = process.env.REACT_APP_CLIENT_ID;

        window.location.href = `${url}authorize?client_id=${clientId}&response_type=token&redirect_uri=${"http://localhost:8080"}`;
    };

    getToken = () => {
        var search = window.location.hash.split("#")[1];

        console.log("search -> ", search);
        if (search) {
            console.log("1");
            console.log("queryString -> ", extractQueryString(search));
            return extractQueryString(search);
        }
        else {
            console.log("2");
            const authorization = localStorage.getItem("authorization");
            return JSON.parse(authorization);
        }
    };

    render() {
        return (
            <Provider store={store}>
                {/* <div>
                    <h1>Spotify</h1>

                    <Search />
                    <hr />
                    <ResultList />
                </div> */}

                <Routes />

            </Provider>
        );
    }
}

export default App;