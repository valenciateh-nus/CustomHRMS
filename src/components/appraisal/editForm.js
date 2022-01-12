import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './appraisal.css';

import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';

import Select from 'react-select';
import {
  collection,
  updateDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../../firebase-config';

const EditForm = ({ appraisalForm }) => {
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [selectedAppraisalId, setSelectedAppraisalId] = useState('');
  const [selected, setSelected] = useState('');
  const [checkboxState, setCheckboxState] = useState(false);
  const [appraisal, setAppraisal] = useState([]);
  const [warning, setWarning] = useState('');
  const [success, setSuccess] = useState('');
  const ref = collection(db, 'appraisalForm');
  let apArr = [];
  let arr = [];

  useEffect(() => {
    const getAppraisal = async () => {
      const data = await getDocs(ref);
      setAppraisal(data.docs.map((value) => ({ ...value.data(), id: value.id })));
    };
    getAppraisal();
  }, []);

  const handleCheckbox = () => {
    setCheckboxState(!(checkboxState));
  };

  const formatDate = (date) => {
    if (date !== null) {
      const formattedDate = date.toString().split(' ').slice(1, 4);
      const newDate = formattedDate.join('-');
      return (newDate);
    }
    return '';
  };

  const updateAppraisal = async () => {
    apArr = [];
    Array.from(appraisalForm).filter((val) => {
      const start = new Date(val.startDate.seconds * 1000);
      const end = new Date(val.endDate.seconds * 1000);
      if ((startDateValue < start && endDateValue < start) || (startDateValue > end && endDateValue > end) || (val.id === selectedAppraisalId)) {
        return null;
      }
      return val;
    })
      .map((obj) => apArr.push(obj));

    if (apArr.length === 0) {
      if (startDateValue !== '' && endDateValue !== '') {
        const appraisalDoc = doc(db, 'appraisalForm', selectedAppraisalId);
        const newFields = { startDate: startDateValue, endDate: endDateValue, selfEval: checkboxState };
        await updateDoc(appraisalDoc, newFields);
        setStartDateValue('');
        setEndDateValue('');
        setCheckboxState(false);
        setSelected(null);
        setSelectedAppraisalId('');
        setWarning('');
        setSuccess('Successfully Edited!');
        window.location.reload();
      } else {
        setWarning('Values required!');
        setSuccess('');
      }
    } else {
      const start = formatDate(new Date(apArr[0].startDate.seconds * 1000).toString());
      const end = formatDate(new Date(apArr[0].endDate.seconds * 1000).toString());
      setWarning(`An Appraisal Cycle already exists from ${start} to ${end}!`);
      setSuccess('');
    }
  };

  const deleteAppraisal = async () => {
    if (startDateValue !== '' && endDateValue !== '') {
      if (startDateValue > new Date()) {
        const appraisalFormDoc = doc(db, 'appraisalForm', selectedAppraisalId);
        await deleteDoc(appraisalFormDoc);
        setStartDateValue('');
        setEndDateValue('');
        setCheckboxState(false);
        setSelected(null);
        setSelectedAppraisalId('');
        setWarning('');
        setSuccess('Successfully Deleted!');
      } else {
        setWarning('Cannot delete a past / ongoing cycle!');
        setSuccess('');
      }
    } else {
      setWarning('Values required!');
      setSuccess('');
    }
  };

  const getDataArray = () => {
    arr = [];
    Array.from(appraisal).sort((a, b) => a.startDate.seconds - b.startDate.seconds)
      .filter((val) => {
        if (new Date(val.endDate.seconds * 1000) < new Date()) {
          return null;
        }
        return val;
      })
      .forEach((obj) => {
        console.log(`${obj.id}`);
        const start = formatDate(new Date(obj.startDate.seconds * 1000).toString());
        const end = formatDate(new Date(obj.endDate.seconds * 1000).toString());
        arr.push({ value: `${obj.id}`, label: `${start} to ${end}` });
      });
    console.log(arr);
    return arr;
  };

  const getAppraisalForm = (aId) => {
    const ap = Array.from(appraisal).filter((obj) => obj.id === aId);
    return ap[0];
  };

  const handleSelect = (selectedValue) => {
    const ap = getAppraisalForm(selectedValue.value);
    setSelectedAppraisalId(ap.id.toString());
    setStartDateValue(new Date(ap.startDate.seconds * 1000));
    setEndDateValue(new Date(ap.endDate.seconds * 1000));
    setCheckboxState(ap.selfEval);
    console.log(checkboxState);
    setSelected(arr.find((id) => id === selectedAppraisalId));
  };

  return (appraisal.length > 0) ? (
    <Box sx={{
      mt: 1,
      mx: 5,
    }}
    >
      <h1>
        Edit Appraisal Cycle
      </h1>
      <div>&nbsp;</div>
      <Box>
        <h4> Select Appraisal to edit: </h4>
        <Select
          options={getDataArray()}
          onChange={handleSelect}
          value={selected}
        />
      </Box>
      <div>&nbsp;</div>
      <Box>
        <h4>Edit appraisal procress period: </h4>
        <DatePicker
          sx={{
            minHeight: 5,
            mx: 5,
          }}
          className="startingCalendar"
          id="starting"
          selected={startDateValue}
          onChange={(date) => setStartDateValue(date)}
          value={endDateValue}
          placeholderText="Search by start date"
          disabled={(startDateValue < new Date())}
          required
        />
      </Box>
      <Box sx={{
        mt: 1,
      }}
      >
        <DatePicker
          sx={{
            minHeight: 5,
            ml: 5,
          }}
          className="endingCalendar"
          id="ending"
          selected={endDateValue}
          onChange={(date) => setEndDateValue(date)}
          value={endDateValue}
          placeholderText="Search by end date"
          required
        />
      </Box>
      <FormControl>
        <FormControlLabel control={<Checkbox />} label="Enable self evalutation" onChange={handleCheckbox} checked={checkboxState} />
        <Box className="buttons">
          <Button
            value="Submit"
            variant="contained"
            color="success"
            onClick={updateAppraisal}
          >
            Edit
          </Button>
          <Button
            sx={{
              mx: 2,
            }}
            value="Delete"
            variant="contained"
            color="error"
            onClick={deleteAppraisal}
          >
            Delete
          </Button>
        </Box>
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
  ) : (
    <Box>
      <h1>Loading...</h1>
    </Box>
  );
};

EditForm.propTypes = {
  appraisalForm: PropTypes.array.isRequired,
};

export default EditForm;
