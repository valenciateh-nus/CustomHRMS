import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { Button, Typography } from '@material-ui/core';
import Icon from '@mui/icons-material/Login';

import { db } from '../../firebase-config';

const UserAttendanceButton = () => {
  const [attendance, setAttendance] = useState([]);
  const attendanceRef = collection(db, 'attendance');
  const currUser = JSON.parse(localStorage.getItem('currUser'));
  console.log('currUser', currUser);

  // const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const getAttendance = async () => {
      const data = await getDocs(attendanceRef);
      setAttendance(data.docs.map((val) => ({ ...val.data(), id: val.id })));
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

  const createAttendance = async (today) => {
    await addDoc(attendanceRef, {
      email: currUser.email,
      dateTimeIn: today,
      dateTimeOut: today,
      normalHours: 0,
      overtimeHours: 0
    });
    window.location.reload();
  };

  const updateAttendance = async () => {
    let arr = [];
    const today = new Date();
    arr = Array.from(attendance).filter((obj) => {
      if (obj.email === currUser.email) {
        if (formatDate(new Date(obj.dateTimeIn.seconds * 1000)) === formatDate(today)) {
          if (obj.dateTimeIn.seconds === obj.dateTimeOut.seconds) {
            return obj;
          }
        }
      }
      return null;
    });

    const selectedAttendanceId = arr[0].id;
    const workingHours = Math.abs(today - new Date(arr[0].dateTimeIn.seconds * 1000)) / 36e5;
    const attendanceDoc = doc(db, 'attendance', selectedAttendanceId);
    const newFields = { dateTimeOut: today, normalHours: Number((workingHours).toFixed(3)) };
    console.log(newFields);
    await updateDoc(attendanceDoc, newFields);
    window.location.reload();
  };

  const getCheckinTime = () => {
    let arr = [];
    const today = new Date();
    arr = Array.from(attendance).filter((obj) => {
      if (obj.email === currUser.email) {
        if (formatDate(new Date(obj.dateTimeIn.seconds * 1000)) === formatDate(today)) {
          if (obj.dateTimeIn.seconds === obj.dateTimeOut.seconds) {
            return obj;
          }
        }
      }
      return null;
    });

    if (arr.length !== 0) {
      return new Date(arr[0].dateTimeIn.seconds * 1000).toString()
        .split(' ')
        .slice(1, 5)
        .join('-');
    }
    return '';
  };

  console.log('time', getCheckinTime());

  const handleCheckIn = () => {
    const today = new Date();
    if (getCheckinTime() === '') {
      createAttendance(today);
    } else {
      updateAttendance();
    }
  };

  return (
    <>
      <Button
        sx={{
          width: '100%',
          p: 3.5,
          size: 10,
        }}
        onClick={handleCheckIn}
        variant="contained"
        color={(getCheckinTime() !== '') ? 'warning' : 'success'}
        size="large"
        className="attendanceButton"
      >
        {Icon && <Icon type={Icon} />}
        &nbsp;
        <Typography variant="h3">{(getCheckinTime() !== '') ? 'CHECK OUT' : 'CHECK IN'}</Typography>
      </Button>
      &nbsp;
      {/* <Box>
        <div> &nbsp; </div>
        {(getCheckinTime() !== '') ? `You have checked in at ${getCheckinTime()}` : 'You have not checked in'}
        <div> &nbsp; </div>
      </Box> */}
    </>
  );
};

export default UserAttendanceButton;
