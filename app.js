import {createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

import {auth ,db , storage} from "./config.js"

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js'


const form = document.querySelector('#form')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const cpassword = document.querySelector('#cpassword')
const signin = document.querySelector('#signin')
const img = document.querySelector('#img')




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
    const file = img.files[0]
    const storageRef = ref(storage, name.value);
    uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url) => {
            addDoc(collection(db, "post"), {
                name: name.value,
                email: email.value,
                uid: user.uid,
                profileUrl: url
            }).then((res) => {
                console.log(res);
                window.location = 'login.html'
            }).catch((err) => {
                console.log(err);
            })
        })
    });


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
}else{
    alert('enter correct password')
}
  email.value = ""
  password.value = ""
  cpassword.value = ""

})
