import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';
import Album from '../Album';

class ResultList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.posts) {
            this.setState({albums: nextProps.posts.albums.items});
            console.log("state ->", this.state);
        }
    }

    render() {
        
        const albums = this.state.albums.map(item => (
            <Album key={item.id} name={item.name} image={item.images[1].url} />
        ));

        return (
            <div>
                <h2>Resultados</h2>
                {albums}
            </div>
        )
    }
}

ResultList.propTypes = {
    posts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    posts: state.posts.items
});

export default connect(mapStateToProps, {})(ResultList);
