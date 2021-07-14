import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import ListIcon from '@material-ui/icons/List';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SongsPage from './SongsPage';
import SetlistsPage from './SetlistsPage';
import SongPage from './SongPage';
import SongService from '../services/songs';
import SetlistService from '../services/setlists';
import { grey } from '@material-ui/core/colors';
import SetlistEdit from './SetlistEdit';
import SetlistSelectPage from './SetlistSelectPage';
import SongEdit from './SongEdit';

const PAGE = {
  SETLISTS: 'SETLISTS',
  SONGS: 'SONGS',
  SONG: 'SONG',
  SONG_EDIT: 'SONG_EDIT',
  SETLIST_EDIT: 'SETLIST_EDIT',
  ADD_SONG_TO_SETLIST: 'ADD_SONG_TO_SETLIST',
  ALL_SONGS: 'ALL_SONGS'
};

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    top: 'auto',
    bottom: 0,
    backgroundColor: grey[900]
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    padding: "0px"
  },
  navAction: {
    color: "white"
  },
  tabBar:{
    width: "100%"
  }
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

  addSetlist(setlist){
    this.setState({
      page: PAGE.SETLIST_EDIT
    })
  }

  saveSongToSetlist(song, setlist){
    SetlistService.addSongToSetlist(setlist.id, song.id)
      .then(addSongToSetlistResult => {
        this.setState({
          page: PAGE.SONGS,
        });
        this.loadData();
      })
  }

  saveSetlist(setlist){
    SetlistService.saveSetlist(setlist)
      .then(addSetlistResult => {
        this.setState({
          page: PAGE.SETLISTS,
          setlists: [...this.state.setlists, addSetlistResult.data]
        })
      })
  }

  selectSetlistToAdd(song){
    this.setState({
      song,
      page: PAGE.ADD_SONG_TO_SETLIST
    })
  }

  showAllSongs(){
    this.setState({
      setlist: this.state.allSongs,
      page: PAGE.SONGS
    })
  }

  editSong(song){
    this.setState({
      song,
      page: PAGE.SONG_EDIT
    })
  }

  saveSong(song){
    SongService.saveSong(song)
      .then(songResult => {
        this.setState({
          page: PAGE.ALL_SONGS,
          allSongs: {
            ...this.state.allSongs,
            Songs: [...this.state.allSongs.Songs, songResult.data]
          }
        })
      })
  }

  getPage(){
    let currentPage;
    switch(this.state.page) {
      case PAGE.ALL_SONGS:
        this.showAllSongs();
        break;
      case PAGE.ADD_SONG_TO_SETLIST:
        currentPage = (
        <SetlistSelectPage
          onSelect={this.saveSongToSetlist.bind(this)}
          setlists={this.state.setlists}
          song={this.state.song}
        />);
        break;
      case PAGE.SETLIST_EDIT:
        let currentSetlist = this.state.setlist || {
          name: ""
        }
        currentPage = (
        <SetlistEdit 
          saveSetlist={this.saveSetlist.bind(this)}
          setlist={currentSetlist}
          done={()=>{
            this.setState({
              page: PAGE.SETLISTS
            });
          }}
        />);
        break;
      case PAGE.SONGS:
        currentPage = (
        <SongsPage
          newSong={this.editSong.bind(this)}
          selectSetlistToAdd={this.selectSetlistToAdd.bind(this)}
          returnToSetlistPage={this.selectSetlistPage.bind(this)}
          setlist={this.state.setlist}
          onClickSong={this.selectSong.bind(this)}
        />)
        break;
      case PAGE.SETLISTS:
        currentPage = (
        <SetlistsPage
          addSetlist={this.addSetlist.bind(this)}
          setlists={this.state.setlists}
          onClickSetlist={this.selectSetlist.bind(this)}
        />)
        break;
      case PAGE.SONG:
        currentPage = (
          <SongPage
            editSong={this.editSong.bind(this)}
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
              saveSong={this.saveSong.bind(this)}
              done={()=>{
                this.setState({
                  page: PAGE.SONGS
                });
              }}
              song={this.state.song}
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
          <AppBar position="fixed" className={classes.appBar}>
                <Tabs
                  variant="fullWidth"
                  className={classes.tabBar}
                  onChange={(event, newValue) => {
                    this.setState({
                      page: newValue
                    });
                  }}
                  aria-label="simple tabs example"
                >
                  <Tab 
                    label="Setlists" 
                    icon={<ListIcon/>}
                    value={PAGE.SETLISTS} 
                  />
                  <Tab 
                    label="Songs" 
                    icon={<MusicNoteIcon/>}
                    value={PAGE.ALL_SONGS} 
                  />
                </Tabs>
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