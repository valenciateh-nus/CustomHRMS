import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';

import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const AddForm = () => {
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);
  const [warning, setWarning] = useState('');
  const [success, setSuccess] = useState('');
  const [appraisalForm, setAppraisalForm] = useState([]);
  const ref = collection(db, 'appraisalForm');
  let arr = [];

  useEffect(() => {
    const getAppraisalForm = async () => {
      const data = await getDocs(ref);
      setAppraisalForm(data.docs.map((value) => ({ ...value.data(), id: value.id })));
    };
    getAppraisalForm();
  }, []);

  const handleCheckbox = () => {
    setCheckboxState(!(checkboxState));
  };

  // const createAppraisal = async () => {
  //   if (af.length === 0) {
  //     console.log('ok');
  //     setWarning(false);
  //     // await addDoc(ref, { startDate: startDateValue, endDate: endDateValue, selfEval: checkboxState });
  //     setStartDateValue('');
  //     setEndDateValue('');
  //     setCheckboxState(false);
  //   } else {
  //     setWarning(true);
  //   }
  // };

  const formatDate = (date) => {
    if (date !== null) {
      const formattedDate = date.toString().split(' ').slice(1, 4);
      const newDate = formattedDate.join('-');
      return (newDate);
    }
    return '';
  };

  const createAppraisal = async () => {
    arr = [];
    Array.from(appraisalForm).filter((val) => {
      const start = new Date(val.startDate.seconds * 1000);
      const end = new Date(val.endDate.seconds * 1000);
      if ((startDateValue < start && endDateValue < start) || (startDateValue > end && endDateValue > end)) {
        return null;
      }
      return val;
    })
      .map((obj) => arr.push(obj));
    if (arr.length === 0) {
      console.log('ok');
      setWarning('');
      setSuccess('Successfully Added!');
      if (startDateValue !== '' && endDateValue !== '') {
        await addDoc(ref, { startDate: startDateValue, endDate: endDateValue, selfEval: checkboxState });
        setStartDateValue('');
        setEndDateValue('');
        setCheckboxState(false);
      } else {
        setWarning('Values required!');
        setSuccess('');
      }
    } else {
      const start = formatDate(new Date(arr[0].startDate.seconds * 1000).toString());
      const end = formatDate(new Date(arr[0].endDate.seconds * 1000).toString());
      setWarning(`An Appraisal Cycle already exists from ${start} to ${end}!`);
      setSuccess('');
    }
    window.location.reload();
  };

  return (
    <Box sx={{
      mt: 1,
      mx: 5,
    }}
    >
      <h1> Add Appraisal Cycle </h1>
      <div>&nbsp;</div>
      <Box
        sx={{
          mt: 1,
        }}
        className="dateBox"
      >
        <h4>Select appraisal procress period: </h4>
        <DatePicker
          className="startingCalendar"
          id="starting"
          selected={startDateValue}
          onChange={(date) => setStartDateValue(date)}
          value={startDateValue}
          placeholderText="Search by start date"
          minDate={new Date()}
          maxDate={endDateValue}
          required
        />

      </Box>
      <Box
        sx={{
          mt: 1,
        }}
        className="dateBox"
      >
        <DatePicker
          id="ending"
          className="endingCalendar"
          selected={endDateValue}
          onChange={(date) => setEndDateValue(date)}
          value={endDateValue}
          placeholderText="Search by end date"
          minDate={startDateValue}
          required
        />
      </Box>
      <FormControl sx={{
        mt: 2,
      }}
      >
        <FormControlLabel control={<Checkbox />} label="Enable self evalutation" onChange={handleCheckbox} />
        <Button
          sx={{
            mt: 3,
          }}
          value="Submit"
          variant="outlined"
          onClick={createAppraisal}
        >
          Submit
        </Button>
      </FormControl>
      <div>
        {warning === '' ? (<Box />)
          : (
            <Alert severity="error">
              {warning}
            </Alert>
          )}
        {success === '' ? (<Box />)
          : (
            <Alert severity="success">
              {success}
            </Alert>
          )}
      </div>
    </Box>
  );
};

export default AddForm;
