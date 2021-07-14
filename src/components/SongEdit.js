import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ContentEditable from 'react-contenteditable';

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
export default function SongEdit( { song, done, saveSong }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {song ? "Edit "+song.title : "New Song"}
                    </Typography>
                    <Button onClick={done} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        onClick={()=>saveSong(song)}
                    >
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <TextField
                    defaultValue={song.title}
                    style={{width: "50%", color: "black", backgroundColor: "white"}}
                    label="Title" 
                    variant="filled"
                    onChange={event => song.title = event.target.value}
                    size="small"
                />
                <TextField
                    defaultValue={song.artist}
                    style={{width: "50%", color: "black", backgroundColor: "white"}}
                    label="Artist" 
                    variant="filled"
                    onChange={event => song.artist = event.target.value}
                    size="small"
                />
                <div>
                <ContentEditable 
                    html={song.lyrics}
                    onChange={event => song.lyrics = event.target.value}
                    id="lyrics_edit" 
                    name="lyrics" 
                    class="song" 
                    ng-model="current_song.lyrics" 
                    strip-br="true" 
                    required
                    style={{width: "100%", height: "100%"}}
                />
                </div>
            </main>
        </div>
    )
}