import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import UserAttendanceButton from 'src/components/userAttendance/userAttendanceButton';
import UserAttendanceList from '../components/userAttendance/userAttendanceList';

const UserAttendance = () => {
  const currUser = JSON.parse(localStorage.getItem('currUser'));
  console.log(currUser);

  return (
    <Box>
      <Helmet>
        <title>HRMS | Attendance Portal</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <div>&nbsp;</div>
            <UserAttendanceButton />
            <UserAttendanceList />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UserAttendance;
