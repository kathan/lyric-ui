import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import SetlistService from '../services/setlists';
import React from 'react';
import List from '@material-ui/core/List';
import SongService from '../services/songs';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: "100%",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    //   top: "100px"
    },
  });
 

class SetlistsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            onClickSetlist: props.onClickSetlist
        }
    }
    
    // async getSetlists(){
    //     return await SetlistService.getSetlists();
    // }
  
    // componentDidMount(){
    //     let allSongs;
    //     let setlistResult;
    //     if(this.state.allSongs === undefined){
    //         SongService.getAllSongs()
    //         .then(songsResponse => {
    //             allSongs = {
    //                 allSongs: {
    //                       id: "",
    //                       name: "All Songs",
    //                       Songs: songsResponse.data.songs
    //                 }
    //             };
    //             this.setState(allSongs);
    //             this.checkData(allSongs, setlistResult);
    //         });
    //     }

    //     if(this.state.setlists === undefined){
    //         this.getSetlists()
    //             .then(setlistResponse => {
    //                 setlistResult = setlistResponse.data.setlists;
    //                 this.checkData(allSongs, setlistResult);
    //             });
    //     }
    // }

    // checkData(allSongs, setlistResponse){
    //     if(allSongs && Array.isArray(setlistResponse)){
    //         this.setState({
    //             setlists: [this.state.allSongs, ...setlistResponse]
    //         });
    //     }
    // }

    render(){
        const {
            onClickSetlist,
            classes
        } = this.state;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Setlists
                        </Typography>
                        <IconButton edge="end" aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <List>
                    {this.state.setlists ? this.state.setlists.map(setlist => (
                        <React.Fragment>
                            <ListItem onClick={() => onClickSetlist(setlist)}>
                                <Link href={`#setlist/${setlist.id}`}>
                                    <ListItemText primary={setlist.name} />
                                </Link>
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    )) : 
                        <ListItem>
                            <ListItemText primary="Loading..." />
                        </ListItem>}
                    </List>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(SetlistsPage);