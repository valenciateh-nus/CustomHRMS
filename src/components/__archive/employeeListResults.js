import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Search as SearchIcon } from 'react-feather';
// import EmployeeForm from 'src/pages/EmployeeForm';
// import Moment from 'moment';w.
import {
  Box,
  Button,
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
} from '@material-ui/core';
import moment from 'moment';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import EmployeePageHeader from './EmployeePageHeader';
import EditEmployeeForm from './EditEmployeeForm';
import EmployeePopup from './EmployeePopup';
import { editEmployee } from './EmployeeService';

const employeeListResults = ({ employees, ...rest }) => {
  console.log('Current number of employees: ', employees.length);
  const [statusView] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedEmployeesIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const editValues = (employee, resetForm) => {
    editEmployee(employee);
    resetForm();
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <div className="EmployeeEdit">
        <EmployeePageHeader
          title="View All Employees"
          subTitle="Showing All Employees"
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
      </div>
      <Box sx={{ mt: 0 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 1050 }}>
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
                placeholder="Search employee name"
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
                  Employee ID
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Contact
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  DOB
                </TableCell>
                <TableCell>
                  Joined On
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.slice(0, limit).filter((val) => {
                if (searchValue === '') {
                  return val;
                }
                if (searchValue !== '') {
                  const searchVal = searchValue.toLowerCase();
                  const fullName = (`${val.lastName} ${val.firstName}`) && (`${val.lastName} ${val.firstName}`).toLowerCase().includes(searchVal);
                  const fullName2 = (`${val.firstName} ${val.lastName}`) && (`${val.firstName} ${val.lastName}`).toLowerCase().includes(searchVal);
                  console.log(fullName);
                  const firstName = val.firstName && val.firstName.toLowerCase().includes(searchVal);
                  const lastName = val.lastName && val.lastName.toLowerCase().includes(searchVal);
                  return fullName || fullName2 || firstName || lastName;
                }
                return null;
              }).filter((em) => {
                if (statusView === '' || em.status.toString() === statusView) {
                  return em;
                }
                return null;
              })
                .map((employee) => (
                  <TableRow
                    hover
                    key={employee.id}
                    selected={selectedEmployeesIds.indexOf(employee.userId) !== -1}
                  >
                    <TableCell>
                      {employee.id}
                    </TableCell>
                    <TableCell>
                      {employee.lastName}
                      {' '}
                      {employee.firstName}
                    </TableCell>
                    <TableCell>
                      {employee.role}
                    </TableCell>
                    <TableCell>
                      {employee.contact}
                    </TableCell>
                    <TableCell>
                      {employee.email}
                    </TableCell>
                    <TableCell>
                      {employee.dob ? moment(employee.dob.toDate()).calendar() : ''}
                    </TableCell>
                    <TableCell>
                      {employee.startDate ? moment(employee.startDate.toDate()).calendar() : ''}
                    </TableCell>
                    <TableCell>
                      <Button color="primary" onClick={() => { openInPopup(employee); }}>
                        Edit Employee
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={employees.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      />
      <EmployeePopup
        title="Edit Employee"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EditEmployeeForm
          recordForEdit={recordForEdit}
          editValues={editValues}
        />
      </EmployeePopup>
    </Card>
  );
};

employeeListResults.propTypes = {
  employees: PropTypes.array.isRequired,
  employeeListResults: PropTypes.array.isRequired,
  employee: PropTypes.array.isRequired,
  title: PropTypes.object.isRequired,
  subTitle: PropTypes.object.isRequired,
  icon: PropTypes.object.isRequired,
};

export default employeeListResults;
