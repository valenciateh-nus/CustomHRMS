import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TextField, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Select from '@material-ui/core/Select';
import { addEmployee } from '../components/employees/EmployeeService';

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
      padding: theme.spacing(1)
    }
  }
}));

const initialFieldValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  contact: '',
  address: '',
  role: 'Employee',
  dob: new Date(),
  identificationNumber: '',
  startDate: new Date(),
  salary: '',
  bank: '',
  bankAccNum: '',
  dietaryRestrictions: '',
  ethnicity: 'Chinese',
  endDate: 'N.A',
  active: 'Active'
};

function EmployeeForm() {
  const classes = useStyle();
  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues(
      {
        ...values,
        [name]: value
      }
    );
  };

  function resetForm() {
    setValues({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      contact: '',
      address: '',
      role: '',
      dob: new Date(),
      identificationNumber: '',
      startDate: new Date(),
      salary: '',
      bank: '',
      bankAccNum: '',
      dietaryRestrictions: '',
      ethnicity: '',
      endDate: 'N.A',
      active: ''
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // editValues(values, resetForm);
    addEmployee(values);
    resetForm();
    // console.log('New user created', docRef.id);
    // employeeService.insertEmployee(values);
    // resetForm();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid container spacing={12} direction="row">
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            required
          // error={errorFirstName}
          />
          <TextField
            variant="outlined"
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            required
          // error={errorLastName}
          />
          <TextField
            variant="outlined"
            label="Username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            required
          // error={errorUsername}
          />
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            required
          // error={errorEmail}
          />
          <TextField
            variant="outlined"
            label="Contact"
            name="contact"
            value={values.contact}
            onChange={handleInputChange}
            required
          // error={errorContact}
          />
          <TextField
            variant="outlined"
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
            required
          // error={errorAddress}
          />
          <FormControl fullWidth>
            <InputLabel>Employee Type</InputLabel>
            <Select
              label="Role"
              name="role"
              value={values.role}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Employee">Employee</MenuItem>
              <MenuItem value="Part-Time Worker">Part-Time Worker</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            label="Date of Birth (mm/DD/yyyy)"
            name="dob"
            value={values.dob}
            onChange={handleInputChange}
            required
          // error={errorDOB}
          />
          <TextField
            variant="outlined"
            label="IC No."
            name="identificationNumber"
            value={values.identificationNumber}
            onChange={handleInputChange}
            required
          // error={errorIC}
          />
          <TextField
            variant="outlined"
            label="Start Date"
            name="startDate"
            value={values.startDate}
            onChange={(newValue) => {
              setValues(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            required
          // error={errorJoined}
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Salary</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={values.salary}
              onChange={handleInputChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Salary"
              name="salary"
              required
            />
          </FormControl>
          <TextField
            variant="outlined"
            label="Bank"
            name="bank"
            value={values.bank}
            onChange={handleInputChange}
            required
          // error={errorBank}
          />
          <TextField
            variant="outlined"
            label="Bank Account No."
            name="bankAccNum"
            value={values.bankAccNum}
            onChange={handleInputChange}
            required
          // error={errorBankAcc}
          />
          <TextField
            variant="outlined"
            label="Dietary Restrictions"
            name="dietaryRestrictions"
            value={values.dietaryRestrictions}
            onChange={handleInputChange}
            required
          // error={errorDietaryRestrictions}
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel>Ethnicity</InputLabel>
            <Select
              variant="outlined"
              label="Ethnicity"
              name="ethnicity"
              value={values.ethnicity}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Chinese">Chinese</MenuItem>
              <MenuItem value="Malay">Malay</MenuItem>
              <MenuItem value="Indian">Indian</MenuItem>
              <MenuItem value="Eurasian">Eurasian</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            label="End Date (dd/mm/yyyy)"
            name="endDate"
            value={values.endDate}
            onChange={handleInputChange}
            required
          />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel>Employee Status</InputLabel>
            <Select
              variant="outlined"
              label="Status"
              name="active"
              value={values.active}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Resigned">Resigned</MenuItem>
              <MenuItem value="Retrenched">Retrenched</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <input type="Submit" value="Submit" />
    </form>
  );
}

export default EmployeeForm;
