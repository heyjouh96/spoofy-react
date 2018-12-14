import React, {Component} from 'react';
import '../../style/components/AlbumList.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Album from './Album.js';

class ResultList extends Component {

    render() {
        let albums = '';

        if (this.props.posts.hasOwnProperty('albums')) {
            console.log(this.props.posts);
            albums = this.props.posts.albums.items.map(item => (
                <div className="album">
                    <Link to={`/${item.id}`} key={item.id}>
                        <Album key={item.id}
                                name={item.name}
                                image={item.images[1].url}
                                artist={item.artists[0].name} />
                    </Link>
                </div>
            ));
        }

        return (
            <div className="result-list">

                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>

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
