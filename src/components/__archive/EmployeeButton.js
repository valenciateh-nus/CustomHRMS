import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5)
  },
  label: {
    textTransform: 'none'
  }
}));

function EmployeeButton(props) {
  const {
    text, size, color, variant, onClick, ...other
  } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
}

EmployeeButton.propTypes = {
  onClick: PropTypes.any.isRequired,
  variant: PropTypes.any,
  color: PropTypes.any,
  text: PropTypes.any,
  size: PropTypes.any
};

export default EmployeeButton;
