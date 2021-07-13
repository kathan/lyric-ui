import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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
import SongService from '../services/songs';
import SetlistService from '../services/setlists';



const PAGE = {
  SETLISTS: 'SETLISTS',
  SONGS: 'SONGS',
  SONG: 'SONG',
  SONG_EDIT: 'SONG_EDIT' 
};

const styles = theme => ({
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
});

class NavigationWrapper extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      page: PAGE.SETLISTS
    };
  }

  selectSetlist(setlist){
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
    this.setState({
      setlist: selectedSetlist,
      page: PAGE.SONGS
    });
  }

  selectSetlistPage(){
    this.setState({
      page: PAGE.SETLISTS
    });
  }

  selectSong(song){
    this.setState({
      song,
      page: PAGE.SONG
    });
  }

  async getSetlists(){
    return await SetlistService.getSetlists();
  }

  componentDidMount(){
    this.loadData();
  }

  loadData(){
    let allSongs;
      let setlistResult;
      if(this.state.allSongs === undefined){
          SongService.getAllSongs()
          .then(songsResponse => {
              allSongs = {
                  allSongs: {
                        id: "",
                        name: "All Songs",
                        Songs: songsResponse.data.songs
                  }
              };
              this.setState(allSongs);
              this.checkData(allSongs, setlistResult);
          });
      }

      if(this.state.setlists === undefined){
          this.getSetlists()
              .then(setlistResponse => {
                  setlistResult = setlistResponse.data.setlists;
                  this.checkData(allSongs, setlistResult);
              });
      }
  }

  checkData(allSongs, setlistResponse){
    if(allSongs && Array.isArray(setlistResponse)){
        this.setState({
            setlists: [this.state.allSongs, ...setlistResponse]
        });
    }
  }

  getPage(){
    let currentPage;
    switch(this.state.page) { 
      case PAGE.SONGS:
        currentPage = (
        <SongsPage
          selectSetlistPage={this.selectSetlistPage.bind(this)}
          setlist={this.state.setlist}
          songs={this.state.songs}
          onClickSong={this.selectSong.bind(this)}
        />)
        break;
      case PAGE.SETLISTS:
        currentPage = (
        <SetlistsPage
          setlists={this.state.setlists}
          onClickSetlist={this.selectSetlist.bind(this)}
        />)
        break;
      case PAGE.SONG:
        currentPage = (
          <SongPage
            setSetlist={this.selectSetlist.bind(this)}
            song={this.state.song}
            setlist={this.state.setlist}
            onClickSetlist={song => {
              this.setState({
                song,
                page: PAGE.SONG
              });
            }}
          />)
        break;
        case PAGE.SONG_EDIT:
          currentPage = (
            <SongEdit
              onClickSetlist={setlist => {
                this.setState({
                  setlist,
                  songs: setlist.Songs,
                  page: PAGE.SONGS
                });
              }}
            />)
          break;
        }
        return currentPage;
  }
  
  render(){
      const {
        classes
      } = this.state;

      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <BottomNavigation
                position="fixed"
                color="inherit"
                onChange={(event, newValue) => {
                  this.setState({
                    page: newValue
                  });
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
            {this.getPage()}
          </main>
          <BottomNavigation/>
        </div>
      );
  }
}

export default withStyles(styles, { withTheme: true })(NavigationWrapper);