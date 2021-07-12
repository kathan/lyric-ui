import React, {useEffect} from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import SetlistService from '../services/setlists';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function SimpleSelect() {
  const classes = useStyles();
  const [setlists, setSetlists] = React.useState([]);
  const getSetlists = async () => {
    const setlistsReply = await SetlistService.getSetlists();
    setSetlists(setlistsReply.data.setlists);
  }

  useEffect(async () => {   
    getSetlists();
  });

  const handleChange = () => {

  }
  
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          id="demo-simple-select"
          onChange={handleChange}
        >
          {setlists.map(setlist => (
            <MenuItem 
              value={setlist.id}
            >
              {setlist.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>);
}