import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCnzpiWmA124eFvoUj7HvbHh7G23xkhh6o",
  authDomain: "superchat-82985.firebaseapp.com",
  projectId: "superchat-82985",
  storageBucket: "superchat-82985.appspot.com",
  messagingSenderId: "669297744510",
  appId: "1:669297744510:web:cf7e23623232ce3c11562f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
