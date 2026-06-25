import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

async function login() {

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {

    loginBtn.disabled = true;
    loginBtn.innerText = "Logging in...";

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    location.href = "app.html";

  } catch (err) {

    alert(err.message);

  } finally {

    loginBtn.disabled = false;
    loginBtn.innerText = "Login";

  }

}

async function register() {

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {

    registerBtn.disabled = true;
    registerBtn.innerText = "Creating...";

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    // এখানেই আপনার পরিবর্তনটি করা হয়েছে
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        email: user.email,
        name: "Player",
        deposit: 0,          // wallet সরিয়ে deposit যোগ করা হয়েছে
        winning: 0,          // winning যোগ করা হয়েছে
        matchesPlayed: 0,
        wins: 0,
        referralEarning: 0,
        createdAt: serverTimestamp()
      }
    );

    alert("Account Created Successfully");

    location.href = "app.html";

  } catch (err) {

    alert(err.message);

  } finally {

    registerBtn.disabled = false;
    registerBtn.innerText = "Register";

  }

}

loginBtn?.addEventListener(
  "click",
  login
);

registerBtn?.addEventListener(
  "click",
  register
);
