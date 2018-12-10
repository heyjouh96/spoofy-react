import React, { Component } from 'react';
// import '../../style/components/TrackList.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTracks } from '../../actions/postActions';
import { Link } from 'react-router-dom';

class TrackList extends Component {

    componentWillMount() {
        this.props.fetchTracks(this.props.match.params.id);
    }

    render() {

        console.log("PROPS ->", this.props.tracks);
        
        var tracks = '', name = '', img = '';
        
        if (this.props.tracks.hasOwnProperty('tracks')) {
            tracks = this.props.tracks.tracks.items.map(track => (
                <li key={track.id}>{track.name}</li>
            ));
            name = this.props.tracks.name;
            img = this.props.tracks.images[1].url;
        } 

        return (
            <div>
                
                <Link to="/" >Voltar</Link>

                <h1>{name}</h1>
                
                <img src={img} alt={name} className="album-image"/>
                
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