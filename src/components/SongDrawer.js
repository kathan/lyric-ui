import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SongItem from './SongItem';
import { IconButton, Typography, Drawer, Divider, List } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = '100%';

const styles = theme => ({
    theme,
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
});

class SongDrawer extends React.Component{
    constructor(props){
        super(props);
        this.state = props;
    }

    handleNewSongOpen(){

    }

    render(){
        const { classes } =  this.state;
        const setlist = this.state.getSelectedSetlist();
        const open = this.state.open();

        return (
            <Drawer
                className={this.state.classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography variant="h6">
                        {setlist ? setlist.name : ''} Songs
                    </Typography>
                    <IconButton onClick={this.handleNewSongOpen.bind(this)}>
                        <AddIcon/>
                    </IconButton>
                    <IconButton onClick={this.state.handleClose.bind(this)}>
                        {classes.theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                    
                <List>
                    {setlist ? setlist.Songs.map(setlist => (
                        <SongItem 
                        setlist={setlist}
                        key={setlist.id}
                        />
                    )) : ''}
                </List>
            </Drawer>
        );
    }
  }
  export default withStyles(styles, { withTheme: true })(SongDrawer);