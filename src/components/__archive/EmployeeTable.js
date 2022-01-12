import React from 'react';
import {
  Table, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    '& thead th': {
      fontWeight: '600',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}));

function EmployeeTable(records, headCells) {
  const classes = useStyles();
  const TblContainer = (props) => (
    <Table className={classes.table}>
      const children =
      {props}
    </Table>
  );

  const TblHead = (props) => {
    console.log(props);
    return (
      <TableHead>
        <TableRow>
          {
            headCells.map((headCell) => (
              <TableCell key={headCell.id}>
                {headCell.label}
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    );
  };
  return {
    TblContainer,
    TblHead
  };
}

EmployeeTable.PropTypes = {
  TblHead: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired
};

export default EmployeeTable;
