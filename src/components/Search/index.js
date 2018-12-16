import React, { Component } from 'react';
import '../../style/components/Search.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlbums } from '../../actions/mainActions';


const Input = (props) => {
	return (
		<input type="text" placeholder="Comece a escrever" onInput={props.inputed} className="searchAlbum"/>
	);
}

class Search extends Component {

	constructor(props) {
		super(props);
		this.state = {
			'search': ''
		}
	}

	renderInput = () => {
		return <Input inputed={(event) => this.onInput(event)}/>
	}

	onInput(event) {
		this.setState({search: event.target.value});
		this.props.fetchAlbums(event.target.value);
	}

	render() {

		const title = this.state.search == '' ? 'Álbuns buscados recentemente' : `Resultados encontrados para "${this.state.search}"`;

		return (
			<div className="search">
				<span>Busque por álbuns, artistas ou músicas</span>
				{this.renderInput()}


				<h2>{title}</h2>
			</div>
		);
	}
}

Search.propTypes = {
	fetchAlbums: PropTypes.func.isRequired,
}

export default connect(null, { fetchAlbums })(Search);
