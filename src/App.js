import { StyledEngineProvider, ThemeProvider } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  Navigate,
  useRoutes
} from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import GlobalStyles from './components/GlobalStyles';
import MainLayout from './components/MainLayout';
import { auth } from './firebase-config';
import Account from './pages/Account';
import Appraisal from './pages/Appraisal';
import Attendance from './pages/Attendance';
import Dashboard from './pages/Dashboard';
import EmployeesPage from './pages/EmployeesPage';
import LeavePage from './pages/LeavePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Payroll from './pages/Payroll';
import QR from './pages/QR';
import UserAppraisal from './pages/UserAppraisal';
import UserAttendance from './pages/UserAttendance';
import UserLeave from './pages/UserLeave';
import UserPayroll from './pages/UserPayroll';
import theme from './theme';
// import { useEffect, useState } from 'react';

const App = () => {
  const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem('currUser')));
  // const currEmployee = JSON.parse(localStorage.getItem('currUser'));

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('logged in as', user.email);
      localStorage.setItem('currUser', JSON.stringify(user));
      setCurrUser(user);
    } else {
      console.log('No logged in user');
    }
  });

  const routes = [
    {
      path: 'app',
      element: (currUser !== null ? <DashboardLayout /> : <Navigate to="/login" />),
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'account', element: <Account /> },
        { path: 'employees', element: <EmployeesPage /> },
        { path: 'appraisal', element: <Appraisal /> },
        { path: 'attendance', element: <Attendance /> },
        { path: 'leave', element: <LeavePage /> },
        { path: 'payroll', element: <Payroll /> },
        { path: 'qr', element: <QR /> },
        { path: '*', element: <Navigate to="/404" replace="false" /> },
      ]
    },
    {
      path: 'user',
      element: (currUser !== null ? <DashboardLayout /> : <Navigate to="/login" />),
      children: [
        { path: 'attendance', element: <UserAttendance /> },
        { path: 'appraisal', element: <UserAppraisal /> },
        { path: 'payroll', element: <UserPayroll /> },
        { path: 'leave', element: <UserLeave /> },
        { path: '*', element: <Navigate to="/404" replace="false" /> },
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: (currUser === null ? <Navigate to="/login" /> : <Navigate to="/app/account" />) },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace="false" /> },
      ]
    }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {useRoutes(routes)}
        </ThemeProvider>
      </StyledEngineProvider>
    </LocalizationProvider>
  );
};

export default App;
