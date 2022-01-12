import QRCode from 'react-qr-code';

const UserAttendanceScanner = () => {
  const currUser = JSON.parse(localStorage.getItem('currUser'));

  return (
    <>
      <QRCode value="http://google.com" />
    </>
  );
};

export default UserAttendanceScanner;
