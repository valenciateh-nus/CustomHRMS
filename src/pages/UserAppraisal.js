import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Helmet } from 'react-helmet';
import { Box, Container, Button } from '@material-ui/core';
import UserAppraisalForm from 'src/components/userAppraisal/userAppraisalForm';
import UserAppraisalList from '../components/userAppraisal/userAppraisalList';
import { db } from '../firebase-config';

const UserAppraisal = () => {
  const [viewForm, setViewForm] = useState(false);
  const [appraisalForm, setAppraisalForm] = useState([]);
  const appraisalFormRef = collection(db, 'appraisalForm');
  const [employees, setEmployees] = useState([]);
  const employeesRef = collection(db, 'users');
  const currUser = JSON.parse(localStorage.getItem('currUser'));

  useEffect(() => {
    const getAppraisalForm = async () => {
      const data = await getDocs(appraisalFormRef);
      setAppraisalForm(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getEmployees = async () => {
      const data = await getDocs(employeesRef);
      setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getAppraisalForm();
    getEmployees();
  }, []);

  const formatDate = (date) => {
    if (date !== null) {
      const formattedDate = date.toString().split(' ').slice(1, 4);
      const newDate = formattedDate.join('-');
      return (newDate);
    }
    return '';
  };

  function findEmployee(uId) {
    const em = Array.from(employees).filter((obj) => {
      if (obj.id === uId) {
        return obj;
      }
      return null;
    });
    return em[0];
  }

  const findCycle = () => {
    let cycle = [];
    const today = new Date().toString();
    cycle = Array.from(appraisalForm).filter((obj) => {
      const sDate = new Date(obj.startDate.seconds * 1000).toString();
      const eDate = new Date(obj.endDate.seconds * 1000).toString();
      if (formatDate(sDate) <= formatDate(today) && formatDate(eDate) >= formatDate(today)) {
        return obj;
      }
      return null;
    });

    if (cycle.length !== 0) {
      console.log('self', cycle[0].selfEval);
      console.log('role', findEmployee(currUser.email).role);
      if (!cycle[0].selfEval && findEmployee(currUser.email).role === 'Employee') {
        return false;
      }
      return true;
    }
    return false;
  };

  return (
    <Box>
      <Helmet>
        <title>HRMS | Appraisal Portal</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            {findCycle() ? (
              <Button
                value=""
                variant="contained"
                color="secondary"
                onClick={() => setViewForm(!viewForm)}
              >
                {viewForm ? 'View My Appraisals' : 'Submit New Appraisal'}
              </Button>
            ) : <div />}
            <div>&nbsp;</div>
            {viewForm ? <UserAppraisalForm role={findEmployee(currUser.email).role} /> : <UserAppraisalList />}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default UserAppraisal;
