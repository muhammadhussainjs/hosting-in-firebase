import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import {auth , db} from "./config.js"
import { collection, addDoc , getDocs , Timestamp , query, where, orderBy  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"; 

const logout = document.querySelector('#logout')
const title = document.getElementById('title')
const description = document.getElementById('description')
const form = document.getElementById('form')
const maindiv = document.getElementById('container')



//getdata
let array = []
async function getdata(){
    const querySnapshot = await getDocs(collection(db, "post"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.data()}`);
  array.push(doc.data())
});
array.map((item) =>{
    maindiv.innerHTML += `<div class="card"><p><span class="h4">Title: </span>${item.title}</p>
    <p><span class="h4">Description: </span>${item.description}</p>
    <button type="button" id="delete" class="btn btn-danger">Delete</button>
    <button type="button" id="update" class="btn btn-info">Edit</button>`
 
});
}
getdata()






//adddata
form.addEventListener("submit" , async (event)=>{
    event.preventDefault()
try {
    const docRef = await addDoc(collection(db, "post"), {
      title: title.value,
      description: description.value,
      uid: auth.currentUser.uid, 
      postdate: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    getdata()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  title.value = ""
  description.value = ""
})
  


//aoauthstatechange
onAuthStateChanged(auth, (user) => {
    if (user) {
          const uid = user.uid;
          console.log(uid);
        } else {
          window.location = "login.html"
          
        }
  });



  //logout
  logout.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
        alert('logoutsuccessfully');
        setTimeout(() => {
            window.location = "login.html"
            
        }, 3000);
        
      }).catch((error) => {
          alert("error")
      });
    })
    
  