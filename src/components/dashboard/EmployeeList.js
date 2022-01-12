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

const EmployeeList = () => {
  const [employees, setEmployeesPage] = useState([]);
  const employeesPageRef = (collection(db, 'users'));

  const getEmployees = async () => {
    const data = await getDocs(employeesPageRef);
    setEmployeesPage(data.docs.map((d) => ({ ...d.data(), id: d.id })).sort((a, b) => b.startDate - a.startDate));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const [currPage, setCurrPage] = useState(1);
  const perPage = 8; // items per page

  return (
    <Card {...employees}>
      <CardHeader title="All Employees" />
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
                  Contact
                </TableCell>
                <TableCell>
                  Joined On
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.slice((currPage - 1) * perPage, currPage * perPage).map((employee) => (
                <TableRow
                  hover
                  key={employee.id}
                >
                  <TableCell>
                    {employee.id}
                  </TableCell>
                  <TableCell>
                    {employee.firstName}
                  </TableCell>
                  <TableCell>
                    {employee.contact}
                  </TableCell>
                  <TableCell>
                    {moment(employee.startDate.toDate()).calendar()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={employee.status === 'Active' ? 'primary' : 'error'}
                      label={employee.status}
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
          <Link to="/app/employees">
            <Button>View All</Button>
          </Link>
          <Pagination
            count={Math.ceil(employees.length / perPage)}
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

export default EmployeeList;
