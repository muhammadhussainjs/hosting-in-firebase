import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBbgxDztFTh3qj1ZE3yChT7jjQr4DjfuG0",
    authDomain: "signupwithhussain.firebaseapp.com",
    projectId: "signupwithhussain",
    storageBucket: "signupwithhussain.appspot.com",
    messagingSenderId: "1092555408387",
    appId: "1:1092555408387:web:e11cdfc54e40f6f9033a36",
    measurementId: "G-4K95BYFK99"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);