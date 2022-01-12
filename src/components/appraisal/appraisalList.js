import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { db } from '../../firebase-config';
import AppraisalData from './appraisalData';
import AppraisalCycleData from './appraisalCycleData';

const AppraisalList = ({ ...rest }) => {
  const [appraisalCycleView, setAppraisalCycleView] = useState(false);

  const [employees, setEmployees] = useState([]);
  const employeesRef = collection(db, 'users');
  const [appraisal, setAppraisal] = useState([]);
  const appraisalRef = collection(db, 'appraisals');
  const [appraisalForm, setAppraisalForm] = useState([]);
  const appraisalFormRef = collection(db, 'appraisalForm');
  const [isEmpLoading, setIsEmpLoading] = useState(true);
  const [isAprLoading, setIsAprLoading] = useState(true);
  const [isAprFormLoading, setIsAprFormLoading] = useState(true);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await getDocs(employeesRef);
      setEmployees(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log('not loading anymore');
      setIsEmpLoading(false);
    };
    const getAppraisal = async () => {
      const data = await getDocs(appraisalRef);
      setAppraisal(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsAprLoading(false);
    };
    const getAppraisalForm = async () => {
      const data = await getDocs(appraisalFormRef);
      setAppraisalForm(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsAprFormLoading(false);
    };
    getEmployees();
    getAppraisal();
    getAppraisalForm();
  }, []);

  const handleTableChange = () => {
    console.log(appraisalCycleView);
    setAppraisalCycleView(!appraisalCycleView);
  };

  return (!isAprLoading && !isAprFormLoading && !isEmpLoading) ? (
    <>
      <Card>
        <Button
          className="switch-btn"
          color="primary"
          variant="contained"
          onClick={() => (handleTableChange())}
        >
          {appraisalCycleView ? 'View Appraisals' : 'View Appraisal Cycles'}
        </Button>
        {!appraisalCycleView ? <AppraisalData appraisal={appraisal} appraisalForm={appraisalForm} employees={employees} /> : <AppraisalCycleData appraisalForm={appraisalForm} />}
      </Card>
    </>
  ) : (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Appraisal Cycles
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h1>Loading...</h1>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

AppraisalList.propTypes = {
  appraisal: PropTypes.array.isRequired,
  employees: PropTypes.array.isRequired,
  appraisalForm: PropTypes.array.isRequired,
};

export default AppraisalList;
