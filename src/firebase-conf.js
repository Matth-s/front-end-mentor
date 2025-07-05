import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD2VeJ8iETxJJ5TT2GWB4ugOptuR0rmuac',
  authDomain: 'front-end-mentor-22155.firebaseapp.com',
  projectId: 'front-end-mentor-22155',
  storageBucket: 'front-end-mentor-22155.firebasestorage.app',
  messagingSenderId: '581262020634',
  appId: '1:581262020634:web:3b5d7ba783ab21073981a3',
  measurementId: 'G-9YX1Z4GVRL',
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
