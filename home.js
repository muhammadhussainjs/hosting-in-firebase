import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"
import {auth , db} from "./config.js"
import { collection, addDoc , getDocs , Timestamp , query, where, orderBy,   doc, deleteDoc , updateDoc  } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"; 

const logout = document.querySelector('#logout')
const title = document.getElementById('title')
const description = document.getElementById('description')
const form = document.getElementById('form')
const maindiv = document.getElementById('container')
const names = document.getElementById('name')
const uid = document.getElementById('uid')
const profileImage = document.querySelector('#profileimage');



//renderpost
onAuthStateChanged(auth, async (user) => {
    if (user) {
          const uid = user.uid;
          console.log(uid);

          const q = query(collection(db, "post"), where("uid", "==", uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
              console.log(doc.data())
              names.innerHTML = doc.data().name
              profileImage.src = doc.data().profileUrl
              uid.innerHTML = doc.data().uid
          });
        } else {
          window.location = "login.html"
          
        }
  });


let array = []
function renderpost(){
  maindiv.innerHTML = ''
  array.map((item) =>{
    maindiv.innerHTML += `<div class="card"><p><span class="h4">Title: </span>${item.title}</p>
    <p><span class="h4">Description: </span>${item.description}</p>
    <button type="button" id="delete" class"btn">Delete</button>
    <button type="button" id="update" class="btn">Edit</button>`  
  })
  const deletes = document.querySelectorAll('#delete')
  deletes.forEach((item, index) => {
    item.addEventListener('click',  async () => {
      console.log('delete called', array[index]);
      await deleteDoc(doc(db, 'post', array[index].docid))
      .then(() => {
                  console.log('post deleted');
                  array.splice(index, 1);
                  renderpost()
                });
              })
            })
   const upd = document.querySelectorAll('#update')
  upd.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
        console.log('update called', array[index]);
        const updatedTitle = prompt('enter new Title');
        const updateddescription = prompt('enter new description');
        await updateDoc(doc(db, "post", array[index].docid), {
          title: updatedTitle,
          description: updateddescription
        });
        array[index].title = updatedTitle;
        array[index].description = updateddescription;
        renderpost()

    })
})
}
  
//getdata
async function getdata(){
  array = []
  
  const querySnapshot = await getDocs(collection(db, "post"));
querySnapshot.forEach((doc) => {
  console.log(doc.data());
  array.push({...doc.data(), docid: doc.id})
});
renderpost()
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
    
  