import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

// Initialize Firebase
initializeApp(firebaseConfig);

// init Firestore services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// queries
const q = query(colRef, orderBy('createdAt'));

// get collection data (simple variant)
// getDocs(colRef)
//   .then((snapshot) => {
//     // console.log(snapshot.docs);

//     //extract data from response
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({
//         ...doc.data(),
//         id: doc.id,
//       });
//     });

//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// real time colletion data (works atomatically after adding or deleting books)
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  console.log(books);
});

console.log('hello from index.js');

// get single document
const docID = `HO7ry4gZDiY4Ooiwcr74`;
const docRef = doc(db, 'books', docID);
getDoc(docRef).then((doc) => {
  console.log(doc.data(), doc.id);
});

// subscription to single doc change (same as real time collection subs)
onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// adding docs
const addBookForm = document.querySelector('.add');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    // This is async function!
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector('.delete');
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // reference to document with id
  const docRef = doc(db, 'books', deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

// updating a document
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let docRef = doc(db, 'books', updateForm.id.value);

  updateDoc(docRef, {
    title: 'updated title',
  }).then(() => {
    updateForm.reset();
  });
});
