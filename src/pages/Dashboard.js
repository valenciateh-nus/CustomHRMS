import { Box, Container, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import EmployeeList from '../components/dashboard/EmployeeList';
import LateAttendances from '../components/dashboard/LateAttendances';
import PendingLeave from '../components/dashboard/PendingLeave';
import TotalEmployees from '../components/dashboard/TotalEmployees';
import UnapprovedLeaves from '../components/dashboard/UnapprovedLeaves';
import QRCard from '../components/qr/QRCard';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <LateAttendances />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalEmployees />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <UnapprovedLeaves sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <QRCard />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={12}
            xs={12}
          >
            <PendingLeave sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={12}
            xs={12}
          >
            <EmployeeList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
