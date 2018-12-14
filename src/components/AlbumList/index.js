import React, { Component } from 'react';

import Search from '../Search';
import ResultList from './ResultList.js';


class AlbumList extends Component {

    render() {
        return (
            <div>
                <Search /> 

                <ResultList />
            </div>
        );
    }
}

export default AlbumList;