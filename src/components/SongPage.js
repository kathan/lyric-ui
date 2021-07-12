import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

export default function SongPage(props){
    const { song } = props;
    const link = `#song/${song.id}`;

    return (
        <ListItem>
            <Link href={link}>
                <ListItemText primary={song.name} />
            </Link>
        </ListItem>
    )
};