import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEA6i8az2A3GnVpHXlhJxongFkl-N_s90",
    authDomain: "notes-app-react-eeb02.firebaseapp.com",
    projectId: "notes-app-react-eeb02",
    storageBucket: "notes-app-react-eeb02.appspot.com",
    messagingSenderId: "927214460356",
    appId: "1:927214460356:web:9e4953699d176a08889891"
  };

  export const firebaseApp = initializeApp(firebaseConfig);
  export const db = getFirestore(firebaseApp);


