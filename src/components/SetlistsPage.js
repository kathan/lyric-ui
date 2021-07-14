import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
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
    //   top: "100px"
    },
    link:{
        color: "white"
    }
  }));
 
export default function SetlistsPage(props){
    const classes = useStyles();
    const {
        onClickSetlist,
        setlists
    } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Setlists
                    </Typography>
                    <IconButton edge="end" aria-label="add">
                        <AddIcon style={{ color: "white" }}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <List>
                {setlists ? setlists.map(setlist => (
                    <React.Fragment>
                        <ListItem onClick={() => onClickSetlist(setlist)}>
                            <Link 
                                href={`#setlist/${setlist.id}`}
                                className={classes.link}
                            >
                                <ListItemText 
                                    primary={setlist.name} 
                                />
                            </Link>
                        </ListItem>
                        <Divider component="li" />
                    </React.Fragment>
                )) : 
                    <ListItem>
                        <ListItemText primary="Loading..." />
                    </ListItem>}
                </List>
            </main>
        </div>
    );
}