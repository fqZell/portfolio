import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const API_KEY = import.meta.env.VITE_API_KEY; 

const firebaseConfig = {
  apiKey: "AIzaSyC1DULNiRTBQESpdnOKvcKezAHIH7hp96I",
  authDomain: "portfolioauth-804d3.firebaseapp.com",
  projectId: "portfolioauth-804d3",
  storageBucket: "portfolioauth-804d3.appspot.com",
  messagingSenderId: "579864354440",
  appId: "1:579864354440:web:5eca0aaba59ec4b89e893d"
};

const app = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();

export { app, googleAuthProvider };