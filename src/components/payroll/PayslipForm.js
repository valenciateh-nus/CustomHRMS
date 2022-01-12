import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField
} from '@material-ui/core';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { MenuItem } from '@mui/material';
import { add, format, sub } from 'date-fns';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  Timestamp
} from 'firebase/firestore';
import { Formik } from 'formik';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { db } from '../../firebase-config';

const PayslipForm = ({
  payslip,
  setPayslip,
  dialogType,
  open,
  handleClose
}) => {
  const [employees, setEmployees] = useState([]);
  const employeesRef = (collection(db, 'users'));

  const getEmployees = async () => {
    const querySnapshot = await getDocs(employeesRef);
    setEmployees(querySnapshot.docs.map((d) => ({ ...d.data() })));
  };

  useEffect(() => {
    getEmployees();
    console.log(employees);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {dialogType === 'create' && <div>Create Payslip</div>}
        {dialogType === 'edit' && <div>Edit Payslip</div>}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center'
          }}
        >
          <Container maxWidth="sm">
            <Formik
              initialValues={{
                id: payslip.id,
                email: payslip.email ? payslip.email : '',
                basic: payslip.basic,
                overtime: payslip.overtime,
                cpfEmployee: payslip.cpfEmployee,
                cpfEmployer: payslip.cpfEmployer,
                startDate: payslip.startDate === undefined
                  ? new Date() : payslip.startDate.toDate(),
                endDate: payslip.endDate === undefined
                  ? sub(add((new Date()), { months: 1 }), { days: 1 })
                  : payslip.endDate.toDate(),
                paymentMode: payslip.paymentMode,
                remarks: payslip.remarks === undefined
                  ? '' : payslip.remarks,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Enter Employee Email'),
                basic: Yup.number().positive().required('Enter Basic Pay'),
                overtime: Yup.number().moreThan(-1).required('Enter Overtime Pay'),
                cpfEmployee: Yup.number().positive().required('Enter CPF (Employee)'),
                cpfEmployer: Yup.number().positive().required('Enter CPF (Employer)'),
                startDate: Yup.date().required('Enter Start Date "dd-mm-yyyy"'),
                endDate: Yup.date().min(Yup.ref('startDate'), 'End Date must be same or after Start Date').required('Enter End Date "dd-mm-yyyy"'),
                paymentMode: Yup.string().required('Enter Payment Mode'),
                remarks: Yup.string(),
              })}
              onSubmit={(values, actions) => {
                const newId = `${values.email}_${format(values.endDate, 'dd-MM-yyyy')}`;

                const temp = {
                  id: newId,
                  email: values.email,
                  basic: values.basic,
                  overtime: values.overtime,
                  cpfEmployee: values.cpfEmployee,
                  cpfEmployer: values.cpfEmployer,
                  startDate: Timestamp.fromDate(values.startDate),
                  endDate: Timestamp.fromDate(values.endDate),
                  paymentMode: values.paymentMode,
                  remarks: values.remarks
                };

                setPayslip(temp);

                if (dialogType === 'edit') {
                  deleteDoc(doc(db, 'payroll', values.id));
                }

                setDoc(doc(db, 'payroll', newId), temp)
                  .then(() => {
                    console.log('doc set');
                    handleClose();
                  })
                  .catch((error) => {
                    console.log(error.message);
                    actions.setErrors({ submit: error.message });
                    actions.setSubmitting(false);
                  });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={1} marginTop={1}>
                    {errors.startDate ? (<Alert severity="warning">Enter Start Date &quot;dd-mm-yyyy&quot;</Alert>) : null}
                    {errors.endDate ? (<Alert severity="warning">{errors.endDate}</Alert>) : null}
                  </Stack>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    select
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Employee Email"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.email}
                    variant="outlined"
                    InputProps={{
                      readOnly: dialogType === 'edit'
                    }}
                  >
                    {employees.map((option) => (
                      <MenuItem key={option.email} value={option.email}>
                        {option.email}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    error={Boolean(touched.basic && errors.basic)}
                    fullWidth
                    helperText={touched.basic && errors.basic}
                    label="Basic Pay"
                    margin="normal"
                    name="basic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.basic}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                  <TextField
                    error={Boolean(touched.overtime && errors.overtime)}
                    fullWidth
                    helperText={touched.overtime && errors.overtime}
                    label="Overtime Pay"
                    margin="normal"
                    name="overtime"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.overtime}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                  <TextField
                    error={Boolean(touched.cpfEmployee && errors.cpfEmployee)}
                    fullWidth
                    helperText={touched.cpfEmployee && errors.cpfEmployee}
                    label="Employee CPF"
                    margin="normal"
                    name="cpfEmployee"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.cpfEmployee}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                  <TextField
                    error={Boolean(touched.cpfEmployer && errors.cpfEmployer)}
                    fullWidth
                    helperText={touched.cpfEmployer && errors.cpfEmployer}
                    label="Employer CPF"
                    margin="normal"
                    name="cpfEmployer"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.cpfEmployer}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                  <DesktopDatePicker
                    renderInput={(params) => (
                      <TextField
                        error={Boolean(touched.startDate && errors.startDate)}
                        {...params}
                      />
                    )}
                    label="Start Date"
                    name="startDate"
                    value={values.startDate}
                    onBlur={handleBlur}
                    onChange={(newStart) => {
                      setFieldValue('startDate', newStart);
                    }}
                  />
                  <DesktopDatePicker
                    renderInput={(params) => (
                      <TextField
                        error={Boolean(touched.endDate && errors.endDate)}
                        {...params}
                      />
                    )}
                    label="End Date"
                    name="endDate"
                    value={values.endDate}
                    onBlur={handleBlur}
                    onChange={(newEnd) => {
                      setFieldValue('endDate', newEnd);
                    }}
                  />
                  <TextField
                    error={Boolean(touched.paymentMode && errors.paymentMode)}
                    fullWidth
                    helperText={touched.paymentMode && errors.paymentMode}
                    label="Payment Mode"
                    margin="normal"
                    name="paymentMode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.paymentMode}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.remarks && errors.remarks)}
                    fullWidth
                    helperText={touched.remarks && errors.remarks}
                    label="Remarks"
                    margin="normal"
                    name="remarks"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="string"
                    value={values.remarks}
                    variant="outlined"
                  />
                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Container>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

PayslipForm.propTypes = {
  payslip: PropTypes.object,
  setPayslip: PropTypes.func,
  dialogType: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};

export default PayslipForm;
