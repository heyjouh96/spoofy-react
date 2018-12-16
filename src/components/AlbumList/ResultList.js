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
        if (this.props.posts.hasOwnProperty('albums')) {
            console.log("hooo", this.props.posts);
            albums = this.props.posts.albums.items.map(item => (
                <div className="album" key={item.id}>
                    <Album 
                        id={item.id}
                        name={item.name}
                        image={item.images[1].url}
                        artist={item.artists[0].name}
                        artistid={item.artists[0].id} />
                </div>
            ));
        } else if (JSON.parse(localStorage.getItem("recent")) !== null) { // verifica se existe albuns recentes no localStorage
            var recent = JSON.parse(localStorage.getItem("recent"));
            console.log("recent -> ", recent);
            albums = recent.map(item => (
                <div className="album" key={item.id}>
                        <Album 
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            artist={item.artist}
                            artistid={item.artist[0].id} />
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
    posts: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts.items
});

export default connect(mapStateToProps, {})(ResultList);
