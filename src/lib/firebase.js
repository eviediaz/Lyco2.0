import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDRUObPDdLE08P447vkJ4yH7PQemXucSxg",
    authDomain: "lyco-v2.firebaseapp.com",
    projectId: "lyco-v2",
    storageBucket: "lyco-v2.appspot.com",
    messagingSenderId: "649233770576",
    appId: "1:649233770576:web:721f7ab98a5a5b8816c955",
    measurementId: "G-XRFPK5ZJCL"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage }; 
export default db;