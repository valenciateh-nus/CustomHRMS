import {
  Dialog, DialogTitle, DialogContent, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
// import EmployeeButton from './EmployeeButton';
import ActionButton from './ActionButton';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px'
  }
}));

function EmployeePopup(props) {
  const {
    title, children, openPopup, setOpenPopup
  } = props;
  console.log(title, children, setOpenPopup);

  const classes = useStyles();

  return (
    <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <ActionButton
            color="secondary"
            onClick={() => { setOpenPopup(false); }}
          >
            <CloseIcon />
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>

  );
}

EmployeePopup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  openPopup: PropTypes.any.isRequired,
  setOpenPopup: PropTypes.any.isRequired,
};

export default EmployeePopup;
