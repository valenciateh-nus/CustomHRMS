import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import {
  Box,
  Button,
  TextField,
  Chip,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  Stack
} from '@material-ui/core';

import { db } from '../../firebase-config';

const UserAttendanceList = () => {
  const [selectedEmployeesIds] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const attendanceRef = collection(db, 'attendance');
  const [statusView, setStatusView] = useState('');
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [isAtdLoading, setIsAtdLoading] = useState(true);
  const currUser = JSON.parse(localStorage.getItem('currUser'));
  const [currPage, setCurrPage] = useState(1);
  const perPage = 10; // items per page

  useEffect(() => {
    const getAttendance = async () => {
      const data = await getDocs(attendanceRef);
      setAttendance(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsAtdLoading(false);
    };
    getAttendance();
  }, []);

  const formatDate = (date) => {
    if (date !== null) {
      const formattedDate = date.toString().split(' ').slice(1, 4);
      const newDate = formattedDate.join('-');
      return (newDate);
    }
    return '';
  };

  const formatTime = (date) => {
    if (date !== null) {
      const formattedTime = date.toString().split(' ').slice(4, 5);
      const hourMinSec = formattedTime.toString().split(':').slice(0, 3);
      const newTime = hourMinSec.join(':');
      return (newTime);
    }
    return '';
  };

  const getStatus = (timeIn) => {
    if (formatTime(timeIn) > '09:00:00') {
      return 2;
    }
    return 1;
  };

  const userAttendanceSize = () => {
    const arr = attendance.filter((data) => {
      if (data.email === currUser.email) {
        return data;
      }
      return null;
    });
    return arr.length;
  };

  return (!isAtdLoading) ? (
    <Card>
      <CardHeader
        title="View your attendance"
        titleTypographyProps={{ variant: 'h1' }}
      />
      <PerfectScrollbar>
        <Box sx={{ p: 3 }}>
          <Button
            value=""
            variant={(statusView === '' || statusView === '0') ? 'contained' : 'outlined'}
            onClick={(event) => { setStatusView(event.target.value); }}
          >
            All
          </Button>
          <Button
            sx={{
              mx: 2
            }}
            value="1"
            variant={statusView === '1' ? 'contained' : 'outlined'}
            onClick={(event) => { setStatusView(event.target.value); }}
          >
            On Time
          </Button>
          <Button
            value="2"
            variant={statusView === '2' ? 'contained' : 'outlined'}
            onClick={(event) => { setStatusView(event.target.value); }}
          >
            Late
          </Button>
          <div>&nbsp;</div>
          <Box className="pickers">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Search by start date"
                className="datepicker"
                format="dd/MM/yyyy"
                value={startDateValue}
                clearable
                maxDate={new Date()}
                onChange={(date) => {
                  setStartDateValue(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div>&nbsp;</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Search by end date"
                className="datepicker"
                format="dd/MM/yyyy"
                value={endDateValue}
                clearable
                maxDate={new Date()}
                onChange={(date) => {
                  setEndDateValue(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Time in
                </TableCell>
                <TableCell>
                  Time out
                </TableCell>
                <TableCell>
                  Hours Worked
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(attendance).slice((currPage - 1) * perPage, currPage * perPage).filter((em) => {
                if (statusView === '' || getStatus(new Date(em.dateTimeIn.seconds * 1000).toString()).toString() === statusView) {
                  return em;
                }
                return null;
              })
                .filter((obj) => {
                  if ((startDateValue === null && endDateValue === null)
                    || (formatDate(startDateValue) <= formatDate(new Date(obj.dateTimeIn.seconds * 1000).toString()) && endDateValue === '')
                    || (formatDate(endDateValue) >= formatDate(new Date(obj.dateTimeIn.seconds * 1000).toString()) && startDateValue === '')
                    || (formatDate(startDateValue) <= formatDate(new Date(obj.dateTimeIn.seconds * 1000).toString()) && formatDate(endDateValue) >= formatDate(new Date(obj.dateTimeIn.seconds * 1000).toString()))) {
                    return obj;
                  }
                  return null;
                })
                .filter((data) => {
                  if (data.email === currUser.email) {
                    return data;
                  }
                  return null;
                })
                .sort(((a, b) => b.dateTimeIn.seconds - a.dateTimeIn.seconds))
                .map((at) => (
                  <TableRow
                    hover
                    key={at.userId}
                    selected={selectedEmployeesIds.indexOf(at.userId) !== ''}
                  >
                    <TableCell>
                      {formatDate(new Date(at.dateTimeIn.seconds * 1000).toString())}
                    </TableCell>
                    <TableCell>
                      {formatTime(new Date(at.dateTimeIn.seconds * 1000).toString())}
                    </TableCell>
                    <TableCell>
                      {(at.dateTimeOut.seconds !== at.dateTimeIn.seconds) ? formatTime(new Date(at.dateTimeOut.seconds * 1000).toString()) : ''}
                    </TableCell>
                    <TableCell>
                      {at.normalHours}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatus(new Date(at.dateTimeIn.seconds * 1000).toString()) === 1 ? 'On Time' : 'Late'}
                        color={getStatus(new Date(at.dateTimeIn.seconds * 1000).toString()) === 1 ? 'success' : 'error'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Stack
        direction="row"
        sx={{
          p: 2
        }}
      >
        <Pagination
          count={Math.ceil(userAttendanceSize() / perPage)}
          shape="rounded"
          page={currPage}
          onChange={(event, page) => {
            setCurrPage(page);
          }}
        />
      </Stack>
    </Card>
  ) : (
    <Card>
      <CardHeader
        title="View your attendance"
        titleTypographyProps={{ variant: 'h1' }}
      />
      <PerfectScrollbar>
        <Box sx={{ p: 3 }}>
          <Button
            value=""
            variant={(statusView === '' || statusView === '0') ? 'contained' : 'outlined'}
            onClick={(event) => { setStatusView(event.target.value); }}
          >
            All
          </Button>
          <Button
            sx={{
              mx: 2
            }}
            value="1"
            variant={statusView === '1' ? 'contained' : 'outlined'}
            onClick={(event) => { setStatusView(event.target.value); }}
          >
            On Time
          </Button>
          <Button
            value="2"
            variant={statusView === '2' ? 'contained' : 'outlined'}
            onClick={(event) => { setStatusView(event.target.value); }}
          >
            Late
          </Button>
          <div>&nbsp;</div>
          <Box className="pickers">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Search by start date"
                className="datepicker"
                format="dd/MM/yyyy"
                value={startDateValue}
                clearable
                maxDate={new Date()}
                onChange={(date) => {
                  setStartDateValue(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <div>&nbsp;</div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Search by end date"
                className="datepicker"
                format="dd/MM/yyyy"
                value={endDateValue}
                clearable
                maxDate={new Date()}
                onChange={(date) => {
                  setEndDateValue(date);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Time in
                </TableCell>
                <TableCell>
                  Time out
                </TableCell>
                <TableCell>
                  Hours Worked
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>
                <h1> </h1>
              </TableCell>
              <TableCell>
                <h1> </h1>
              </TableCell>
              <TableCell>
                <h1> </h1>
              </TableCell>
              <TableCell>
                <h1> </h1>
              </TableCell>
              <TableCell>
                <h1> </h1>
              </TableCell>
              <TableCell>
                <h1> </h1>
              </TableCell>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default UserAttendanceList;
