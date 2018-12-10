import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTracks } from '../../actions/postActions';

class TrackList extends Component {

    componentWillMount() {
        this.props.fetchTracks(this.props.match.params.id);
    }

    render() {

        console.log("PROPS ->", this.props.tracks);
        
        var tracks = '';
        
        if (this.props.tracks.hasOwnProperty('tracks')) {
            console.log("sim");
        } else {
            console.log("nao");
        }

        if (this.props.tracks.hasOwnProperty('tracks')) {
            tracks = this.props.tracks.tracks.items.map(track => (
                <li key={track.id}>{track.name}</li>
            ));
        } else {
            tracks = '';
        }

        return (
            <div>
                <h1>oi</h1>
                
                <ul>
                    {tracks}
                </ul>
            </div>
                
        );
    }
}

TrackList.propTypes = {
    fetchTracks: PropTypes.func.isRequired,
    tracks: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    tracks: state.posts.tracks
});

export default connect(mapStateToProps, { fetchTracks })(TrackList);