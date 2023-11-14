import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

import {auth} from "./config.js"


const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const signup = document.querySelector('#signup')

signup.addEventListener('click' , ()=>{
  window.location = "index.html"
})


form.addEventListener('submit' , (event)=>{
    event.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(user.uid)
      window.location = "home.html"
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    })
})
