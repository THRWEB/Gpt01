import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const container = document.getElementById("pageContainer");

onAuthStateChanged(auth,(user)=>{

  if(!user){
    location.href="login.html";
    return;
  }

  loadPage("dashboard");

});

async function loadPage(page){

  const res = await fetch(
    `pages/${page}.html`
  );

  const html = await res.text();

  container.innerHTML = html;

}

document.addEventListener("click",(e)=>{

  const btn = e.target.closest("[data-page]");

  if(!btn) return;

  loadPage(btn.dataset.page);

});

window.logout = async()=>{

  await signOut(auth);

  location.href="login.html";

};
