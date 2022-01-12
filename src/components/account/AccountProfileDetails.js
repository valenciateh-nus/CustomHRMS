// import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Grid,
  TextField
} from '@material-ui/core';
import {
  updateDoc,
  getDoc,
  getDocs,
  doc,
} from 'firebase/firestore';
import { collection } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import DatePicker from '@mui/lab/DatePicker';
import { db } from '../../firebase-config';

const AccountProfileDetails = () => {
  const user = JSON.parse(localStorage.getItem('currUser'));
  console.log(user);
  const [currEmp, setCurrEmp] = useState([]);
  const [value, setValues] = useState([]);
  const [banks, setBanks] = useState([]);
  const banksRef = (collection(db, 'banks'));

  /* function loadValues() {
    setValues(currEmp);
  } */

  function loadValues() {
    setValues(currEmp);
  }

  const currEmployee = async () => {
    await getDoc(doc(db, 'users', user.email)).then((docSnap) => {
      if (docSnap.exists()) {
        setCurrEmp(docSnap.data());
        console.log('Current employee is ', currEmp);
      } else {
        console.log('No such document!');
      }
    });

    const bankData = await getDocs(banksRef);
    setBanks(bankData.docs.map((d) => ({ ...d.data(), id: d.id })));

    loadValues();
  };

  console.log(banks);

  useEffect(() => {
    currEmployee();
  }, []);

  const handleChange = (event) => {
    setValues({
      ...value,
      [event.target.name]: event.target.value
    });
  };

  const handleDateChange = (date) => {
    setValues({
      ...value,
      dob: date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeRef = doc(db, 'users', user.email);
    await updateDoc(employeeRef, { ...value });
    window.location.reload();
    loadValues();
  };

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        handleSubmit
        {...value}
      >
        <Card>
          <CardHeader
            subheader="Edit your profile details here."
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Avatar"
                  name="avatar"
                  helperText="Please insert a link to your image."
                  onChange={handleChange}
                  value={value.avatar}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={value.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={value.lastName}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <DatePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  format="dd/MM/yyyy"
                  value={value.dob}
                  onChange={handleDateChange}
                  required
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="contact"
                  onChange={handleChange}
                  type="string"
                  value={value.contact}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  type="string"
                  value={value.address}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="IC Number"
                  name="identificationNo"
                  onChange={handleChange}
                  required
                  value={value.identificationNo}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Select Bank"
                  name="bank"
                  onChange={handleChange}
                  select
                  required
                  value={value.bank}
                  variant="outlined"
                >
                  {banks.map((option) => (
                    <MenuItem
                      key={option.id}
                      value={option.bankName}
                    >
                      {option.bankName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Bank Account Number"
                  name="bankAccNo"
                  onChange={handleChange}
                  required
                  value={value.bankAccNo}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
              value="submit"
              onClick={handleSubmit}
            >
              Save details
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};

export default AccountProfileDetails;
