const body = document.getElementById("body");
const userEmailField = document.getElementById("userEmailField");
const userPasswordField = document.getElementById("userPasswordField");
const loginForm = document.getElementById("loginForm");

import { serverURL } from "../helpers/serverURL.js";

//! ----------- Global Variables ---------------

let today = new Date();
// console.log("today: ", today);
let dateOffset = 0;

let month = (today.getMonth() + 1).toString();
let adjustedMonth = +month;

if (month.length < 2) {
  month = month.padStart(2, "0");
}

let date = today.getDate().toString();
if (date.length < 2) {
  date = date.padStart(2, "0");
}

let dateDisplayInfo = `${adjustedMonth}/${today.getDate()}/${today.getFullYear()}`;

let focusedDate = `${month}${date}${today.getFullYear()}`;

loginForm.addEventListener("submit", handleSubmitLogin);

async function handleSubmitLogin(e) {
  e.preventDefault();

  const URL = `${serverURL}/user/login`;

  const body = JSON.stringify({
    email: userEmailField.value,
    password: userPasswordField.value,
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
    console.log("creating main page...");

    createMainPage();
  }
}

async function handleSubmitSignUp(e) {
  e.preventDefault();

  console.log("signing up");

  const URL = `${serverURL}/user/signup`;

  const body = JSON.stringify({
    email: userEmailField.value,
    password: userPasswordField.value,
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
  if (sessionStorage.userID && sessionStorage.token) {
    body.innerHTML = "";

    const navbar = document.createElement("nav");
    navbar.id = "navbar";

    body.append(navbar);

    const header = document.createElement("h1");
    header.id = "header";
    header.innerText = "Daily Health Routine";
    body.append(header);

    const prevNextSection = document.createElement("div");
    prevNextSection.id = "prevNextSection";

    const prevDateBtn = document.createElement("button");
    prevDateBtn.id = "prevDateBtn";
    prevDateBtn.innerText = "<<";
    prevDateBtn.addEventListener("click", prevDate);

    const dateDisplay = document.createElement("span");
    dateDisplay.id = "dateDisplay";
    dateDisplay.innerText = "Date";

    const nextDateBtn = document.createElement("button");
    nextDateBtn.id = "nextDateBtn";
    nextDateBtn.innerText = ">>";

    const prevWeekBtn = document.createElement("button")
    prevWeekBtn.id = "prevWeekBtn"
    prevWeekBtn.innerText = "| <"
    prevWeekBtn.addEventListener("click", prevWeek)

    const nextWeekBtn = document.createElement("button")
    nextWeekBtn.id = "nextWeekBtn"
    nextWeekBtn.innerText = "> |"
    nextWeekBtn.addEventListener("click", nextWeek)

    const prev = document.createElement("span")
    prev.append(prevWeekBtn, prevDateBtn)

    const next = document.createElement("span")
    next.append(nextDateBtn,nextWeekBtn)
    prevNextSection.append(prev, dateDisplay, next);
    nextDateBtn.addEventListener("click", nextDate);


    dateDisplay.innerText = dateDisplayInfo;

    function prevDate() {
      dateOffset--;
      let adjustedDate = new Date(today);
      adjustedDate.setDate(today.getDate() + dateOffset);

      let month = (adjustedDate.getMonth() + 1).toString();
      let adjustedMonth = +month;

      if (month.length < 2) {
        month = month.padStart(2, "0");
      }

      let date = adjustedDate.getDate().toString();
      if (date.length < 2) {
        date = date.padStart(2, "0");
      }

      let dateDisplayInfo = `${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

      focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(sessionStorage.userID, focusedDate);
    }

    function nextDate() {
      dateOffset++;
      let adjustedDate = new Date(today);
      adjustedDate.setDate(today.getDate() + dateOffset);

      let month = (adjustedDate.getMonth() + 1).toString();
      let adjustedMonth = +month;

      if (month.length < 2) {
        month = month.padStart(2, "0");
      }

      let date = adjustedDate.getDate().toString();
      if (date.length < 2) {
        date = date.padStart(2, "0");
      }

      let dateDisplayInfo = `${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

      focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(sessionStorage.userID, focusedDate);
    }

        function prevWeek() {
      dateOffset-=7;
      let adjustedDate = new Date(today);
      adjustedDate.setDate(today.getDate() + dateOffset);

      let month = (adjustedDate.getMonth() + 1).toString();
      let adjustedMonth = +month;

      if (month.length < 2) {
        month = month.padStart(2, "0");
      }

      let date = adjustedDate.getDate().toString();
      if (date.length < 2) {
        date = date.padStart(2, "0");
      }

      let dateDisplayInfo = `${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

      focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(sessionStorage.userID, focusedDate);
    }

    function nextWeek() {
      dateOffset+=7;
      let adjustedDate = new Date(today);
      adjustedDate.setDate(today.getDate() + dateOffset);

      let month = (adjustedDate.getMonth() + 1).toString();
      let adjustedMonth = +month;

      if (month.length < 2) {
        month = month.padStart(2, "0");
      }

      let date = adjustedDate.getDate().toString();
      if (date.length < 2) {
        date = date.padStart(2, "0");
      }

      let dateDisplayInfo = `${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

      focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(sessionStorage.userID, focusedDate);
    }

    header.after(prevNextSection);

    createDataObject(sessionStorage.userID, focusedDate);

    findAllMealsEntries();

    //? build function calls
    buildCardioWindow();
    buildWorkoutWindow();
  }
}
createMainPage();

//! Page Contruction Functions

function buildCardioWindow() {
  const cardioSectionTop = document.createElement("div");
  cardioSectionTop.id = "cardioSectionTop";
  cardioSectionTop.addEventListener("click", toggleCardioSectionMenu);

  const cardioTitle = document.createElement("div");
  cardioTitle.innerText = "Cardio";
  cardioTitle.id = "cardioTitle";

  const cardioSectionBtn = document.createElement("span");
  cardioSectionBtn.innerText = "+";
  cardioSectionBtn.id = "cardioSectionBtn";

  const cardioSection = document.createElement("div");
  cardioSection.id = "cardioSection";

  cardioSectionTop.append(cardioTitle);

  prevNextSection.after(cardioSectionTop);
  cardioSectionTop.after(cardioSection);
}

function buildCardioContents(cardioObject) {
  console.log(cardioObject)
  cardioSection.innerHTML = ""
  const cardioTable = document.createElement("table");

  const cardioRow = document.createElement("tr");

  const cardioCheckHeader = document.createElement("th");
  cardioCheckHeader.innerText = "Select";
  cardioCheckHeader.className = "cardioHeaders";

  const cardioDateHeader = document.createElement("th");
  cardioDateHeader.innerText = "Date";
  cardioDateHeader.className = "cardioHeaders";

  const cardioNameHeader = document.createElement("th");
  cardioNameHeader.innerText = "Name";
  cardioNameHeader.className = "cardioHeaders";

  const cardioMachineHeader = document.createElement("th");
  cardioMachineHeader.innerText = "Machine";
  cardioMachineHeader.className = "cardioHeaders";

  const cardioLengthHeader = document.createElement("th");
  cardioLengthHeader.innerText = "Length";
  cardioLengthHeader.className = "cardioHeaders";

  cardioRow.append(
    cardioCheckHeader,
    // cardioDateHeader,
    cardioNameHeader,
    cardioMachineHeader,
    cardioLengthHeader
  );

  cardioTable.append(cardioRow);

  cardioSection.append(cardioTable);
  //-------------------------------
  for (let i = 0; i < cardioObject.length; i++) {
    let year = Number(cardioObject[i].date.slice(4))
    const date = Number(cardioObject[i].date.slice(2, 4))

    const month = Number(cardioObject[i].date.slice(0,2))
    const dateText = `${month}/${date}/${year}`;
    const nameText = cardioObject[i].exerciseName;
    const machineText = cardioObject[i].machine;
    const lengthText = `${cardioObject[i].duration}min`;

    const cardioRow = document.createElement("tr");
    cardioRow.className = "cardioRows";

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "cardioCheckboxes";

    const cardioDate = document.createElement("td");
    cardioDate.innerText = dateText;
    cardioDate.className = "cardioDates";

    const cardioName = document.createElement("td");
    cardioName.innerText = nameText;
    cardioName.className = "cardioNames";

    const cardioMachine = document.createElement("td");
    cardioMachine.innerText = machineText;
    cardioMachine.className = "cardioMachines";

    const cardioLength = document.createElement("td");
    cardioLength.innerText = lengthText;
    cardioLength.className = "cardioLengths";
    cardioRow.append(
      checkBox,
      // cardioDate,
      cardioName,
      cardioMachine,
      cardioLength
    );
    cardioTable.append(cardioRow);
  }
}

function buildWorkoutWindow() {
  const workoutSectionTop = document.createElement("div");
  workoutSectionTop.id = "workoutSectionTop";
  workoutSectionTop.addEventListener("click", toggleWorkoutSectionMenu);

  const workoutTitle = document.createElement("div");
  workoutTitle.innerText = "Workout";
  workoutTitle.id = "workoutTitle";

  const workoutSectionBtn = document.createElement("span");
  workoutSectionBtn.innerText = "+";
  workoutSectionBtn.id = "workoutSectionBtn";

  const workoutSection = document.createElement("div");
  workoutSection.id = "workoutSection";

  workoutSectionTop.append(workoutTitle);

  prevNextSection.after(workoutSectionTop);
  workoutSectionTop.after(workoutSection);
  // buildWorkoutContents();
}
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

//! Callback Functions
function toggleCardioSectionMenu() {
  if (!cardioSection.style.height) {
    cardioSection.style.height = "40vh";
    // cardioSectionBtn.style.transform = "rotate(45deg)";
  } else {
    cardioSection.style.height = null;
    // cardioSectionBtn.style = null;
  }
}

function toggleWorkoutSectionMenu() {
  if (!workoutSection.style.height) {
    workoutSection.style.height = "40vh";
    // cardioSectionBtn.style.transform = "rotate(45deg)";
  } else {
    workoutSection.style.height = null;
    // cardioSectionBtn.style = null;
  }
}

//! Cardio CRUD functions
async function createCardioEntry(e) {
  // e.preventDefault();

  const cardioEntryBody = JSON.stringify({
    exerciseName: "exerciseName",
    duration: 12,
    machine: "machine",
    date: focusedDate,
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

    if (data.message != "No Records Found.") {
    // console.log("Cardio Records: ",data);
  } else {
    console.log("Is there any Cardio data?",console.log(data.message))
  }
  return data;
}

async function updateCardioEntry(cardioUpdateObject, id) {
  const URL = `${serverURL}/cardio/update${id}`;

  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateInfo: cardioUpdateObject }),
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

const cardioUpdateObject = JSON.stringify({
  exerciseName: "again changedName",
  machine: "newmachine",
  date: focusedDate,
});
//!

//! Workout CRUD functions
async function createWorkoutEntry(workoutName, exerciseType, duration, machine) {

  const workoutEntryBody = JSON.stringify({
    exerciseName: "workoutName",
    exerciseType: "upperbody",
    duration: 12,
    machine: "machine",
    dateCreated: focusedDate,
    userID: sessionStorage.userID,
  });

  const URL = `${serverURL}/workout/create`;

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: workoutEntryBody,
    token: sessionStorage.token,
  });

  const data = await res.json();

  console.log(data);
}

async function getWorkoutEntry(id) {
  const URL = `${serverURL}/workout/findone${id}`;

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

async function getWorkoutEntriesByUserAndDate(userID, date) {

  // console.log(userID, date)
  const URL = `${serverURL}/workout/find${userID}/${date}`;

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    token: sessionStorage.token,
  });

  const data = await res.json();

  if (data.message != "No Records Found.") {
    // console.log("Workout Records: ",data);
  } else {
    console.log("Is there any Workout data?",data.message)
  }
  return data;
}

async function updateWorkoutEntry(workoutUpdateObject, id) {
  const URL = `${serverURL}/workout/update${id}`;

  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateInfo: workoutUpdateObject }),
    // token: sessionStorage.token,
  });
  const data = await res.json();
  console.log(data);
}

async function deleteWorkoutEntry(workoutEntryID) {
  const URL = `${serverURL}/workout/delete${workoutEntryID}`;

  const res = await fetch(URL, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    token: sessionStorage.token,
  });
  const data = await res.json();
  console.log(data);
}

const workoutUpdateObject = JSON.stringify({
  exerciseName: "again changedName",
  machine: "newmachine",
  date: focusedDate,
});
//!

//! Meals CRUD functions
async function createMealsEntry(breakfastObject, lunchObject, dinnerObject, snackObject) {

  const mealsEntryBody = JSON.stringify({
    breakfast: { name: "breakfast Name" },
    lunch: { name: "lunch Name" },
    dinner: { name: "dinner Name" },
    snack: { name: "snack" },
    userID: sessionStorage.userID,
    date: focusedDate,
  });

  const URL = `${serverURL}/meals/create`;

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: mealsEntryBody,
    token: sessionStorage.token,
  });

  const data = await res.json();
  if (data.message != "No Records Found.") {
    console.log("Meals Records: ",data);
      console.log(data);

  } else {
    console.log("Is there any Meals data?")
  }
}

async function getMealsEntry(id) {
  const URL = `${serverURL}/meals/findone${id}`;

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

async function getMealsEntriesByUserAndDate(userID, date) {
  const URL = `${serverURL}/meals/find${userID}/${date}`;

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    token: sessionStorage.token,
  });

  const data = await res.json();
  // console.log(data);

      if (data.message != "No Records Found.") {
    // console.log("Meals Records: ",data);
  } else {
    console.log("Is there any Meals data?",console.log(data.message))
  }

  return data;
}

async function updateMealsEntry(mealsUpdateObject, id) {
  const URL = `${serverURL}/meals/update${id}`;

  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateInfo: mealsUpdateObject }),
    // token: sessionStorage.token,
  });
  const data = await res.json();
  console.log(data);
}

async function deleteMealsEntry(mealsEntryID) {
  const URL = `${serverURL}/meals/delete${mealsEntryID}`;

  const res = await fetch(URL, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    token: sessionStorage.token,
  });
  const data = await res.json();
  console.log(data);
}

async function findAllMealsEntries() {
  const URL = `${serverURL}/meals/findall${sessionStorage.userID}`;

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    token: sessionStorage.token,
  });

  const data = await res.json();

  // console.log(data);
}

const mealsUpdateObject = JSON.stringify({
  breakfast: { name: "changedName" },
});
//!

async function createDataObject(userID, date) {
let dataObject = {
  workout: {data: []},
  cardio: {data: []},
  meals: {data: []},
  user: {data: []},
};
  const workoutData = await getWorkoutEntriesByUserAndDate(userID, date)
  const workoutArray = workoutData.getWorkoutRecords


  const cardioData = await getCardioEntriesByUserAndDate(userID, date)
  const cardioArray = cardioData.getCardioRecords


  const mealsData = await getMealsEntriesByUserAndDate(userID, date)
  const mealsDataArray = mealsData.getMealsRecords

  dataObject.workout = workoutArray
  dataObject.cardio = cardioArray
  dataObject.meals = mealsDataArray

  fillMenuContents(dataObject)
}

function fillMenuContents(object) {
  console.log(object)

  //! Workout
  if (object.workout) {

  for (let i = 0; i < object.workout.length; i++) {
    // console.log(object.workout[i])

    // const titleSection = 

  }
  } else {
    workoutSection.innerHTML = ""
  }

  //! Cardio
  if (object.cardio) {

  
  // for (let i = 0; i < object.cardio.length; i++) {
  //   console.log(object.cardio[i])
  // }
  buildCardioContents(object.cardio)
} else {
  cardioSection.innerHTML = ""
}
  //! Meals
  if (object.meals) {


  for (let i = 0; i < object.meals.length; i++) {
    // console.log(object.meals[i])
  }
  } else {
    console.log('clear meals section content here')
  }
}

// createDataObject(sessionStorage.userID, focusedDate)

const createcardiobtn = document.createElement("button");
createcardiobtn.innerText = "cardio";
createcardiobtn.addEventListener("click", createCardioEntry);
const createmealsbtn = document.createElement("button");
createmealsbtn.innerText = "meal";
createmealsbtn.addEventListener("click", createMealsEntry);
const createworkoutbtn = document.createElement("button");
createworkoutbtn.innerText = "workout";
createworkoutbtn.addEventListener("click", createWorkoutEntry);

body.append(createcardiobtn, createmealsbtn, createworkoutbtn);
// createCardioEntry()
// createMealsEntry()
// createWorkoutEntry()
