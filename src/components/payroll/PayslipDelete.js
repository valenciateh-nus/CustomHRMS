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

const PayslipDelete = ({ payslip, open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>
      <div>Delete Payslip</div>
    </DialogTitle>
    <DialogContent>
      Confirm Deletion of Payslip ID:&nbsp;
      <b>{payslip.id}</b>
    </DialogContent>
    <DialogActions>
      <Button
        color="error"
        fullWidth
        variant="contained"
        onClick={() => {
          deleteDoc(doc(db, 'payroll', payslip.id))
            .then(() => {
              console.log('Payslip deleted');
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

PayslipDelete.propTypes = {
  payslip: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default PayslipDelete;
