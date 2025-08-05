const body = document.getElementById("body");
const userEmailField = document.getElementById("userEmailField");
const userPasswordField = document.getElementById("userPasswordField");
const loginForm = document.getElementById("loginForm");

import { serverURL } from "../helpers/serverURL.js";

//! ----------- Global Variables ---------------

let today = new Date();
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

let allUserMeals = [];
let mealsByDay = [];

const calorieLimits = {
  "6_2": {
    260: {
      maintain: 2554,
      losehalf: 2304,
      loseone: 2054,
      losetwo: 1554
    },
    250: {
      maintain: 2494,
      losehalf: 2244,
      loseone: 1994,
      losetwo: 1494
    },
    240: {
      maintain: 2440,
      losehalf: 2190,
      loseone: 1940,
      losetwo: 1440
    },
    230: {
      maintain: 2386,
      losehalf: 2136,
      loseone: 1886,
      losetwo: 1386
    },
    220: {
      maintain: 2331,
      losehalf: 2081,
      loseone: 1831,
      losetwo: 1331
    },
    210: {
      maintain: 2277,
      losehalf: 2027,
      loseone: 1777,
      losetwo: 1277
    },
    200: {
      maintain: 2222,
      losehalf: 1972,
      loseone: 1722,
      losetwo: 1222
    },
    190: {
      maintain: 2168,
      losehalf: 1918,
      loseone: 1668,
      losetwo: 1168
    },
    180: {
      maintain: 2113,
      losehalf: 1863,
      loseone: 1613,
      losetwo: 1113
    }
  }
}

//! Page Contruction Functions
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

    getAllUserMeals();

    //? build function calls
    buildCardioWindow();
    buildWorkoutWindow();
    buildMealsWindow();
    // buildRoutinesWindow()
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
async function handleSubmitLogin(e) {
  e.preventDefault();
  const URL = `${serverURL}/user/login`;

  console.log(URL)
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

function toggleMealsSectionMenu() {
  if (!mealsSection.style.minHeight) {
    mealsSection.style.maxHeight = null;
    // mealsSection.style.minHeight = "30vh";
    mealsSection.style.height = "fit-content";
  } else {
    // mealsSection.style.minHeight = null;
    // mealsSection.style.maxHeight = 0;
  }
}


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



async function handleMealsInputChange() {
  console.log(allUserMeals);
  console.log(mealsNameInput.value);

  for (let i = 0; i < allUserMeals.length; i++) {
    if (allUserMeals[i] === mealsNameInput.value) {
      console.log("match");
      const mealData = await findMealEntryByMealNameAndUserID(
        mealsNameInput.value
      );
      // console.log("mealData: ", mealData);
      const mealInfo = mealData.getAllMeals;
      if (!document.getElementById("mealsIngredientsSection")) {
        openMealsIngredientsInputDropdownSection();
      }

      document.getElementById("mealTimeInput").value = mealInfo.mealTime;
      document.getElementById("caloriesInput").value = mealInfo.calories;
      document.getElementById("proteinInput").value = mealInfo.protein;
      document.getElementById("sugarsInput").value = mealInfo.sugars;
    } else {
      console.log(mealsNameInput.value);

      //fetch the meal matching meal name and person id. Then update ingredient fields
    }
  }
  getAllUserMeals();
      // buildMealsWindow();

}

async function handleMealsInputClick(e) {
  if (e.key !== "Enter") {
    return;
  }
  const mealsNameInput = document.getElementById("mealsNameInput").value;

  const mealTimeInput = document.getElementById("mealTimeInput").value;

  const caloriesInput = document.getElementById("caloriesInput").value;

  const proteinInput = document.getElementById("proteinInput").value;

  const sugarsInput = document.getElementById("sugarsInput").value;

  for (let i = 0; i < allUserMeals.length; i++) {
    if (allUserMeals[i] === document.getElementById("mealsNameInput").value) {
      console.log("match");
      const updateConfirmationLine = document.createElement("div");
      updateConfirmationLine.id = "mealUpdateConfirmationLine";
      updateConfirmationLine.innerText =
        "Do you want to update the existing entry?";
      const yesBtn = document.createElement("button");
      yesBtn.innerText = "Yes";
      const noBtn = document.createElement("button");
      noBtn.innerText = "No";
      yesBtn.addEventListener("click", () => {
        updateMealsEntry({
          mealName: mealsNameInput,
          mealTime: mealTimeInput,
          calories: caloriesInput,
          protein: proteinInput,
          sugars: sugarsInput,
          userID: sessionStorage.userID,
          date: focusedDate,
        });
      });
      noBtn.addEventListener("click", () => {
        updateConfirmationLine.remove();
      });
      updateConfirmationLine.append(yesBtn, noBtn);
      if (!document.getElementById("mealUpdateConfirmationLine")) {
        mealsSection.append(updateConfirmationLine);
        // yesBtn.focus()
      }
      return;
    }
  }

  // console.log("clicked", mealsName, mealsCalories, mealsLength);

  if (
    mealsNameInput &&
    mealTimeInput &&
    caloriesInput &&
    proteinInput &&
    sugarsInput
  ) {
    // console.log("new meals: ", mealsName, mealsCalories, mealsLength);
    await createMealsEntry(
      mealsNameInput,
      mealTimeInput,
      caloriesInput,
      proteinInput,
      sugarsInput
    );

    await createDataObject(sessionStorage.userID, focusedDate);
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
    console.log("new cardio:", cardioName, cardioMachine, cardioLength);
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
    console.log("new workout: ", workoutName, workoutMachine, workoutLength);
    await createWorkoutEntry(workoutName, workoutMachine, workoutLength);

    await createDataObject(sessionStorage.userID, focusedDate);
  }
}

//! Remaining Cardio CRUD functions



// unused
async function getCardioEntry(id) {
  const URL = `${serverURL}/cardio/findone${id}`;

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
}


const cardioUpdateObject = JSON.stringify({
  exerciseName: "again changedName",
  machine: "newmachine",
  date: focusedDate,
});
//!

//! Remaining Workout CRUD functions


// unused
async function getWorkoutEntry(id) {
  const URL = `${serverURL}/workout/findone${id}`;

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
}


// unused
async function updateWorkoutEntry(workoutUpdateObject, id) {
  const URL = `${serverURL}/workout/update${id}`;

  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateInfo: workoutUpdateObject,
          authorization: sessionStorage.token
     }),
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

//! Remaining Meals CRUD functions

async function getMealsEntry(id) {
  const URL = `${serverURL}/meals/findone${id}`;

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
}

// unused
async function updateMealsEntryByID(mealsUpdateObject, id) {
  const URL = `${serverURL}/meals/update${id}`;

  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateInfo: mealsUpdateObject,
      "authorization": sessionStorage.token
     }),
    
  });
  const data = await res.json();
  console.log(data);
}


const mealsUpdateObject = JSON.stringify({
  breakfast: { name: "changedName" },
});
//!



async function createDataObject(userID, date) {
  // console.log("creating data object");
  let dataObject = {};

  const workoutData = await getWorkoutEntriesByUserAndDate(userID, date);
  const workoutArray = await workoutData.getWorkoutRecords;

  const cardioData = await getCardioEntriesByUserAndDate(userID, date);
  const cardioArray = await cardioData.getCardioRecords;

  const mealsData = await getMealsEntriesByUserAndDate(userID, date);
  const mealsDataArray = await mealsData.getMealsRecords;

  dataObject.workout = workoutArray;
  dataObject.cardio = cardioArray;
  dataObject.meals = mealsDataArray;

  fillMenuContents(dataObject);
}

async function fillMenuContents(object) {
  mealsByDay = [];

  await updatemealsByDay();

  //! Routines
  // buildRoutinesContents(object.routines)
  //! Workout
  buildWorkoutContents(object.workout);

  //! Cardio
  buildCardioContents(object.cardio);
  //! Meals
  buildMealsContents(object.meals);
  const createMealBtn = document.createElement("button");
  createMealBtn.id = "createMealBtn";
  createMealBtn.textContent = "create meal";
  if (!document.getElementById("createMealBtn")) {
    document.getElementById("navbar").after(createMealBtn);
  }

  createMealBtn.addEventListener("click", () => {
    const mealTime = "Breakfast";
    const calories = "200";
    const protein = 20;
    const sugars = 20;
    const mealName = "Testname";
    createMealsEntry(mealName, mealTime, calories, protein, sugars);
  });
}

//! Begin
loginForm.addEventListener("submit", handleSubmitLogin);

createMainPage();
