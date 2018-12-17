import React from 'react';
import { Link } from 'react-router-dom';

const Album = (props) => {
    
    let image = props.image === null ? '' : <img src={props.image} alt={props.name} />;
    
    return (
        <div>
            <Link to={`/${props.id}`}>
                <div className="album-image">
                    {image}
                </div>
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