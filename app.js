import {createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

import {auth} from "./config.js"



const form = document.querySelector('#form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const cpassword = document.querySelector('#cpassword')
const signin = document.querySelector('#signin')






signin.addEventListener('click' , ()=>{
  window.location = "login.html"
})

form.addEventListener('submit' , (event)=>{
    event.preventDefault()
    if(password.value === cpassword.value){
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    window.location = "login.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}else{
    alert('enter correct password')
}
//   email.value = ""
//   password.value = ""
//   cpassword.value = ""

})
