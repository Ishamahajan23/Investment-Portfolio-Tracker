import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyBPMbPo7EVpdJwg2ypEQyfHNgW-TfW86Dg",
    authDomain: "investment-portfolio-tra-abb9b.firebaseapp.com",
    databaseURL: "https://investment-portfolio-tra-abb9b-default-rtdb.firebaseio.com",
    projectId: "investment-portfolio-tra-abb9b",
    storageBucket: "investment-portfolio-tra-abb9b.firebasestorage.app",
    messagingSenderId: "907175562027",
    appId: "1:907175562027:web:ffdbd4cdc6e17f670f136e",
    measurementId: "G-H3EXD1HSRD"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


window.signUp = function () {
  let email = document.getElementById("sign-email").value;
  let password = document.getElementById("sign-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("message").innerText = "Sign-Up Successful! Redirecting...";
      setTimeout(() => window.location.href = "login.html", 1000);
    })
    .catch(error => {
      document.getElementById("message").innerText = error.message;
    });
};


window.Login = function () {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      document.getElementById("message").innerText = "Login Successful! Redirecting...";
      setTimeout(() => window.location.href = "dashboard.html", 1000);
    })
    .catch(error => {
      document.getElementById("message").innerText = error.message;
    });
};


window.Logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html"; 
  }).catch(error => {
    console.error("Logout Error:", error.message);
  });
};


onAuthStateChanged(auth, (user) => {
  if (window.location.pathname.includes("dashboard.html")) {
    if (!user) {
      window.location.href = "index.html"; // Redirect if user is not logged in
    } else {
      document.getElementById("user-status").innerText = `Hello, ${user.email}`;
    }
  }
});


