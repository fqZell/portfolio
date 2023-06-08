// import React from 'react'
// import { useState } from 'react'
// import { getAuth, signInWithPopup } from "firebase/auth"
// import { app, googleAuthProvider } from "../../bd/firebase"
// import { useEffect } from 'react'

// const Auth = () => {
//     const auth = getAuth(app);
//     const [user, setUser] = useState(auth.currentUser);

//     useEffect(() => {
//         const unsub = auth.onAuthStateChanged((maybeUser) => {
//             if (maybeUser != null ) {
//                 return setUser(maybeUser);
//             }

//             signInWithPopup(auth, googleAuthProvider).then(credentials => 
//                 setUser(credentials.user)
//             ).catch((e) => console.error(e));
//         });

//         return unsub;
//     }, [auth])

//   return user != null ? <>{user.displayName}</> : <>Loading...</>;
// }

// export default Auth

import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { SignIn, SignUp } from './Sign';

const Auth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Пользователь вошел в систему
        setUser(user);
      } else {
        // Пользователь вышел из системы
        setUser(null);
      }
    });

    // Отписка от прослушивания изменений состояния авторизации
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      // Успешный выход из системы
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Привет, {user.email}</h2>
          <button onClick={handleSignOut}>Выйти</button>
        </>
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </div>
  );
};

export default Auth;