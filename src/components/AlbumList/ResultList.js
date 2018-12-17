import React, {Component} from 'react';
import '../../style/components/AlbumList.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Album from './Album.js';

class ResultList extends Component {

    componentWillMount() {
        if(window.audio) {
            window.audio.pause();
        }

    }

    render() {
        let albums = '';

        // verifica existe resultados da pesquisa
        if (this.props.albums.albums) {
            albums = this.props.albums.albums.items.map(item => (
                <div className="album" key={item.id}>
                    <Album 
                        id={item.id}
                        name={item.name}
                        image={item.images.length !== 0 ? item.images[1].url : null}
                        artist={item.artists[0].name}
                        artistid={item.artists[0].id} />
                </div>
            ));
        } else if (JSON.parse(localStorage.getItem("recent")) !== null) { // verifica se existe albuns recentes no localStorage
            var recent = JSON.parse(localStorage.getItem("recent"));
            albums = recent.map(item => (
                <div className="album" key={item.id}>
                        <Album 
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            artist={item.artist}
                            artistid={item.artistid} />
                </div>
            ));
        }

        return (
            <div className="result-list">
                {albums}
            </div>
        )
    }
}

ResultList.propTypes = {
    albums: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    albums: state.albumReducer.items
});

export default connect(mapStateToProps, {})(ResultList);
