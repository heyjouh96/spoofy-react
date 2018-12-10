import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import TrackList from '../components/TrackList';
import AlbumList from '../components/AlbumList';


export default () =>
    (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AlbumList}/>
                <Route path="/:id" component={TrackList}/>
            </Switch>
        </BrowserRouter>
    );
