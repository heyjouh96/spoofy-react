import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Album from '../Album';
import { Link } from 'react-router-dom'

class ResultList extends Component {

    render() {
        let albums = '';

        if (this.props.posts.hasOwnProperty('albums')) {
            albums = this.props.posts.albums.items.map(item => (
                <Link to={`/${item.id}`} key={item.id}>
                    <Album key={item.id} name={item.name} image={item.images[1].url} />
                </Link>
            ));
        }

        return (
            <div>
                <h2>Resultados</h2>
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
