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

    const prevWeekBtn = document.createElement("button");
    prevWeekBtn.id = "prevWeekBtn";
    prevWeekBtn.innerText = "| <";
    prevWeekBtn.addEventListener("click", prevWeek);

    const nextWeekBtn = document.createElement("button");
    nextWeekBtn.id = "nextWeekBtn";
    nextWeekBtn.innerText = "> |";
    nextWeekBtn.addEventListener("click", nextWeek);

    const prev = document.createElement("span");
    prev.append(prevWeekBtn, prevDateBtn);

    const next = document.createElement("span");
    next.append(nextDateBtn, nextWeekBtn);
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
      dateOffset -= 7;
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
      dateOffset += 7;
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
  // console.log(cardioObject);
  cardioSection.innerHTML = "";
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

  //---------------------------
  const cardioInputRow = document.createElement("tr");

  const cardioInputBtn = document.createElement("td");
  cardioInputBtn.id = "cardioInputBtn";
  cardioInputBtn.innerText = "+";
  cardioInputBtn.addEventListener("click", handleCardioInputClick);

  const cardioNameInputLocation = document.createElement("td");
  cardioNameInputLocation.id = "cardioNameInputLocation";
  cardioNameInputLocation.name = "cardioNameInputLocation";
  const cardioNameInput = document.createElement("input");
  cardioNameInput.id = "cardioNameInput";
  cardioNameInput.spellcheck = "false";
  cardioNameInputLocation.appendChild(cardioNameInput);
  cardioNameInput.addEventListener("keydown", handleCardioInputClick);

  const cardioMachineInputLocation = document.createElement("td");
  cardioMachineInputLocation.id = "cardioMachineInputLocation";
  cardioMachineInputLocation.name = "cardioMachineInputLocation";
  const cardioMachineInput = document.createElement("input");
  cardioMachineInput.id = "cardioMachineInput";
  cardioMachineInput.spellcheck = "false";
  cardioMachineInput.addEventListener("keydown", handleCardioInputClick);
  cardioMachineInputLocation.appendChild(cardioMachineInput);

  const cardioLengthInputLocation = document.createElement("td");
  cardioLengthInputLocation.id = "cardioLengthInputLocation";
  cardioLengthInputLocation.name = "cardioLengthInputLocation";
  const cardioLengthInput = document.createElement("input");
  cardioLengthInput.id = "cardioLengthInput";
  cardioLengthInput.spellcheck = "false";
  cardioLengthInput.type = "number";
  cardioLengthInput.min = "0";
  cardioLengthInput.addEventListener("keydown", handleCardioInputClick);

  cardioLengthInputLocation.appendChild(cardioLengthInput);

  cardioInputRow.append(
    cardioInputBtn,
    cardioNameInputLocation,
    cardioMachineInputLocation,
    cardioLengthInputLocation
  );

  cardioTable.append(cardioRow, cardioInputRow);

  cardioSection.append(cardioTable);
  //-------------------------------
  if (cardioObject) {
    for (let i = 0; i < cardioObject.length; i++) {
      let year = Number(cardioObject[i].date.slice(4));
      const date = Number(cardioObject[i].date.slice(2, 4));

      const month = Number(cardioObject[i].date.slice(0, 2));
      const dateText = `${month}/${date}/${year}`;
      const nameText = cardioObject[i].exerciseName;
      const machineText = cardioObject[i].machine;
      const lengthText = `${cardioObject[i].duration}min`;

      const cardioRow = document.createElement("tr");
      cardioRow.className = "cardioRows";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "cardioCheckboxes";
      checkBox.id = `cardioCheckbox${i}`;

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

function buildWorkoutContents(workoutObject) {
  // console.log("bird")
  workoutSection.innerHTML = "";
  const workoutTable = document.createElement("table");

  const workoutRow = document.createElement("tr");

  const workoutCheckHeader = document.createElement("th");
  workoutCheckHeader.innerText = "Select";
  workoutCheckHeader.className = "workoutHeaders";

  const workoutDateHeader = document.createElement("th");
  workoutDateHeader.innerText = "Date";
  workoutDateHeader.className = "workoutHeaders";

  const workoutNameHeader = document.createElement("th");
  workoutNameHeader.innerText = "Name";
  workoutNameHeader.className = "workoutHeaders";

  const workoutMachineHeader = document.createElement("th");
  workoutMachineHeader.innerText = "Machine";
  workoutMachineHeader.className = "workoutHeaders";

  const workoutLengthHeader = document.createElement("th");
  workoutLengthHeader.innerText = "Length";
  workoutLengthHeader.className = "workoutHeaders";

  workoutRow.append(
    workoutCheckHeader,
    // workoutDateHeader,
    workoutNameHeader,
    workoutMachineHeader,
    workoutLengthHeader
  );
  //---------------------------
  const workoutInputRow = document.createElement("tr");

  const workoutInputBtn = document.createElement("td");
  workoutInputBtn.id = "workoutInputBtn";
  workoutInputBtn.innerText = "+";

  const workoutNameInputLocation = document.createElement("td");
  workoutNameInputLocation.id = "workoutNameInputLocation";
  workoutNameInputLocation.name = "workoutNameInputLocation";
  const workoutNameInput = document.createElement("input");
  workoutNameInput.id = "workoutNameInput";
  workoutNameInput.spellcheck = "false";
  workoutNameInput.addEventListener("keydown", handleWorkoutInputClick);
  workoutNameInputLocation.appendChild(workoutNameInput);

  const workoutMachineInputLocation = document.createElement("td");
  workoutMachineInputLocation.id = "workoutMachineInputLocation";
  workoutMachineInputLocation.name = "workoutMachineInputLocation";
  const workoutMachineInput = document.createElement("input");
  workoutMachineInput.id = `workoutMachineInput`;
  workoutMachineInput.spellcheck = "false";
  workoutMachineInput.addEventListener("keydown", handleWorkoutInputClick);
  workoutMachineInputLocation.appendChild(workoutMachineInput);

  const workoutLengthInputLocation = document.createElement("td");
  workoutLengthInputLocation.id = "workoutLengthInputLocation";
  workoutLengthInputLocation.name = "workoutLengthInputLocation";
  const workoutLengthInput = document.createElement("input");
  workoutLengthInput.id = "workoutLengthInput";
  workoutLengthInput.spellcheck = "false";
  workoutLengthInput.addEventListener("keypress", handleWorkoutInputClick);
  workoutLengthInputLocation.appendChild(workoutLengthInput);

  workoutInputRow.append(
    workoutInputBtn,
    workoutNameInputLocation,
    workoutMachineInputLocation,
    workoutLengthInputLocation
  );
  //------------------------
  workoutTable.append(workoutRow, workoutInputRow);

  workoutSection.append(workoutTable);

  if (workoutObject) {
    //-------------------------------
    for (let i = 0; i < workoutObject.length; i++) {
      let year = Number(workoutObject[i].dateCreated.slice(4));
      const date = Number(workoutObject[i].dateCreated.slice(2, 4));

      const month = Number(workoutObject[i].dateCreated.slice(0, 2));
      const dateText = `${month}/${date}/${year}`;
      const nameText = workoutObject[i].exerciseName;
      const machineText = workoutObject[i].machine;
      const lengthText = `${workoutObject[i].duration}min`;

      const workoutRow = document.createElement("tr");
      workoutRow.className = "workoutRows";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "workoutCheckboxes";
      checkBox.id = `workoutCheckbox${i}`;

      const workoutDate = document.createElement("td");
      workoutDate.innerText = dateText;
      workoutDate.className = "workoutDates";

      const workoutName = document.createElement("td");
      workoutName.innerText = nameText;
      workoutName.className = "workoutNames";

      const workoutMachine = document.createElement("td");
      workoutMachine.innerText = machineText;
      workoutMachine.className = "workoutMachines";

      const workoutLength = document.createElement("td");
      workoutLength.innerText = lengthText;
      workoutLength.className = "workoutLengths";
      workoutRow.append(
        checkBox,
        // workoutDate,
        workoutName,
        workoutMachine,
        workoutLength
      );
      workoutTable.append(workoutRow);
    }
  }
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
  if (!cardioSection.style.minHeight) {
    cardioSection.style.maxHeight = null;
    cardioSection.style.minHeight = "30vh";
    cardioSection.style.height = "fit-content";
  } else {
    cardioSection.style.minHeight = null;
    cardioSection.style.maxHeight = 0;
  }
}

function toggleWorkoutSectionMenu() {
  if (!workoutSection.style.minHeight) {
    workoutSection.style.maxHeight = null;
    workoutSection.style.minHeight = "30vh";
    workoutSection.style.height = "fit-content";
  } else {
    workoutSection.style.minHeight = null;
    workoutSection.style.maxHeight = 0;
  }
}

async function handleCardioInputClick(e) {
  // console.log(e.key)
  if (e.key !== "Enter") {
    return;
  }

  const cardioName = document.getElementById("cardioNameInput").value;

  const cardioMachine = document.getElementById("cardioMachineInput").value;

  const cardioLength = document.getElementById("cardioLengthInput").value;

  // console.log("clicked", cardioName, cardioMachine, cardioLength);

  if (cardioName && cardioMachine && cardioLength) {
    console.log("new cardio:",cardioName, cardioMachine, cardioLength)
    await createCardioEntry(cardioName, cardioMachine, cardioLength);
    await createDataObject(sessionStorage.userID, focusedDate);
  }
}

async function handleWorkoutInputClick(e) {
  // console.log(e.key)
  if (e.key !== "Enter") {
    return;
  }

  const workoutName = document.getElementById("workoutNameInput").value;

  const workoutMachine = document.getElementById("workoutMachineInput").value;

  const workoutLength = document.getElementById("workoutLengthInput").value;

  // console.log("clicked", workoutName, workoutMachine, workoutLength);

  if (workoutName && workoutMachine && workoutLength) {
    console.log("new workout: ",workoutName, workoutMachine, workoutLength)
    await createWorkoutEntry(workoutName, workoutMachine, workoutLength);

    await createDataObject(sessionStorage.userID, focusedDate);
    
  }
}

//! Cardio CRUD functions
async function createCardioEntry(exerciseName, machine, duration) {
  // e.preventDefault();

  const cardioEntryBody = JSON.stringify({
    exerciseName: exerciseName,
    duration: duration,
    machine: machine,
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

  // console.log(data);
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
    // console.log("Is there any Cardio data?", console.log(data.message));
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
async function createWorkoutEntry(workoutName, machine, duration) {
  const workoutEntryBody = JSON.stringify({
    exerciseName: workoutName,
    duration: duration,
    machine: machine,
    // exerciseType: "default",
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

  // console.log(data);
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
    console.log("Is there any Workout data?", data.message);
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
async function createMealsEntry(
  breakfastObject,
  lunchObject,
  dinnerObject,
  snackObject
) {
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
    console.log("Meals Records: ", data);
    console.log(data);
  } else {
    console.log("Is there any Meals data?");
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
    // console.log("Is there any Meals data?", console.log(data.message));
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
  console.log("creating data object");
  let dataObject = {
    workout: { data: [] },
    cardio: { data: [] },
    meals: { data: [] },
    user: { data: [] },
  };

  console.log("fetching workout data...");
  const workoutData = await getWorkoutEntriesByUserAndDate(userID, date);
  const workoutArray = await workoutData.getWorkoutRecords;
  console.log("workoutArray: ", workoutArray);

  console.log("fetching cardio data...");
  const cardioData = await getCardioEntriesByUserAndDate(userID, date);
  const cardioArray = await cardioData.getCardioRecords;

  console.log("cardioArray: ", cardioArray);
  const mealsData = await getMealsEntriesByUserAndDate(userID, date);
  const mealsDataArray = await mealsData.getMealsRecords;

  dataObject.workout = workoutArray;
  dataObject.cardio = cardioArray;
  dataObject.meals = mealsDataArray;

  // console.log(dataObject)

  fillMenuContents(dataObject);
}

function fillMenuContents(object) {
  console.log(object);

  //! Workout
  buildWorkoutContents(object.workout);

  //! Cardio
  buildCardioContents(object.cardio);
  //! Meals
  if (object.meals) {
    // buildMealsContents(object.meals)

    for (let i = 0; i < object.meals.length; i++) {
      // console.log(object.meals[i])
    }
  } else {
    //todo    console.log("clear meals section content here");
  }
}
