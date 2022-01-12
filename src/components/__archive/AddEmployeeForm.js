import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@mui/material';
import { addEmployee } from './EmployeeService';

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
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
  role: 'employee',
  dob: new Date(),
  identificationNumber: '',
  startDate: new Date(),
  salary: '',
  bank: '',
  bankAccNum: '',
  dietaryRestrictions: '',
  ethnicity: '',
  endDate: 'N.A',
  active: 'active'
};

function AddEmployeeForm() {
  const classes = useStyle();
  const [values, setValues] = useState(initialFieldValues);

  /* const errorFirstName = values.firstName ? '' : 'First Name cannot be blank!';
  const errorLastName = values.lastName ? '' : 'Last Name cannot be blank!';
  const errorUsername = values.username ? '' : 'Username cannot be blank!';
  const errorEmail = values.email ? '' : 'Email cannot be blank!';
  const errorContact = values.contact ? '' : 'Contact cannot be blank!';
  const errorAddress = values.address ? '' : 'Address cannot be blank!';
  const errorIC = values.identificationNumber ? '' : 'Identification Number cannot be blank!';
  const errorSalary = values.salary ? '' : 'Salary cannot be blank!';
  const errorBank = values.bank ? '' : 'Bank cannot be blank!';
  const errorBankAcc = values.bankAccNum ? '' : 'Bank Account Number cannot be blank!';
  const errorDietaryRestrictions = values.dietaryRestrictions ? '' : 'Dietary Restrictions cannot be blank!';
  const errorEthnicity = values.ethnicity ? '' : 'Ethnicity cannot be blank!';
  const errorDOB = values.dob ? '' : 'DOB cannot be blank!';
  const errorJoined = values.startDate ? '' : 'Joined Date cannot be blank!';
  */

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
      role: 'employee',
      dob: new Date(),
      identificationNumber: '',
      startDate: new Date(),
      salary: '',
      bank: '',
      bankAccNum: '',
      dietaryRestrictions: '',
      ethnicity: '',
      endDate: 'N.A',
      active: 'active'
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // editValues(values, resetForm);
    addEmployee(values);
    resetForm();
    window.location.reload(true);
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
          <TextField
            variant="outlined"
            label="Role"
            name="role"
            value={values.role}
            onChange={handleInputChange}
            required
          />
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
            label="Start Date (mm/DD/yyyy)"
            name="startDate"
            value={values.startDate}
            onChange={handleInputChange}
            required
          // error={errorJoined}
          />
          <TextField
            variant="outlined"
            label="Salary"
            name="salary"
            value={values.salary}
            onChange={handleInputChange}
            required
          // error={errorSalary}
          />
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
          <TextField
            variant="outlined"
            label="Ethnicity"
            name="ethnicity"
            value={values.ethnicity}
            onChange={handleInputChange}
            required
          // error={errorEthnicity}
          />
          <TextField
            variant="outlined"
            label="End Date"
            name="endDate"
            value={values.endDate}
            onChange={handleInputChange}
            required
          />
          <TextField
            variant="outlined"
            label="Status"
            name="status"
            value={values.active}
            onChange={handleInputChange}
            required
          // error={errorEthnicity}
          />
        </Grid>
      </Grid>
      <input type="Submit" value="Submit" />
    </form>
  );
}

export default AddEmployeeForm;
