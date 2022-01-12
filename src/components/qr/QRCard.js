import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import QRCode from 'react-qr-code';

const QRCard = () => {
  const url = 'https://customhrms-e80cc.web.app/user/attendance';

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
              QR Code
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              CHECK IN
            </Typography>
          </Grid>
          <Grid item>
            <QRCode size="52" value={url} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QRCard;
