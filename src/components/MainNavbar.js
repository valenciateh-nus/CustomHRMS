import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Logo from './Logo';

const MainNavbar = (props) => {
  const currUser = JSON.parse(localStorage.getItem('currUser'));
  // const currEmployee = JSON.parse(localStorage.getItem('currEmployee'));

  return (
    <AppBar
      elevation={0}
      {...props}
    >
      <Toolbar sx={{ height: 64 }}>
        {currUser === null && (
          <RouterLink to="/login">
            <Logo />
          </RouterLink>
        )}
        {currUser !== null && (
          <RouterLink to="/app/account">
            <Logo />
          </RouterLink>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
