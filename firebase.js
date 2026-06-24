import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBzs07mEGjaGXb-aiGY73aS0jBQcavgx7Q",
  authDomain: "gpt01-fc6ab.firebaseapp.com",
  projectId: "gpt01-fc6ab",
  storageBucket: "gpt01-fc6ab.firebasestorage.app",
  messagingSenderId: "903590395329",
  appId: "1:903590395329:web:aee13172977e3ca143c340",
  measurementId: "G-H0PRVKC18F"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
