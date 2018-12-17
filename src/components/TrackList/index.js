import React, { Component } from 'react';
import '../../style/components/TrackList.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTracks } from '../../actions/mainActions';
import { Link } from 'react-router-dom';
import { setRecent } from "../../helpers/utils";

class TrackList extends Component {
    
    componentWillMount() {
        this.props.fetchTracks(this.props.match.params.id);
    }

    componentDidUpdate() {
        setRecent(this.props.tracks);
    }

    convertToMinutes = time => {
        var minutes = Math.floor(time / 60000);
        var seconds = ((time % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    playPreview = preview_url => {
        window.audio = new Audio(preview_url);
        window.audio.play();   
    }

    pausePreview = () => {
        if(window.audio) {
            window.audio.pause();
        }
    }

    trackOnClick = (preview_url, elementId) => {
        this.pausePreview();

        var item = document.getElementById(elementId);
        var isPlaying = item.classList.contains("active");

        if (isPlaying) {
            item.classList.remove("active");
        } else {
            document.querySelectorAll('.album-tracks ul li').forEach(item => {
                item.classList.remove("active");
            });
            
            item.classList.add("active");
            this.playPreview(preview_url);
        }
    }

    render() {

        var tracks = '', name = '', img = '', artist = '', artistid = '';
        
        if (this.props.tracks.hasOwnProperty('tracks')) {
            tracks = this.props.tracks.tracks.items.map(track => (
                <li key={track.id} id={track.id} onClick={() => this.trackOnClick(track.preview_url, track.id)}>
                    <div className="track-number">
                        <img src={require('../../images/np.png')} title="now playing" />
                        <span>{track.track_number}</span>
                    </div>
                    <div className="track-length">{this.convertToMinutes(track.duration_ms)}</div>
                    <div className="track-name">{track.name}</div>
                </li>
            ));
            img = this.props.tracks.images.length !== 0 ? <img src={this.props.tracks.images[1].url} alt={name}/> : '';
            name = this.props.tracks.name;
            artist = this.props.tracks.artists[0].name;
            artistid = this.props.tracks.artists[0].id;
        } 

        return (

            <div>
                
                <Link to="/" className="go-back"> <i>&lsaquo;</i> &nbsp; Voltar</Link>
                    
                <div className="track-list">

                    <div className="album-info">
                        <div className="album-image">
                            {img}
                        </div>
                        <h2>{name}</h2>
                        <Link to={`/artist/${artistid}`}>  
                            <span>{artist}</span>  
                        </Link>
                    </div>
                    
                    <div className="album-tracks">
                        <ul>
                            {tracks}
                        </ul>
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
    tracks: state.albumReducer.tracks
});

export default connect(mapStateToProps, { fetchTracks })(TrackList);