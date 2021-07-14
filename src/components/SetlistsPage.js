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
import Grid from '@material-ui/core/Grid';
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
        paddingTop: "70px",
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingBottom: "70px"
    },
    link:{
        color: "white"
    }
  }));
 
export default function SetlistsPage(props){
    const classes = useStyles();
    const {
        onClickSetlist,
        setlists,
        addSetlist
    } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Grid
                        justify="space-between"
                        container 
                    >
                        <Grid item> 
                            <Typography 
                                variant="h6"
                                noWrap
                            >
                                Setlists
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton 
                                aria-label="add"
                                onClick={addSetlist}
                            >
                                <AddIcon 
                                    style={{ color: "white" }}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <List
                    style={{padding: "0px"}}
                >
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