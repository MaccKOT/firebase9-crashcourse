import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Initialize Firebase
initializeApp(firebaseConfig);

// init Firestore services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    // console.log(snapshot.docs);

    //extract data from response
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

console.log('hello from index.js');
