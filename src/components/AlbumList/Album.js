import React from 'react';
import { Link } from 'react-router-dom';

const Album = (props) => {

    return (
        <div>
            <Link to={`/${props.id}`}>
                <img src={props.image !== null ? props.image : require('../../images/placeholder.png')} alt={props.name} />
            </Link>
            
            <Link to={`/${props.id}`}>
                <span className="album-title">{props.name}</span>
            </Link>

            <Link to={`/artist/${props.artistid}`}>
                <span className="album-artist">{props.artist}</span>
            </Link>
        </div>
    )
}

export default Album;