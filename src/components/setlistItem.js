import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

export default function SetlistItem(props){
    const { setlist } = props;
    const link = `#setlist/${setlist.id}`;

    return (
        <ListItem>
            <Link href={link}>
                <ListItemText primary={setlist.name} />
            </Link>
        </ListItem>
    )
};