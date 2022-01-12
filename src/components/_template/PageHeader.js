import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography
} from '@material-ui/core';

export default function PageHeader(props) {
  const classes = useStyles();
  const { title, subTitle } = props;
  return (
    <Paper elevation={0} square className={classes.root}>
      <div className={classes.pageHeader}>
        <div className={classes.pageTitle}>
          <Typography
            variant="h6"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
          >
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string
};
