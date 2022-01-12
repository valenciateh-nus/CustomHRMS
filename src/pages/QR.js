import {
  Box,
  Container,
  FormControl, MenuItem
} from '@material-ui/core';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import QRCode from 'react-qr-code';

const QR = () => {
  const [url, setUrl] = useState('google.com');
  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const selections = [
    {
      id: 'Google',
      url: 'google.com',
    },
    {
      id: 'Bing',
      url: 'bing.com',
    }
  ];

  return (
    <>
      <Helmet>
        <title>QR Generator</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container>
          <Box sx={{ marginBottom: 2 }}>
            <FormControl>
              <TextField
                label="Select"
                select
                value={url}
                variant="outlined"
                onChange={handleChange}
              >
                {selections.map((select) => (
                  <MenuItem value={select.url}>{select.id}</MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
          <Box>
            <QRCode value={url} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default QR;
