import {
  collection, doc, addDoc, setDoc
} from 'firebase/firestore';
import { db } from '../../firebase-config';

console.log(db);
const ref = collection(db, 'users');

export function getAllEmployees() {
  return ref;
}

export function editEmployee(employee) {
  const ref2 = doc(db, 'users', `${employee.id}`);
  setDoc(ref2, {
    firstName: employee.firstName,
    lastName: employee.lastName,
    username: employee.username,
    email: employee.email,
    contact: employee.contact,
    address: employee.address,
    role: employee.role,
    dob: new Date(Date.parse(employee.dob)),
    identificationNumber: employee.identificationNumber,
    startDate: employee.startDate,
    salary: employee.salary,
    bank: employee.bank,
    bankAccNum: employee.bankAccNum,
    dietaryRestrictions: employee.dietaryRestrictions,
    ethnicity: employee.ethnicity,
    endDate: employee.endDate, // eslint-disable-next-line
  }).then(() => window.alert('Success! Please reload the page.')) // eslint-disable-next-line
    .catch((error) => window.alert(error, 'Not edited!')); 
}

export function addEmployee(values) {
  addDoc(ref, {
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    email: values.email,
    contact: values.contact,
    address: values.address,
    role: values.role,
    dob: values.dob,
    identificationNumber: values.identificationNumber,
    startDate: new Date(Date.parse(values.startDate)),
    salary: values.salary,
    bank: values.bank,
    bankAccNum: values.bankAccNum,
    dietaryRestrictions: values.dietaryRestrictions,
    ethnicity: values.ethnicity,
    endDate: new Date(Date.parse(values.endDate)),
    active: values.active // eslint-disable-next-line
  }).then(() => window.alert('Success! Please reload the page.')) // eslint-disable-next-line
  .catch((error) => window.alert(error, 'Not edited!')); 
}
