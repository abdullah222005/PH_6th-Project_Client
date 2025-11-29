import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7HAenbMzLfCDyi8w5nsbkfy74onKhC2M",
  authDomain: "smart-deals-d2a01.firebaseapp.com",
  projectId: "smart-deals-d2a01",
  storageBucket: "smart-deals-d2a01.firebasestorage.app",
  messagingSenderId: "467372561216",
  appId: "1:467372561216:web:f066714627543e78fbe0a5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
