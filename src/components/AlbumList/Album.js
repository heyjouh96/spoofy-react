import React from 'react';
import { Link } from 'react-router-dom';

const Album = (props) => {

    return (
        <div>
            <Link to={`/${props.id}`}>
                <img src={props.image} alt={props.name} />
            </Link>
            
            <Link to={`/${props.id}`}>
                <span className="album-title">{props.name}</span>
            </Link>

            <span className="album-artist">{props.artist}</span>

        </div>
    )
}

export default Album;