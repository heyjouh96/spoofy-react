import React, { Component } from 'react';
import '../../style/components/AlbumList.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArtistAlbums } from '../../actions/mainActions';
import { Link } from 'react-router-dom';
import Album from '../AlbumList/Album.js';

class ArtistAlbums extends Component {
    
    componentWillMount() {
        this.props.fetchArtistAlbums(this.props.match.params.id);
    }

    render() {

        let albums = '', artist = '';

        // verifica existe resultados da pesquisa
        if (this.props.artist_albums.items) {
            artist = this.props.artist_albums.items[0].artists[0].name;
            albums = this.props.artist_albums.items.map(item => (
                <div className="album" key={item.id}>
                    <Album 
                        id={item.id}
                        name={item.name}
                        image={item.images[1].url}
                        artist={item.artists[0].name}
                        artistid={item.artists[0].id} />
                </div>
            ));
        }

        return (
            <div>
                <Link to="/" className="go-back"> <i>&lsaquo;</i> &nbsp; Voltar</Link>
                
                <h1>Albums de {artist}</h1>

                <div className="result-list">
                    {albums}
                </div>
            </div>
        )
    }
}

ArtistAlbums.propTypes = {
    fetchArtistAlbums: PropTypes.func.isRequired,
    artist_albums: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    artist_albums: state.albumReducer.artist_albums
});

export default connect(mapStateToProps, { fetchArtistAlbums })(ArtistAlbums);