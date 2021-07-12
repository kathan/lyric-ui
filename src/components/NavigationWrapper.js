import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListIcon from '@material-ui/icons/List';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SongsPage from './SongsPage';
import SetlistsPage from './SetlistsPage';


const drawerWidth = 240;

const PAGE = {
  SETLISTS: 'SETLISTS',
  SONGS: 'SONGS',
  SONG: 'SONG',
  SONG_EDIT: 'SONG_EDIT' 
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    top: 'auto',
    bottom: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
    const classes = useStyles();
    const [page, setPage] = useState(PAGE.SETLISTS);
    const [setlist, setSetlist] = useState();
    const [songs, setSongs] = useState();
    const [song, setSong] = useState();

    const getPage = () => {
      let currentPage;
      switch(page) { 
        case PAGE.SONGS:
          currentPage = (
          <SongsPage
            setlist={setlist}
            onClickSong={song => {
              setSong(song);
              setPage(PAGE.SONG);
            }}
          />)
          break;
        case PAGE.SETLISTS:
          currentPage = (
          <SetlistsPage
            onClickSetlist={setlist => {
              setSetlist(setlist);
              setSongs(setlist.Songs);
              setPage(PAGE.SONGS);
            }}
          />)
          break;
        case PAGE.SONG:
          currentPage = (
            <SongPage
              onClickSetlist={setlist => {
                setSetlist(setlist);
                setSongs(setlist.Songs);
                setPage(PAGE.SONGS);
              }}
            />)
          break;
          case PAGE.SONG_EDIT:
            currentPage = (
              <SongEdit
                onClickSetlist={setlist => {
                  setSetlist(setlist);
                  setSongs(setlist.Songs);
                  setPage(PAGE.SONGS);
                }}
              />)
            break;
          }
          return currentPage;
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <BottomNavigation
              position="fixed"
              // value={page}
              onChange={(event, newValue) => {
                setPage(newValue);
              }}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction 
                label="Setlists" 
                value={PAGE.SETLISTS} 
                icon={<ListIcon />} 
              />
              <BottomNavigationAction 
                label="Songs" 
                value={PAGE.SONGS} 
                icon={<MusicNoteIcon 
              />} />
            </BottomNavigation>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          {getPage()}
        </main>
        <BottomNavigation/>
      </div>
    );
  }