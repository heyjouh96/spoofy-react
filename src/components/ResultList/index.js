import React, {Component} from 'react';
import '../../style/components/ResultList.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Album from '../Album';
import { Link } from 'react-router-dom'

class ResultList extends Component {

    render() {
        let albums = '';

        if (this.props.posts.hasOwnProperty('albums')) {
            console.log(this.props.posts);
            albums = this.props.posts.albums.items.map(item => (
                <Link to={`/${item.id}`} key={item.id}>
                    <Album key={item.id}
                            name={item.name}
                            image={item.images[1].url}
                            artist={item.artists[0].name} />
                </Link>
            ));
        }

        return (
            <div>
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
