import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBDDcRjD-n8GARKy7Kz04UMPyJ_2DMW3lY',
  authDomain: 'customhrms.firebaseapp.com',
  projectId: 'customhrms',
  storageBucket: 'customhrms.appspot.com',
  messagingSenderId: '454637246867',
  appId: '1:454637246867:web:7d3d4402869f5a20ac3066',
  measurementId: 'G-KV472W0W56'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const leaveApplicationsList = async function getLeaveApplications() {
  const querySnapshot = await getDocs(collection(db, 'leave'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    console.log('Leave');
  });
};

const leaveApplications = Array.from(leaveApplicationsList);
console.log('leaveApplications type:', typeof (leaveApplications));
console.log('leaveApplications:', leaveApplications);

export default { leaveApplications };
