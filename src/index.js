import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
// import { getDatabase, ref, push, set, onValue, query, orderByChild, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import { GoogleAuthProvider, signInWithRedirect } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const firebaseConfig = {
    apiKey: "<KEY>",
    authDomain: "<DOMAIN>",
    databaseURL: "<DATABASE-URL>",
    projectId: "<PROJECT-ID>",
    storageBucket: "<BUCKET>",
    messagingSenderId: "<SENDER-ID>",
    appId: "<APP-ID>"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


let register = document.getElementById("register");

register.addEventListener("click", function(e){

    const email = document.getElementById("regEmail");
    const password = document.getElementById("regPassword");

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });

    e.preventDefault();

});

let login = document.getElementById("login");

login.addEventListener("click", function(e){

    const email = document.getElementById("logEmail");
    const password = document.getElementById("logPassword");

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });

    e.preventDefault();

});

let status = document.getElementById("status");

onAuthStateChanged(auth, (user) => {
    if (user) {

        const id = user.uid;
        const email = user.email;
        status.innerHTML = "You are logged in as " + email + " <a href='#' id='logout'>logout</a>";

        let logout = document.getElementById("logout");

        logout.addEventListener("click", function(e){
      
            signOut(auth);
      
            e.preventDefault();
      
        });

    } else {
        status.innerHTML = "You are not logged in";
    }
});

  
let gmailRegister = document.getElementById("gmailRegister");

gmailRegister.addEventListener("click", function(e){

    signInWithRedirect(auth, provider);

    e.preventDefault();

});
