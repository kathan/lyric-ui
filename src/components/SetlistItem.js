import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

class SetlistItem extends React.Component{
    constructor(props){
        super(props);
        this.state = props;
        this.setlist = props.setlist;
        this.link = `#setlist/${this.setlist.id}`;
    }

    render(){
        const {handleSongDrawerOpen} = this.state;

        return (
            <ListItem>
                <Link href={this.link} onClick={handleSongDrawerOpen()}>
                    <ListItemText primary={this.setlist.name} />
                </Link>
            </ListItem>
        );
    }
};

export default SetlistItem;