import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Search as SearchIcon } from 'react-feather';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment';

const LeaveApplicationsListResults = ({ leaveApplications, ...rest }) => {
  console.log('leaveApplications type:', typeof (leaveApplications));
  console.log('Current number of leave applications: ', leaveApplications.length);
  const [statusView] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedLeaveApplicationsIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search employee"
                variant="outlined"
                onChange={(event) => { setSearchValue(event.target.value); }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Leave Request ID
                </TableCell>
                <TableCell>
                  Employee Name
                </TableCell>
                <TableCell>
                  Date Submitted
                </TableCell>
                <TableCell>
                  Type of Leave
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveApplications.slice(0, limit).filter((val) => {
                if (searchValue === '') {
                  return val;
                }
                if (searchValue !== '') {
                  const searchVal = searchValue.toLowerCase();
                  const fullName = (`${val.lastName} ${val.firstName}`) && (`${val.lastName} ${val.firstName}`).toLowerCase().includes(searchVal);
                  console.log(fullName);
                  const firstName = val.firstName && val.firstName.toLowerCase().includes(searchVal);
                  const lastName = val.lastName && val.lastName.toLowerCase().includes(searchVal);
                  return fullName || firstName || lastName;
                }
                return null;
              }).filter((em) => {
                if (statusView === '' || em.status.toString() === statusView) {
                  return em;
                }
                return null;
              })
                .map((leaveApplication) => (
                  <TableRow
                    hover
                    key={leaveApplication.id}
                    selected={selectedLeaveApplicationsIds.indexOf(leaveApplication.id) !== -1}
                  >
                    <TableCell>
                      {leaveApplication.id}
                    </TableCell>
                    <TableCell>
                      {leaveApplication.employeeName}
                    </TableCell>
                    <TableCell>
                      {leaveApplication.dateSubmitted ? moment(leaveApplication.dateSubmitted.toDate()).calendar() : ''}
                    </TableCell>
                    <TableCell>
                      {leaveApplication.leaveType}
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={leaveApplications.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LeaveApplicationsListResults.propTypes = {
  leaveApplications: PropTypes.array.isRequired,
};

export default LeaveApplicationsListResults;
