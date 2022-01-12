import {
  collection, getDocs,
  // orderBy,
  query, where
} from '@firebase/firestore';
import {
  Alert,
  Box,
  Button,
  Card,
  // CardActions,
  CardContent,
  Container,
  Pagination,
  Grid,
  Typography
} from '@material-ui/core';
import {
  Add as AddIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import LeaveForm from '../components/leave/LeaveForm';
import { db } from '../firebase-config';

const UserLeave = () => {
  const employee = JSON.parse(localStorage.getItem('currEmployee'));

  const [currPage, setCurrPage] = useState(1);
  const perPage = 6; // items per page

  const [leave, setLeave] = useState([]);
  const leaveRef = collection(db, 'leave');

  const getLeave = async () => {
    const q = query(leaveRef, where('employee', '==', employee.email));
    const querySnapshot = await getDocs(q);
    setLeave(querySnapshot.docs.map((d) => ({ ...d.data(), id: d.id })).sort((a, b) => b.startDate - a.startDate));
  };

  useEffect(() => {
    getLeave();
    console.log(employee);
  }, []);

  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState('user-create');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getLeave();
    setOpen(false);
  };

  const formatTimestamp = (timestamp) => {
    const dateformat = 'dd MMMM yyyy';
    return format(timestamp.toDate(), dateformat);
  };

  const CreateButton = () => (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => {
        setDialogType('user-create');
        handleClickOpen();
      }}
    >
      New Leave Request
    </Button>
  );

  return (
    <>
      <Helmet>
        <title>Employee Leave</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.dark',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container>
          <Card sx={{ marginBottom: 1 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item key={0}>
                  <CreateButton />
                </Grid>
                <Grid item key={1}>
                  <Pagination
                    count={Math.ceil(leave.length / perPage)}
                    shape="rounded"
                    page={currPage}
                    onChange={(event, page) => {
                      setCurrPage(page);
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {leave.length === 0
            && (
              <Card>
                <CardContent>
                  <Typography>
                    No Leave Found
                  </Typography>
                </CardContent>
              </Card>
            )}
          {leave
            && leave.slice((currPage - 1) * perPage, currPage * perPage).map((leaveRequest) => (
              <>
                <Card key={leaveRequest.id} sx={{ marginTop: 1 }}>
                  {leaveRequest.approved
                    && (
                      <Alert icon={<CheckCircleIcon fontSize="inherit" />} severity="success">
                        {`Approved by ${leaveRequest.editedBy}`}
                      </Alert>
                    )}
                  {(!leaveRequest.approved && leaveRequest.editedBy !== null)
                    && (
                      <Alert icon={<BlockIcon fontSize="inherit" />} severity="error">
                        {`Rejected by ${leaveRequest.editedBy}`}
                      </Alert>
                    )}
                  {(!leaveRequest.approved && leaveRequest.editedBy === null)
                    && (
                      <Alert icon={<HourglassEmpty fontSize="inherit" />} severity="warning">
                        Pending Action
                      </Alert>
                    )}
                  <CardContent>
                    <Typography>{`Start Date: ${formatTimestamp(leaveRequest.startDate)}`}</Typography>
                    <Typography>{`End Date: ${formatTimestamp(leaveRequest.endDate)}`}</Typography>
                    <Typography>{`Leave Type: ${leaveRequest.type}`}</Typography>
                    <Typography>{`Remarks: ${leaveRequest.remarks === '' ? '-NIL-' : leaveRequest.remarks}`}</Typography>
                  </CardContent>
                </Card>
              </>
            ))}
          <LeaveForm user={employee} leaveRequest={[]} dialogType={dialogType} open={open} handleClose={handleClose} />
        </Container>
      </Box>
    </>
  );
};

export default UserLeave;
