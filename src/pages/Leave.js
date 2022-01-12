import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import LeaveApplicationsResults from '../components/leave/LeaveApplicationsResults';

const Leave = ({ leaveApplications }) => {
  console.log(leaveApplications);
  return (
    <>
      <Helmet>
        <title>HRMS | Leave Management</title>
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
            <LeaveApplicationsResults leaveApplications={leaveApplications} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Leave.propTypes = {
  leaveApplications: PropTypes.array.isRequired
};

console.log('Current leave applications', Leave.length);
export default Leave;
