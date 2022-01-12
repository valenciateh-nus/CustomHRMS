import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AppraisalForm from '../components/appraisal/appraisalForm';
import AppraisalList from '../components/appraisal/appraisalList';

const Appraisal = () => (
  <>
    <Helmet>
      <title>HRMS | Appraisal Portal</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <AppraisalForm />
          <AppraisalList />
        </Box>
      </Container>
    </Box>
  </>
);

export default Appraisal;
