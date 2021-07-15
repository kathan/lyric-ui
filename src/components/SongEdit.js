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
import { useEffect, useState } from 'react';
// import { TimePicker } from "@material-ui/pickers";

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
    // search: {
    //     "& .MuiFilledInput-root": {
    //         background: "rgb(255, 255, 255)"
    //     },
    //     paddingLeft: "6px",
    // },
    link:{
        color: "white"
    },
    listItemText:{
        "& .MuiListItemText-secondary": {
            color: grey[500]
        }
    },
    lyrics: {
        color: "rgb(255, 255, 255)",
        fontWeight: "bold",
        fontFamily: "Arial,Helvetica,sans-serif",
        fontSize: "40px",
    },
}));
export default function SongEdit(props) {
    const { done, saveSong } = props
    const classes = useStyles();
    const [song, setSong] = useState(props.song);

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
                    style={{width: "30%"}}
                    label="Title" 
                    variant="filled"
                    onChange={event => {
                        setSong({
                            ...song,
                            title: event.target.value
                        })
                    }}
                    size="small"
                />
                <TextField
                    defaultValue={song.artist}
                    style={{width: "30%"}}
                    label="Artist" 
                    variant="filled"
                    onChange={event => {
                        setSong({
                            ...song,
                            artist: event.target.value
                        })
                    }}
                    size="small"
                />
                <TextField
                    style={{width: "30%"}}
                    label="Song Time"
                    type="time"
                    // className={classes.textField}
                    onChange={event => {
                        setSong({
                            ...song,
                            time: event.target.value
                        })
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={song.time || "00:00"}
                    style={{
                        "::-webkit-datetime-edit-ampm-field": {
                            "display": "none",
                            "color": "transparent"
                        }
                    }}
                    // ampm={false}
                    // inputProps={{
                    // step: 300, // 5 min
                    // }}
                />
                <div>
                <ContentEditable 
                    className={classes.lyrics}
                    html={song.lyrics}
                    onChange={event => song.lyrics = event.target.value}
                    id="lyrics_edit" 
                    name="lyrics" 
                    // class="song" 
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