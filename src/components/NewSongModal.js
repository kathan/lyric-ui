import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField} from '@material-ui/core';

export default function NewSongModal(props) {
  const { handleClose, handleSave } = props;

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Song</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Input type="submit" value="Save" color="primary"/>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}