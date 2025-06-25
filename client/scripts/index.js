const body = document.getElementById("body");
const userEmailField = document.getElementById("userEmailField");
const userPasswordField = document.getElementById("userPasswordField");
const loginForm = document.getElementById("loginForm");

import { serverURL } from "../helpers/serverURL.js";
// const submitBtn = document.getElementById("submitBtn")

console.log(serverURL);

loginForm.addEventListener("submit", handleSubmitLogin);

async function handleSubmitLogin(e) {
  e.preventDefault();

  sessionStorage.setItem("userEmail", userEmailField.value);
  sessionStorage.setItem("userPassword", userPasswordField.value);

  const URL = `${serverURL}/user/login`;

  const body = JSON.stringify({
    email: sessionStorage.userEmail,
    password: sessionStorage.userPassword,
  });

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const data = await res.json();

  console.log(data);
  if (data.message === "User not found." || data.token === undefined) {
    loginForm.removeEventListener("submit", handleSubmitLogin);
    loginForm.addEventListener("submit", handleSubmitSignUp);

    const signupBtn = document.createElement("button");
    signupBtn.innerText = "Sign Up";
    signupBtn.addEventListener("submit", handleSubmitSignUp);

    loginForm.appendChild(signupBtn);
  } else {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userID", data.user._id);
    createMainPage();
  }
}

async function handleSubmitSignUp(e) {
  e.preventDefault();

  console.log("signing up");
  sessionStorage.setItem("userEmail", userEmailField.value);
  sessionStorage.setItem("userPassword", userPasswordField.value);

  const URL = `${serverURL}/user/signup`;

  const body = JSON.stringify({
    email: sessionStorage.userEmail,
    password: sessionStorage.userPassword,
  });

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const data = await res.json();

  console.log(data);

  if (data.message === "Success! User Created!") {
    sessionStorage.setItem("token", data.token);
    createMainPage();
  }
  //   if (data.message === "User not found.") {
  //     loginForm.removeEventListener("submit",handleSubmitLogin)
  //     loginForm.addEventListener("submit", handleSubmitSignUp)
  //   } else {
  //     createMainPage();
  //   }
}

function createMainPage() {
  body.innerHTML = "";

  const navbar = document.createElement("nav");
  navbar.id = "navbar";

  body.append(navbar);
}

if (
  sessionStorage.userEmail &&
  sessionStorage.userPassword &&
  sessionStorage.token
) {
  createMainPage();

  const header = document.createElement("h1");
  header.id = "header";
  header.innerText = "Daily Health Routine";
  body.append(header);

  const createCardioEntryBtn = document.createElement("button");
  createCardioEntryBtn.innerText = "Create Cardio Entry";
  createCardioEntryBtn.addEventListener("click", createCardioEntry);

  body.append(createCardioEntryBtn);


  //! Cardio CRUD functions
  async function createCardioEntry(e) {
    e.preventDefault();

    const cardioEntryBody = JSON.stringify({
      exerciseName: "exerciseName",
      duration: 12,
      machine: "machine",
      date: "06232025",
      userID: sessionStorage.userID,
    });

    const URL = `${serverURL}/cardio/create`;

    const res = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: cardioEntryBody,
      token: sessionStorage.token,
    });

    const data = await res.json();

    console.log(data);
  }

  async function getCardioEntry(id) {
    const URL = `${serverURL}/cardio/findone${id}`;

    const res = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      token: sessionStorage.token,
    });

    const data = await res.json();
    console.log(data);
    return data;
  }

  async function getCardioEntriesByUserAndDate(userID, date) {
    const URL = `${serverURL}/cardio/find${userID}/${date}`;

    const res = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      token: sessionStorage.token,
    });

    const data = await res.json();
    return data;
  }

  async function updateCardioEntry(updateObject, id) {
    const URL = `${serverURL}/cardio/update${id}`;

    const res = await fetch(URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"updateInfo": updateObject}),
      // token: sessionStorage.token,
    });
    const data = await res.json();
    console.log(data);
  }

  async function deleteCardioEntry(cardioEntryID) {
    const URL = `${serverURL}/cardio/delete${cardioEntryID}`;

    const res = await fetch(URL, {
      method: "DELETE",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      token: sessionStorage.token,
    });
    const data = await res.json();
    console.log(data);
  }

  const updateObject = JSON.stringify({
    exerciseName: "again changedName",
    machine: "newmachine",
    date: "062225"
  });


  /* 
    day, date
    weight

    Food: 
        breakfast: { //collapsable menu
            calories,
            protein,
            salt,
            carbs
        } etc...
        lunch
        dinner
        snacks

        Total calories
        total protein
        total salt
        total carbohydrates

    Exercise: 

    cardio:

    workout
        upper body:
        lower body: 

    
        previous next
    
    */
}
