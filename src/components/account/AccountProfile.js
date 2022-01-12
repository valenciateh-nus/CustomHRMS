import moment from 'moment';
import {
  Avatar,
  Box,
  Typography
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import {
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../../firebase-config';

const AccountProfile = () => {
  const [currEmp, setCurrEmp] = useState('');
  const user = JSON.parse(localStorage.getItem('currUser'));
  console.log('Current user ', user);

  const currEmployee = async () => {
    await getDoc(doc(db, 'users', user.email)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setCurrEmp(docSnap.data());
        console.log('Current employee is ', currEmp);
      } else {
        console.log('No such document!');
      }
    });
  };

  useEffect(() => {
    currEmployee();
  }, []);

  console.log('Testing', currEmp.firstName);

  const profile = {
    avatar: currEmp.avatar,
    firstName: currEmp.firstName,
    lastName: currEmp.lastName,
    identificationNo: currEmp.identificationNo,
    email: currEmp.email,
    contact: currEmp.contact,
    address: currEmp.address,
    role: currEmp.role,
    status: currEmp.status,
    dob: currEmp.dob,
    joined: currEmp.startDate,
    bankAcc: currEmp.bankAccNo,
    bank: currEmp.bank,
  };

  const empDOB = profile.dob ? moment(profile.dob.toDate()).format('DD/MM/YYYY') : '';
  const empStart = profile.joined ? moment(profile.joined.toDate()).format('DD/MM/YYYY') : '';
  console.log(currEmp.firstName);

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Avatar
        src={profile.avatar}
        sx={{
          height: 100,
          width: 100
        }}
      />
      <Typography
        color="textPrimary"
        variant="h3"
      >
        {`${profile.firstName} ${profile.lastName}`}
      </Typography>
      <Typography
        color="textPrimary"
        gutterBottom
        variant="h5"
      >
        {profile.role}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body1"
      >
        {profile.identificationNo}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body1"
      >
        {profile.email}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body1"
      >
        {profile.address}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body1"
      >
        Date of Birth:&nbsp;
        {empDOB}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body1"
      >
        Joined On:&nbsp;
        {empStart}
      </Typography>
    </Box>
  );
};

export default AccountProfile;
