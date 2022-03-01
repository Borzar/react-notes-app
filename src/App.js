
import React, {useState, useEffect} from 'react';
import Home from './components/Home';
import Login from './components/Login';
import { firebaseApp } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(firebaseApp);

function App() {
  const [userGlobal, setUserGlobal] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    
    if (userFirebase){
      //codigo  en caso de que haya sesión iniciada
      setUserGlobal(userFirebase)
    } else {
      //codigo en caso de que no haya sesión iniciada
      setUserGlobal(null)
    }

    

  })

  return (
    //si el usuario existe se muestre Home, en caso contrario muestra Logeo
    <div>
      
      {userGlobal ? <Home userEmail={userGlobal.email}/> : <Login/> }


    </div>
  );
}
export default App;
