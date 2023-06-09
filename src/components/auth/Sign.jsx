// import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       await firebase.auth().signInWithEmailAndPassword(email, password);
//       // Успешный вход в систему
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Вход в систему</h2>
//       <form onSubmit={handleSignIn}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Пароль"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Войти</button>
//       </form>
//     </div>
//   );
// };

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     try {
//       await firebase.auth().createUserWithEmailAndPassword(email, password);
//       // Успешная регистрация
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Регистрация</h2>
//       <form onSubmit={handleSignUp}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Пароль"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Зарегистрироваться</button>
//       </form>
//     </div>
//   );
// };

// export { SignIn, SignUp };