import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';


const Input = (props) => {
	return (
		<input type="text" placeholder="Comece a escrever" onInput={props.inputed}/>
	);
}

class Search extends Component {

	renderInput = () => {
		return <Input inputed={(event) => this.onInput(event)}/>
	}

	onInput(event) {
		this.props.fetchPosts(event.target.value);
	}

	render() {
		return (
			<div className="container">
				{this.renderInput()}
			</div>
		);
	}
}

Search.propTypes = {
	fetchPosts: PropTypes.func.isRequired,
}

// const mapStateToProps = state => ({
// 	posts: state.posts.items
// })

export default connect(null, { fetchPosts })(Search);
