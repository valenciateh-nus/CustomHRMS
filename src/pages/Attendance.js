import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AttendanceListResults from '../components/attendance/attendanceListResults';

const Attendance = () => (
  <>
    <Helmet>
      <title>HRMS | Attendance Portal</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <AttendanceListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default Attendance;
