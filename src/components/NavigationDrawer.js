import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SetlistItem from './SetlistItem';
import AddIcon from '@material-ui/icons/Add';
import SetlistService from '../services/setlists';
import NewSetlistModal from './NewSetlistModal';
import SongDrawer from './SongDrawer';
import SetlistSelect from './SetlistSelect';

const drawerWidth = '100%';
const styles = theme => ({
  theme,
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class NavigationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes,
      setlistDrawerOpen: true,
      songDrawerOpen: false,
      newSetlistOpen:false,
      selectedSetlist: null,
      setlists: [],
    }
  }

  handleSetlistDrawerOpen(){
    this.setState({setlistDrawerOpen:true});
  };

  handleSongDrawerOpen(selectedSetlist){
    this.setState({
      selectedSetlist,
      songDrawerOpen: true,
      setlistDrawerOpen: false,
    });
  };

  handleSongDrawerClose(){
    this.setState({
      songDrawerOpen: false
    });
  };

  handleSetlistDrawerClose(){
    this.setState({
      setlistDrawerOpen: false
    });
  };

  handleNewSetlistOpen(){
    this.setState({
      newSetlistOpen: true
    });
  };

  handleNewSetlistClose(){
    this.setState({
      newSetlistOpen: false
    });
  };

  async saveSetlist(event){
    event.preventDefault();
    const setlist = {
      name: event.target.elements.name.value
    };
    const newSetList = await SetlistService.saveSetlist(setlist);

    this.handleNewSetlistClose();
  };

  getSetlists(callback){
    SetlistService.getSetlists()
    .then(setlists => {
        if(setlists.data && setlists.data.setlists){
          this.setState({
            setlists: setlists.data.setlists
          });
        }
    })
    .catch(error => {
        console.log(error);
    });
  }

  componentDidMount() {
    this.getSetlists();
  }

  render(){
    const { 
      classes,
      setlistDrawerOpen,
      newSetlistOpen,
    } =  this.state;

    return (
      <div className={classes.root}>
        <NewSetlistModal
          handleSave={this.saveSetlist.bind(this)}
          handleClose={this.handleNewSetlistClose.bind(this)}
          open={newSetlistOpen}
        >
        </NewSetlistModal>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: setlistDrawerOpen || this.state.songDrawerOpen,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleSetlistDrawerOpen.bind(this)}
              edge="start"
              className={clsx(classes.menuButton, (setlistDrawerOpen || this.state.songDrawerOpen) && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Lyric Lab
            </Typography>
          </Toolbar>
        </AppBar>
        <SongDrawer
          open={() => true}
          handleOpen={this.handleSongDrawerOpen.bind(this)}
          handleClose={this.handleSongDrawerClose.bind(this)}
          getSelectedSetlist={() => this.state.selectedSetlist}
          classes={classes}
        />
        </div> 
    );
  }
}

export default withStyles(styles, { withTheme: true })(NavigationDrawer);