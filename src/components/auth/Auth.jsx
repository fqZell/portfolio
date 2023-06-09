import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import SignUp from './SignUp';

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
          <SignUp />
          Уже есть аккаунт? 
        </>
      )}
    </div>
  );
};

export default Auth;