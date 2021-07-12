import { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function SongsPage( { onClickSong, setlistId, songs }) {

    return (
        <List>
        {songs.map(song => (
            <ListItem onClick={() => onClickSong(song)}>
                <ListItemText primary={song.name} />
            </ListItem>
        ))}
        </List>
    )
}