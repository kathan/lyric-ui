import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Slider from '@material-ui/core/Slider';
import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { grey } from '@material-ui/core/colors';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';


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
        paddingTop: "50px",
    },
    lyrics: {
        color: "rgb(255, 255, 255)"
    },
    fontSize: {
        "& .MuiFilledInput-root": {
            background: "rgb(255, 255, 255)"
        },
    },
    slider:{
        "& .MuiSlider-thumb": {
            color: "rgb(255, 255, 255)"
        },
        "& .MuiSlider-rail": {
            color: "rgb(255, 255, 255)",
            backgroundColor: "rgb(255, 255, 255)"
        },
    }
}));
export default function SongPage(props){
    const classes = useStyles();
    const { song, setlist, setSetlist } = props;
    const [fontSize, setFontSize] = useState(20);
    const [playing, setPlaying] = useState(false);

    const fontSizeChange = (event, newValue) => {
        const value = event.target.value || newValue;
        setFontSize(value);
    }

    const play = () => {
        setPlaying(true);
    }

    const stop = () => {
        setPlaying(false);
    }
    console.log('window.pageYOffset', window.pageYOffset);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar 
                position="fixed" 
                className={classes.appBar}
            >
                <Toolbar>
                    <IconButton edge="start" aria-label="back">
                        <ArrowLeft style={{ color: "white" }} onClick={() => setSetlist(setlist)}/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {song.title}
                    </Typography>
                    <div 
                        style={{width: "30%", paddingLeft: "10px", paddingRight: "10px"}}
                    >
                        <Slider 
                            style={{ size: "100px", color: "white" }}
                            className={classes.slider}
                            // valueLabelDisplay="auto"
                            onChange={fontSizeChange} 
                            aria-labelledby="continuous-slider" 
                            value={fontSize}
                        />
                    </div>
                    {playing ? 
                    <IconButton edge="end" aria-label="play">
                        <Pause 
                            style={{ color: "white" }}
                            onClick={stop}
                        />
                    </IconButton> :
                    <IconButton edge="end" aria-label="play">
                        <PlayArrow 
                            style={{ color: "white" }}
                            onClick={play}
                        />
                    </IconButton> 
                    }
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Typography 
                    className={classes.lyrics}
                    style={{fontSize: fontSize+'px'}}
                    display="block"
                    dangerouslySetInnerHTML={{__html: song.lyrics}} 
                />
            </main>
        </div>
    )
};