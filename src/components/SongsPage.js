import { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { CardHeader } from '@material-ui/core';

export default function SongsPage( { onClickSong, setlist }) {
    const allSongs = setlist.Songs;
    const [ songs, setSongs ] = useState(allSongs); 
    let filteredSongs = allSongs;
    const filter = e => {
        const filterValue = e.target.value;
        filteredSongs = allSongs.filter(song => song.name.includes(filterValue));
        setSongs(filteredSongs);
    };
    return (
        <div>
            <CardHeader title={setlist.name+" Songs"} />
            <input type="text" onKeyUp={filter}/>
            <List>
            {songs.length > 0 ? songs.map(song => (
                <ListItem onClick={() => onClickSong(song)}>
                    <ListItemText primary={song.name} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )) : 
                <ListItem>
                    <ListItemText primary="No Songs" />
                </ListItem>}
            </List>
        </div>
    )
}