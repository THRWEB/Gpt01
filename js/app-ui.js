import { auth, isAdmin, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const container =
document.getElementById(
"pageContainer"
);

onAuthStateChanged(
auth,
async(user)=>{

if(!user){

  location.href =
  "login.html";

  return;
}

await loadPage(
  "dashboard"
);

const admin =
await isAdmin(
  user.uid
);

const adminBtn =
document.querySelector(
  '[data-page="admin"]'
);

if(adminBtn){

  adminBtn.style.display =
  admin
  ? "block"
  : "none";

}

}
);

async function loadPage(page){

try{

const res =
await fetch(
  `pages/${page}.html`
);

const html =
await res.text();

container.innerHTML =
html;

const scripts =
container.querySelectorAll(
  "script"
);

scripts.forEach(
  oldScript=>{

    const newScript =
    document.createElement(
      "script"
    );

    newScript.type =
    oldScript.type ||
    "module";

    newScript.textContent =
    oldScript.textContent;

    oldScript.parentNode
    .replaceChild(
      newScript,
      oldScript
    );

  }
);

}

catch(err){

console.error(err);

container.innerHTML = `
  <div class="card">
    Failed To Load Page
  </div>
`;

}

}

document.addEventListener(
"click",
(e)=>{

const btn =
e.target.closest(
  "[data-page]"
);

if(!btn) return;

loadPage(
  btn.dataset.page
);

}
);

window.logout =
async()=>{

await signOut(
auth
);

location.href =
"login.html";

};
