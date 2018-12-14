import React, { Component } from 'react';
import '../../style/components/TrackList.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTracks } from '../../actions/postActions';
import { Link } from 'react-router-dom';

class TrackList extends Component {

    componentWillMount() {
        this.props.fetchTracks(this.props.match.params.id);
        console.log("tracks will ->", this.props.tracks);
    }

    componentDidUpdate() {
        // var albuns = [];
        // albuns = JSON.parse(localStorage.getItem('recents'));
        // console.log("-->", albuns);
        // albuns.push(
        //     JSON.stringify({
        //         id: this.props.tracks.id,
        //         name: this.props.tracks.name,
        //         image: this.props.tracks.images[1].url,
        //         artist: this.props.tracks.artists[0].name,
        //     })
        // );

        // localStorage.setItem(
        //     "recents",
        //     JSON.stringify(albuns)
        // );
        // console.log("tracks did ->", localStorage.getItem("recents"));
    }

    convertToMinutes = time => {
        var minutes = Math.floor(time / 60000);
        var seconds = ((time % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    render() {

        console.log("PROPS ->", this.props.tracks);
        
        var tracks = '', name = '', img = '', artist = '';
        
        if (this.props.tracks.hasOwnProperty('tracks')) {
            tracks = this.props.tracks.tracks.items.map(track => (
                <li key={track.id}>
                    <span className="track-name">{track.name}</span>
                    <span className="track-length">{this.convertToMinutes(track.duration_ms)}</span>
                </li>
            ));
            img = this.props.tracks.images[1].url;
            name = this.props.tracks.name;
            artist = this.props.tracks.artists[0].name;
        } 

        return (
            <div>
                
                <Link to="/" className="go-back"> <i>&lsaquo;</i> &nbsp; Voltar</Link>
                    
                <div className="track-list">

                    <div className="album-info">
                        <img src={img} alt={name} className="album-image"/>
                        <h2>{name}</h2>  
                        <span>{artist}</span>               
                    </div>
                    
                    <div className="album-tracks">
                        <ol>
                            {tracks}
                        </ol>
                    </div>

                </div>
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