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
import EditIcon from '@material-ui/icons/Edit';
import { grey } from '@material-ui/core/colors';

// let playing = false;
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
        paddingBottom: "70px",
        paddingLeft: "0px",
        paddingRight: "0px"
    },
    lyrics: {
        color: "rgb(255, 255, 255)",
        fontWeight: "bold",
        fontFamily: "Arial,Helvetica,sans-serif"
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
export default function SongPage({ song, setlist, setSetlist, editSong }){
    const classes = useStyles();
    const [fontSize, setFontSize] = useState(40);
    const [playing, setPlaying] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(1);
    const [offScreen, setOffScreen] = useState();
    const [interval, setInterval] = useState();

    const parseTime = time => {
        if(time){
            const timeParts = time.split(":");
            const minutes = parseInt(timeParts[0]);
            const seconds = parseInt(timeParts[1]);
            return (minutes * 60) + seconds;
        }
    }

    const fontSizeChange = (event, newValue) => {
        const value = event.target.value || newValue;
        setFontSize(value);
    }

    const start = () => {
        setPlaying(true);
        // playing = true;
    }

    

    const stop = () => {
        setPlaying(false);
        // playing = flase;
    }

    const togglePlay = () =>{
        if(playing){
            stop();
        }else{
            start();
        }
    }
    
    if(playing){
        window.setTimeout(() => {
            console.log('Moving to', scrollPosition);
            window.scroll(0, scrollPosition);
            if(scrollPosition >= (document.documentElement.scrollTop + document.documentElement.clientHeight)){
                stop()
                setScrollPosition(0);  
                return;
            }
            setScrollPosition(scrollPosition+1);  
        }, interval);
    }

    const handleScroll = event => {
        if(!playing){
            // console.log('setting new scroll location', event.target.documentElement.scrollTop)
            // setScrollPosition(event.target.documentElement.scrollTop)
        }
        // console.log('event', event  );

        // console.log('event.target.documentElement.scrollTop', event.target.documentElement.scrollTop);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        
        setOffScreen(document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight));
        const totalMilliSeconds = parseTime(song.time || "04:00") * 1000;
        setInterval(totalMilliSeconds / offScreen);
        console.log('interval', interval);
            
    });
    // console.log('document.documentElement.scrollTopMax', document.documentElement.scrollTopMax)

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar 
                position="fixed" 
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>
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
                            onClick={start}
                        />
                    </IconButton>
                    }
                    <IconButton edge="end" aria-label="edit">
                        <EditIcon 
                            style={{ color: "white" }}
                            onClick={() => editSong(song)}
                        />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Typography 
                    onClick={togglePlay}
                    className={classes.lyrics}
                    style={{fontSize: fontSize+'px'}}
                    display="block"
                    dangerouslySetInnerHTML={{__html: song.lyrics}} 
                />
            </main>
        </div>
    )
};