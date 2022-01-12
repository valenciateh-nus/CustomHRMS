import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/*
const firebaseConfig = {
  apiKey: 'AIzaSyAXj9pm00sSi7jTMYcmfjErQf3mBv-W-ns',
  authDomain: 'customhrms-61398.firebaseapp.com',
  projectId: 'customhrms-61398',
  storageBucket: 'customhrms-61398.appspot.com',
  messagingSenderId: '220757942722',
  appId: '1:220757942722:web:84d851a3f71e3b4cfeb65b',
  measurementId: 'G-1TX8SCYDJJ'
};
*/
const firebaseConfig = {
  apiKey: 'AIzaSyB6abd7DBDUu1XQq_vpY9qBhdL0IXqTO2k',
  authDomain: 'customhrms-e80cc.firebaseapp.com',
  projectId: 'customhrms-e80cc',
  storageBucket: 'customhrms-e80cc.appspot.com',
  messagingSenderId: '801539070960',
  appId: '1:801539070960:web:478a707e2dc30066ce5b35',
  measurementId: 'G-W6ZKRVHDVP'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
