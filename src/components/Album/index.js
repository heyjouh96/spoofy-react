import React from 'react';

const Album = (props) => {

    return (
        <div>
            <img src={props.image} alt={props.name} />

            <h3>{props.name}</h3>

        </div>
    )
}

export default Album;