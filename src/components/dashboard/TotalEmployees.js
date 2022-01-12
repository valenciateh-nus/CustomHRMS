import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { green } from '@material-ui/core/colors';
import { db } from 'src/firebase-config';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const TotalEmployees = () => {
  const [size, setSize] = useState(0);
  const employeesPageRef = (collection(db, 'users'));

  const getSize = async () => {
    await getDocs(employeesPageRef).then((snap) => {
      setSize(snap.size); // will return the collection size
    });
  };

  useEffect(() => {
    getSize();
  }, []);

  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL EMPLOYEES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {size}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalEmployees;
