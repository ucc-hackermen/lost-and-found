import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCFhq_GWPuyu63yTCwr_RG3rDt8RA7Q5D8",
  authDomain: "ucc-lost-and-found.firebaseapp.com",
  projectId: "ucc-lost-and-found",
  storageBucket: "ucc-lost-and-found.appspot.com",
  messagingSenderId: "942961955780",
  appId: "1:942961955780:web:14a559b7049ccb749aca91",
};

// Initialize Firebase
export const Fire = initializeApp(firebaseConfig);
