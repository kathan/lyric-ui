import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import ListIcon from '@material-ui/icons/List';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SongsPage from './SongsPage';
import SetlistsPage from './SetlistsPage';
import SongPage from './SongPage';

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    // paddingTop: "50px"
  },
}));

export default function ClippedDrawer() {
    const classes = useStyles();
    const [page, setPage] = useState(PAGE.SETLISTS);
    const [setlist, setSetlist] = useState();
    const [songs, setSongs] = useState();
    const [song, setSong] = useState();

    const selectSetlist = setlist => {
      let selectedSetlist;
      if(setlist){
        selectedSetlist = setlist;
      }else{
        selectedSetlist = {
          id: "",
          name: "All Songs",
          Songs: allSongs
        }
      }
      setSetlist(selectedSetlist);
      setPage(PAGE.SONGS);
    }

    const selectSetlistPage = () =>{
      setPage(PAGE.SETLISTS);
    }

    const onClickSong = song =>{
      setSong(song);
      setPage(PAGE.SONG);
    }

    const getPage = () => {
      let currentPage;
      switch(page) { 
        case PAGE.SONGS:
          currentPage = (
          <SongsPage
            selectSetlistPage={selectSetlistPage}
            setlist={setlist}
            songs={songs}
            onClickSong={onClickSong}
          />)
          break;
        case PAGE.SETLISTS:
          currentPage = (
          <SetlistsPage
            onClickSetlist={selectSetlist}
          />)
          break;
        case PAGE.SONG:
          currentPage = (
            <SongPage
              setSetlist={selectSetlist}
              song={song}
              setlist={setlist}
              onClickSetlist={song => {
                setSong(song);
                setPage(PAGE.SONG);
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
              color="inherit"
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
                icon={<ListIcon color="inherit"/>} 
                color="inherit"
              />
              <BottomNavigationAction 
                label="Songs" 
                value={PAGE.SONGS} 
                icon={<MusicNoteIcon color="inherit"/>}
                color="inherit"
              />
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