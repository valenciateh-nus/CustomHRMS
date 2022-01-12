import {
  Avatar,
  Box, Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  doc,
  getDoc
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  // AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  DollarSign as DollarSignIcon, Star as StarIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { db } from '../firebase-config';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/employees',
    icon: UsersIcon,
    title: 'Employees'
  },
  {
    href: '/app/attendance',
    icon: ClockIcon,
    title: 'Attendance'
  },
  {
    href: '/app/leave',
    icon: CalendarIcon,
    title: 'Leave'
  },
  {
    href: '/app/payroll',
    icon: DollarSignIcon,
    title: 'Payroll'
  },
  {
    href: '/app/appraisal',
    icon: StarIcon,
    title: 'Appraisal'
  },
];

const userItems = [
  {
    href: '/user/attendance',
    icon: ClockIcon,
    title: 'User Attendance'
  },
  {
    href: '/user/leave',
    icon: CalendarIcon,
    title: 'User Leave'
  },
  {
    href: '/user/payroll',
    icon: DollarSignIcon,
    title: 'User Payroll'
  },
  {
    href: '/user/appraisal',
    icon: StarIcon,
    title: 'User Appraisal'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const currUser = JSON.parse(localStorage.getItem('currUser'));

  const [currEmp, setCurrEmp] = useState([]);
  const [loading, setLoading] = useState(true);

  const currEmployee = async () => {
    await getDoc(doc(db, 'users', currUser.email)).then((docSnap) => {
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setCurrEmp(docSnap.data());
        console.log('Current employee is ', currEmp);
      } else {
        console.log('No such document!');
      }
    });
  };

  const user = {
    avatar: currEmp.avatar,
    jobTitle: currEmp ? currEmp.role : 'Employee',
    name: currEmp ? `${currEmp.firstName} ${currEmp.lastName}` : 'User',
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    currEmployee();
    setLoading(false);
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {loading && <Typography>Loading ...</Typography>}
          {(!loading && currEmp.role === 'Manager')
            && items.concat(userItems).map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          {(!loading && currEmp.role !== 'Manager')
            && userItems.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}

        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {
  },
  openMobile: false
};

export default DashboardSidebar;
