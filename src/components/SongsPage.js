import { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { CardHeader } from '@material-ui/core';

export default function SongsPage( { onClickSong, setlist, songs }) {
    const [ allSongs, setSongs ] = useState(songs); 
    let filteredSongs = allSongs;

    const filter = e => {
        const filterValue = e.target.value;
        filteredSongs = allSongs.filter(song => song.title.toLowerCase().includes(filterValue));
        setSongs(filteredSongs);
    };

    return (
        <div>
            <CardHeader title={setlist.name+" Songs"} />
            <input type="text" onKeyUp={filter}/>
            <List>
            {songs.length > 0 ? songs.map(song => (
                <ListItem onClick={() => onClickSong(song)}>
                    <Link href={`#song/${song.id}`}>
                        <ListItemText primary={song.title} />
                    </Link>
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