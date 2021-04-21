import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import SetlistItem from './setlistItem';
import AddIcon from '@material-ui/icons/Add';
// import Modal from '@material-ui/core/Modal';
// import TextField from '@material-ui/core/TextField';
import SetlistService from '../services/setlists';
import FormDialog from './formDialog';

const drawerWidth = 240;

// function getModalStyle() {
//   const top = 50;
//   const left = 50;

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const useStyles = makeStyles((theme) => ({
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
    width: `calc(100% - ${drawerWidth}px)`,
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
}));

export default function PersistentDrawerLeft(props) {
  const { setlists } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [setListDrawerOpen, setSetListDrawerOpen] = React.useState(true);
  const [newSetlistOpen, setNewSetlistOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setSetListDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setSetListDrawerOpen(false);
  };

  const handleNewSetlistOpen = () => {
    setNewSetlistOpen(true);
  };

  const handleNewSetlistClose = () => {
    setNewSetlistOpen(false);
  };

  const saveSetlist = (setlist) => {
    SetlistService.saveSetlist(setlist);
  };

  const getNewSetlistModal = () => {
    return (
      <FormDialog
        handleSave={saveSetlist}
        open={newSetlistOpen}
      >
      </FormDialog>);
  }
  const modal = getNewSetlistModal();
  
  return (
    <div className={classes.root}>
      {modal}
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: setListDrawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, setListDrawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Lyric Lab
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Setlist drawer */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={setListDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton>
            <AddIcon onClick={handleNewSetlistOpen}/>
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {setlists.map(setlist => (
            <SetlistItem 
              setlist={setlist}
              key={setlist.id}
            />
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: setListDrawerOpen,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
        </Typography>
      </main>
    </div>
  );
}