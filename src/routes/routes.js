import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import TrackList from '../components/TrackList';
import AlbumList from '../components/AlbumList';
import ArtistAlbums from '../components/ArtistAlbums';


export default () =>
    (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AlbumList}/>
                <Route exact path="/:id" component={TrackList}/>
                <Route exact path="/artist/:id" component={ArtistAlbums}/>
            </Switch>
        </BrowserRouter>
    );
