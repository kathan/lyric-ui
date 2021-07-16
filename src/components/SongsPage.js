import { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: "white",
        backgroundColor: "black"
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
          width: "100%",
        },
        backgroundColor: grey[900]
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
        paddingTop: "70px",
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingBottom: "70px"
    },
    search: {
        "& .MuiFilledInput-root": {
            background: "rgb(255, 255, 255)"
        },
        paddingLeft: "6px",
    },
    link:{
        color: "white"
    },
    listItemText:{
        "& .MuiListItemText-secondary": {
            color: grey[500]
        }
    }
}));

export default function SongsPage( { onClickSong, setlist, returnToSetlistPage, selectSetlistToAdd, newSong }) {
    const classes = useStyles();
    const [ songs, setSongs ] = useState(setlist.Songs); 
    let filteredSongs;
    const allSongs = setlist.Songs;

    const filter = e => {
        const filterValue = e.target.value;
        
        filteredSongs = allSongs.filter(song => {
            if(song.title){
                return song.title.toLowerCase().includes(filterValue.toLowerCase()) || song.artist.toLowerCase().includes(filterValue.toLowerCase())
            }
        });
        setSongs(filteredSongs);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        aria-label="back"
                    >
                        <ArrowLeft style={{ color: "white" }} onClick={returnToSetlistPage}/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {setlist.name+" Songs"}
                    </Typography>
                    <TextField
                        color="primary"
                        label="Search" 
                        variant="filled"
                        onChange={filter}
                        size="small"
                    />
                    <IconButton 
                        edge="end" 
                        aria-label="add"
                        onClick={() => newSong({title:"", artist:"", lyrics:"   "})}
                    >
                        <AddIcon 
                            style={{ color: "white" }}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <List
                    style={{padding: "0px"}}
                >
                {songs.length > 0 ? songs.map(song => (
                    <ListItem onClick={() => onClickSong(song)}>
                        <Link 
                            href={`#song/${song.id}`}
                            className={classes.link}
                        >
                            <ListItemText 
                                primary={song.title} 
                                secondary={song.artist}
                                className={classes.listItemText}
                            />
                        </Link>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="add">
                                <AddIcon 
                                    onClick={() => selectSetlistToAdd(song)}
                                    style={{ color: "white" }}
                                />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )) : 
                    <ListItem>
                        <ListItemText primary="No Songs" />
                    </ListItem>}
                </List>
            </main>
        </div>
    )
}