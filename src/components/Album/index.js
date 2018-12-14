import React from 'react';

const Album = (props) => {

    return (
        <div className="album">
            <img src={props.image} alt={props.name} />

            <span className="album-title">{props.name}</span>

            <span className="album-artist">{props.artist}</span>

        </div>
    )
}

export default Album;