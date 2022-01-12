import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { doc, deleteDoc } from 'firebase/firestore';
import { PropTypes } from 'prop-types';
import { db } from '../../firebase-config';

const EmployeeDelete = ({ employee, open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>
      <div>Delete Employee</div>
    </DialogTitle>
    <DialogContent>
      Confirm Deletion of Employee ID:&nbsp;
      <b>{employee.id}</b>
    </DialogContent>
    <DialogActions>
      <Button
        color="error"
        fullWidth
        variant="contained"
        onClick={() => {
          deleteDoc(doc(db, 'users', employee.id))
            .then(() => {
              console.log('Employee deleted');
              handleClose();
            })
            .catch((error) => {
              console.log(error.message);
            });
        }}
      >
        Confirm
      </Button>
      <Button onClick={handleClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

EmployeeDelete.propTypes = {
  employee: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default EmployeeDelete;
