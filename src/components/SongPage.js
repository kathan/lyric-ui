import React from 'react';
import ReactDOM from 'react-dom';

export default function SongPage(props){
    const { song } = props;

    return (
        <div>
            <h2>{song.title}</h2>
            <div dangerouslySetInnerHTML={{__html: song.lyrics}}></div>
        </div>
    )
};