// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDKUaKd2KP4TbCbU362dVAl3PiJocPGb1E',
  authDomain: 'car-service-3fc6c.firebaseapp.com',
  projectId: 'car-service-3fc6c',
  storageBucket: 'car-service-3fc6c.appspot.com',
  messagingSenderId: '170069968259',
  appId: '1:170069968259:web:80302a99239e97cbfba2b6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
