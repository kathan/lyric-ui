import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
        paddingTop: "100px"
    },
    link:{
        color: "white"
    }
  }));
export default function SetlistEdit( { saveSetlist, done, setlist }) {
    const classes = useStyles();

    let name = "";
    let title = "New Setlist";
    if(setlist.id){
        name = setlist.name;
        title = `Edit Setlist ${setlist.name}`
    }
    return (
        <div 
            className={classes.root}
        >
            <CssBaseline />
            <AppBar 
                position="fixed" 
                className={classes.appBar}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
            <TextField
                defaultValue={name}
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                onChange={event => setlist.name = event.target.value}
            />
            <Button onClick={done} color="primary">
              Cancel
            </Button>
            <Button 
                onClick={()=>saveSetlist(setlist)}
            >
                Save
            </Button>
            </div>
        </div>
    );
}