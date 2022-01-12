import { useState } from 'react';

import {
  Button,
  Card,
} from '@material-ui/core';

import UserAppraisalData from './userAppraisalData';
import UserSubmittedAppraisalData from './userSubmittedAppraisalData';

const UserAppraisalList = () => {
  const [changeTable, setChangeTable] = useState(false);

  const handleTableChange = () => {
    console.log(changeTable);
    setChangeTable(!changeTable);
  };

  return (
    <>
      <Card>
        <Button
          className="switch-btn"
          color="primary"
          variant="contained"
          onClick={() => (handleTableChange())}
        >
          {changeTable ? 'View My Appraisals' : 'View My Submitted Appraisals'}
        </Button>
        {changeTable ? <UserSubmittedAppraisalData /> : <UserAppraisalData />}
      </Card>
    </>
  );
};

export default UserAppraisalList;
