// import { PropTypes } from 'prop-types'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton
} from '@material-ui/core';
import {
  Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, PictureAsPdf as PictureAsPdfIcon
} from '@mui/icons-material';
import {
  DataGrid,
  GridToolbar
} from '@mui/x-data-grid';
import {
  collection,
  getDocs
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PayslipDelete from '../components/payroll/PayslipDelete';
import PayslipForm from '../components/payroll/PayslipForm';
import PayslipPdf from '../components/payroll/PayslipPdf';
import { db } from '../firebase-config';

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);
  const payrollRef = (collection(db, 'payroll'));

  const getPayroll = async () => {
    const data = await getDocs(payrollRef);
    setPayroll(data.docs.map((d) => ({ ...d.data(), id: d.id })));
  };

  useEffect(() => {
    getPayroll();
  }, []);

  const [payslip, setPayslip] = useState([]);
  const [dialogType, setDialogType] = useState('create');

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getPayroll();
    setOpen(false);
  };

  const CreateButton = () => (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => {
        setDialogType('create');
        setPayslip([]);
        console.log(dialogType);
        handleClickOpen();
      }}
    >
      Create Payroll
    </Button>
  );

  const actionsButtonGroup = (params) => (
    <ButtonGroup>
      <IconButton
        title="Edit Payslip"
        onClick={() => {
          setDialogType('edit');
          setPayslip(params.row);
          console.log(dialogType);
          handleClickOpen();
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        title="Delete Payslip"
        onClick={() => {
          setDialogType('delete');
          setPayslip(params.row);
          console.log(dialogType);
          handleClickOpen();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        title="View PDF"
        onClick={() => {
          setDialogType('pdf');
          setPayslip(params.row);
          console.log(dialogType);
          handleClickOpen();
        }}
      >
        <PictureAsPdfIcon />
      </IconButton>
    </ButtonGroup>
  );

  const rows = payroll;

  const columns = [
    {
      field: 'id',
      headerName: 'Payslip ID',
      width: 250,
    },
    {
      field: 'basic',
      headerName: 'Basic',
      width: 130,
      type: 'number',
    },
    {
      field: 'overtime',
      headerName: 'Overtime',
      width: 150,
      type: 'number',
    },
    {
      field: 'cpfEmployee',
      headerName: 'CPF (Employee)',
      width: 200,
      type: 'number'
    },
    {
      field: 'cpfEmployer',
      headerName: 'CPF (Employer)',
      width: 200,
      type: 'number'
    },
    {
      field: 'paymentMode',
      headerName: 'Payment Mode',
      width: 200,
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: actionsButtonGroup
    }
  ];

  console.log(payroll);
  console.log(payslip);

  return (
    <>
      <Helmet>
        <title>HRMS | Payroll</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <CreateButton />
            <div style={{ height: 800, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </div>
            {(dialogType === 'create' || dialogType === 'edit')
              && (
                <PayslipForm
                  payslip={payslip}
                  setPayslip={setPayslip}
                  dialogType={dialogType}
                  open={open}
                  handleClose={handleClose}
                />
              )}
            {dialogType === 'delete' && (
              <PayslipDelete
                payslip={payslip}
                open={open}
                handleClose={handleClose}
              />
            )}
            {dialogType === 'pdf' && (
              <PayslipPdf
                payslip={payslip}
                open={open}
                handleClose={handleClose}
              />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Payroll;
