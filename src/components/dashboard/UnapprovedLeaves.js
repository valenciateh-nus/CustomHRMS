import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { useState, useEffect } from 'react';
import {
  query,
  where,
  collection,
  getDocs
} from '@firebase/firestore';
import { db } from 'src/firebase-config';
import { orange } from '@material-ui/core/colors';
import DateRangeIcon from '@mui/icons-material/DateRange';

const UnapprovedLeaves = () => {
  const [size, setSize] = useState(0);

  const getEmployees = async () => {
    const data = query(collection(db, 'leave'), where('approved', '==', false));
    const querySnapshot = await getDocs(data);
    querySnapshot.forEach(() => {
      setSize(size + 1);
    });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Card {...size}>
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
              UNAPPROVED LEAVES
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
                backgroundColor: orange[500],
                height: 56,
                width: 56
              }}
            >
              <DateRangeIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UnapprovedLeaves;
