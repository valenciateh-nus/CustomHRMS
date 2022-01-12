import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Typography
} from '@material-ui/core';
import { format } from 'date-fns';
import { PropTypes } from 'prop-types';

const UserPayslipDetails = ({ payslip, open, handleClose }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>
      <Typography>
        <strong>{payslip.id}</strong>
      </Typography>
    </DialogTitle>
    <DialogContent>
      <Typography>
        Basic:&nbsp;
        {payslip.basic}
      </Typography>
      <Typography>
        Overtime:&nbsp;
        {payslip.basic}
      </Typography>
      <Typography>
        CPF:&nbsp;
        {payslip.cpfEmployee + payslip.cpfEmployer}
      </Typography>
      <br />
      <Typography>
        From&nbsp;
        {format(payslip.startDate.toDate(), 'dd MMM yyyy')}
        &nbsp;to&nbsp;
        {format(payslip.endDate.toDate(), 'dd MMM yyyy')}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

UserPayslipDetails.propTypes = {
  payslip: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default UserPayslipDetails;
