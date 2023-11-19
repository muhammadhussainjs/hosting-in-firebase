import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBoMdubNo4ll7lE6ZzN3crhED2CSBm9CLQ",
  authDomain: "hussaintodo-e9260.firebaseapp.com",
  projectId: "hussaintodo-e9260",
  storageBucket: "hussaintodo-e9260.appspot.com",
  messagingSenderId: "255356762337",
  appId: "1:255356762337:web:efd24c316b232336fa5fa0",
  measurementId: "G-4ST43N3TRQ"
};


  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
 export const storage = getStorage(app);
