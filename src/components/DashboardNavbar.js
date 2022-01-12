import {
  AppBar, Box,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import { signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const currUser = JSON.parse(localStorage.getItem('currUser'));
  const currEmployee = JSON.parse(localStorage.getItem('currEmployee'));

  const navigate = useNavigate();

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        {currUser === null && (
          <RouterLink to="/login">
            <Logo />
          </RouterLink>
        )}
        {currUser !== null && (
          <RouterLink to={currEmployee.role === 'Manager' ? '/app/dashboard' : '/user/attendance'}>
            <Logo />
          </RouterLink>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          size="large"
          title="Sign Out"
          onClick={() => {
            signOut(auth).then(() => {
              localStorage.removeItem('currUser');
              localStorage.removeItem('currEmployee');
              console.log('Signed out');
              navigate('/login', { replace: false });
            }).catch((error) => {
              console.log(error.message);
            });
          }}
        >
          <InputIcon />
        </IconButton>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
