import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowLeft';

const useStyles = makeStyles((theme) => ({
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
        paddingTop: "50px"
    },
}));
export default function SongPage(props){
    const classes = useStyles();
    const { song, setlist, setSetlist } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" aria-label="back">
                        <ArrowLeft onClick={() => setSetlist(setlist)}/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {song.title}
                    </Typography>
                    <IconButton edge="end" aria-label="play">
                        <PlayArrow />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Typography 
                    display="block"
                    dangerouslySetInnerHTML={{__html: song.lyrics}} 
                />
            </main>
        </div>
    )
};