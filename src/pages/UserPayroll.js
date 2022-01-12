import {
  collection, getDocs,
  // orderBy,
  query, where
} from '@firebase/firestore';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Pagination,
  Stack,
  Typography
} from '@material-ui/core';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PayslipDocument from '../components/payroll/PayslipDocument';
import UserPayslipDetails from '../components/payroll/UserPayslipDetails';
import { db } from '../firebase-config';

const UserPayroll = () => {
  const employee = JSON.parse(localStorage.getItem('currEmployee'));

  const [currPage, setCurrPage] = useState(1);
  const perPage = 6; // items per page

  const [payroll, setPayroll] = useState([]);
  const payrollRef = collection(db, 'payroll');

  const getPayroll = async () => {
    const q = query(payrollRef, where('email', '==', employee.email));
    const querySnapshot = await getDocs(q);
    setPayroll(querySnapshot.docs.map((d) => ({ ...d.data(), id: d.id })).sort((a, b) => b.endDate - a.endDate));
  };

  useEffect(() => {
    getPayroll();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getPayroll();
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Employee Payroll</title>
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
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(payroll.length / perPage)}
                  shape="rounded"
                  page={currPage}
                  onChange={(event, page) => {
                    setCurrPage(page);
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
          {payroll.length === 0
            && (
              <Card>
                <CardContent>
                  <Typography>
                    No Payroll Found
                  </Typography>
                </CardContent>
              </Card>
            )}
          {payroll
            && payroll.slice((currPage - 1) * perPage, currPage * perPage).map((payslip) => (
              <>
                <Card key={payslip.id} sx={{ marginTop: 1 }}>
                  <CardContent>
                    <Typography>
                      Payslip ID:&nbsp;
                      {payslip.id}
                    </Typography>
                    <Typography>
                      Pay: $
                      {payslip.basic + payslip.overtime + payslip.cpfEmployee + payslip.cpfEmployer}
                    </Typography>
                    <Typography>
                      Payment Date:&nbsp;
                      {format(payslip.endDate.toDate(), 'dd MMMM yyyy')}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleClickOpen();
                      }}
                    >
                      View
                    </Button>
                    <Button variant="outlined">
                      <PDFDownloadLink
                        document={<PayslipDocument employee={employee} payslip={payslip} />}
                        fileName={`${employee.firstName} ${employee.lastName}_payslip_${format((payslip.endDate.toDate()), 'dd-MM-yyyy')}`}
                      >
                        {({ loading }) => (loading ? 'Loading document...' : 'Download')}
                      </PDFDownloadLink>
                    </Button>
                  </CardActions>
                </Card>
                <UserPayslipDetails payslip={payslip} open={open} handleClose={handleClose} />
              </>
            ))}
        </Container>
      </Box>
    </>
  );
};

export default UserPayroll;
