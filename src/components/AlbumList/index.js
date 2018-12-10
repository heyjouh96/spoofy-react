import React, { Component } from 'react';

import Search from '../Search';
import ResultList from '../ResultList';


class AlbumList extends Component {

    render() {
        return (
            <div>
                <h1>Spotify</h1>

                <Search /> 
                <hr />
                <ResultList />
            </div>
        );
    }
}

export default AlbumList;