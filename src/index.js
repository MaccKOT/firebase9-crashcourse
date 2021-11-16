import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
initializeApp(firebaseConfig);

console.log('hello from index.js');
