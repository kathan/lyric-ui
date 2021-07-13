import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { useState, useEffect } from 'react';
import SetlistService from '../services/setlists';
import React from 'react';
import List from '@material-ui/core/List';
import SongService from '../services/songs';


class SetlistsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            setlists: [],
            onClickSetlist: props.onClickSetlist
        }
    }
    
    async getSetlists(){
        return await SetlistService.getSetlists();
    }
  
    componentDidMount(){
        
        if(this.state.allSongs === undefined){
            SongService.getAllSongs()
            .then(songsResponse => {
              this.setState({
                    allSongs: {
                          id: "",
                          name: "All Songs",
                          Songs: songsResponse.data.songs
                    }
                });
            })
            .then(() => {
                this.getSetlists()
                    .then(setlistResponse => {
                        this.setState({
                            setlists: [this.state.allSongs, ...setlistResponse.data.setlists]
                        });
                    });
            })
        }
    }

    render(){
        const {
            setlists,
            onClickSetlist
        } = this.state;

        return (
            <div>
                <h2>Setlists</h2>
                <List>
                {setlists.map(setlist => (
                    <ListItem onClick={() => onClickSetlist(setlist)}>
                        <Link href={`#setlist/${setlist.id}`}>
                            <ListItemText primary={setlist.name} />
                        </Link>
                    </ListItem>
                ))}
                </List>
            </div>
        );
    }
}

export default SetlistsPage;