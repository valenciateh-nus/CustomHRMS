import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  Stack,
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';
import { db } from 'src/firebase-config';

const PendingLeave = () => {
  const [leave, setLeave] = useState([]);
  const leaveRef = (collection(db, 'leave'));
  const [employees, setEmployeesPage] = useState([]);
  const employeesPageRef = (collection(db, 'users'));

  const getLeave = async () => {
    const data = await getDocs(leaveRef);
    setLeave(data.docs.map((d) => ({ ...d.data(), id: d.id })));
  };
  useEffect(() => {
    const getEmployees = async () => {
      const data = await getDocs(employeesPageRef);
      setEmployeesPage(data.docs.map((d) => ({ ...d.data(), id: d.id })));
    };
    getEmployees();
    getLeave();
  }, []);

  function findEmployee(uId) {
    const em = Array.from(employees).filter((obj) => {
      console.log(obj.id);
      console.log(uId);
      if (obj.id.toString() === uId.toString()) {
        console.log('ok');
        return obj;
      }
      console.log('no');
      return null;
    });
    return em[0];
  }

  const [currPage, setCurrPage] = useState(1);
  const perPage = 8; // items per page

  return (
    <Card {...employees}>
      <CardHeader title="All Pending Leave Application" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Employee ID
                </TableCell>
                <TableCell>
                  Employee Name
                </TableCell>
                <TableCell>
                  Leave Start Date
                </TableCell>
                <TableCell>
                  Leave End Date
                </TableCell>
                <TableCell>
                  Leave Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leave.slice((currPage - 1) * perPage, currPage * perPage).filter((val) => {
                if (!val.approved && val.editedBy === null) {
                  return val;
                }
                return null;
              }).map((obj) => (
                <TableRow
                  hover
                  key={obj.id}
                >
                  <TableCell>
                    {findEmployee(obj.employee).id}
                  </TableCell>
                  <TableCell>
                    {findEmployee(obj.employee).firstName}
                  </TableCell>
                  <TableCell>
                    {moment(obj.startDate.toDate()).calendar()}
                  </TableCell>
                  <TableCell>
                    {moment(obj.endDate.toDate()).calendar()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="warning"
                      label={obj.type}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          p: 2
        }}
      >
        <Stack direction="row">
          <Link to="/app/leave">
            <Button>View All</Button>
          </Link>
          <Pagination
            count={Math.ceil(leave.length / perPage)}
            shape="rounded"
            page={currPage}
            onChange={(event, page) => {
              setCurrPage(page);
            }}
          />
        </Stack>
      </Box>
    </Card>
  );
};

export default PendingLeave;
