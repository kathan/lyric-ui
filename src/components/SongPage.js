import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Slider from '@material-ui/core/Slider';
import EditIcon from '@material-ui/icons/Edit';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { Grid } from '@material-ui/core';

const defaultTime = "04:00";
// let playing = false;
// const useStyles = makeStyles((theme) => ({
const styles = theme => ({
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
    paper: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
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
});

class SongPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ...props,
            fontSize: 40,
            playin: false,
            scrollPosition: 1,
            openSlider: false,
        };
    }

    parseTime(time){
        if(time){
            const timeParts = time.split(":");
            const minutes = parseInt(timeParts[0]);
            const seconds = parseInt(timeParts[1]);
            return (minutes * 60) + seconds;
        }
    }

    fontSizeChange(event, newValue){
        const value = event.target.value || newValue;
        this.setState({
            fontSize: value
        });
    }

    start(){
        this.setState({
            playing: true
        });
    }


    stop(){
        this.setState({
            playing: false
        });
    }

    togglePlay(){
        if(this.state.playing){
            this.stop();
        }else{
            this.start();
        }
    }
    
    handleScroll(event){
        if(!this.state.playing){
            console.log('setting new scroll location', event.target.documentElement.scrollTop)
            this.setState({
                scrollPosition: event.target.documentElement.scrollTop
            });
        }
        // console.log('event', event  );

        // console.log('event.target.documentElement.scrollTop', event.target.documentElement.scrollTop);
    }

    componentDidMount(){

        window.addEventListener("scroll", this.handleScroll.bind(this));

        const offScreen = document.documentElement.scrollHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight);
        this.setState({
            offScreen
        });
        const totalMilliSeconds = this.parseTime(this.state.song.time || defaultTime) * 1000;
        const interval = totalMilliSeconds / offScreen;
        this.setState({
            interval
        });
        console.log('interval', interval);
        // console.log('document.documentElement.scrollTopMax', document.documentElement.scrollTopMax)
    }

    handleBack(){
        this.state.setSetlist(this.state.setlist);
    }

    handleSliderOpen(event){
        this.setState({
            anchorEl: event.currentTarget,
        });
    }

    handleSliderClose(){
        this.setState({
            anchorEl: null
        });
    }

    render(){
        const {anchorEl, classes, song, fontSize, playing, scrollPosition, interval} = this.state;
        const openSlider = Boolean(anchorEl);

        if(playing){
            window.setTimeout(() => {
                console.log('Moving to', scrollPosition);
                window.scroll(0, scrollPosition);
                if(this.state.scrollPosition >= (document.documentElement.scrollTop + document.documentElement.clientHeight)){
                    this.stop()
                    this.setState({
                        scrollPosition: 0
                    });  
                    return;
                }
                this.setState({
                    scrollPosition: scrollPosition+1
                });  
            }, interval);
        }

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar 
                    position="fixed" 
                    className={classes.appBar}
                >
                    <Toolbar className={classes.toolbar}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                        >
                            <Grid
                                item={true}
                                xs
                                style={{textAlign: "left"}}
                            >
                                <IconButton aria-label="back">
                                    <ArrowLeft style={{ color: "white" }} onClick={this.handleBack.bind(this)}/>
                                </IconButton>
                            </Grid>
                            <Grid
                                item
                                xs
                                style={{textAlign: "center"}}
                            >
                                <Typography variant="h6" noWrap>
                                    {song.title} by {song.artist} {song.time}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs
                                style={{textAlign: "center"}}
                            >
                                <IconButton 
                                    style={{color: "white"}}
                                    variant="contained" 
                                    color="primary" 
                                    onClick={this.handleSliderOpen.bind(this)}
                                >
                                    <TextFieldsIcon/>
                                </IconButton>
                                <Popover
                                    open={openSlider}
                                    anchorEl={anchorEl}
                                    onClose={this.handleSliderClose.bind(this)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <div className={classes.paper}>
                                        <Slider 
                                            min={5}
                                            style={{ width: "200px"}}
                                            className={classes.slider}
                                            onChange={this.fontSizeChange.bind(this)} 
                                            aria-labelledby="continuous-slider" 
                                            value={fontSize}
                                        />
                                    </div>
                                </Popover>
                            </Grid>
                            <Grid
                                item
                                style={{textAlign: "center"}}
                                xs
                            >
                                {playing ? 
                                <IconButton 
                                    aria-label="play"
                                >
                                    <Pause 
                                        style={{ color: "white" }}
                                        onClick={this.stop.bind(this)}
                                    />
                                </IconButton> :
                                <IconButton aria-label="play">
                                    <PlayArrow 
                                        style={{ color: "white" }}
                                        onClick={this.start.bind(this)}
                                    />
                                </IconButton>
                                }
                            </Grid>
                            <Grid
                                item
                                xs
                                style={{textAlign: "right"}}
                            >
                                <IconButton 
                                    aria-label="edit"
                                >
                                    <EditIcon 
                                        style={{ marginLeft: 'auto', color: "white" }}
                                        onClick={() => this.state.editSong(song)}
                                    />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <Typography 
                        onClick={this.togglePlay.bind(this)}
                        className={classes.lyrics}
                        style={{fontSize: fontSize+'px'}}
                        display="block"
                        dangerouslySetInnerHTML={{__html: song.lyrics}} 
                    />
                </main>
            </div>
        )
    }
};

export default withStyles(styles, { withTheme: true })(SongPage);
