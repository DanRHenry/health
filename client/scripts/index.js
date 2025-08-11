const body = document.getElementById("body");
const userEmailField = document.getElementById("userEmailField");
const userPasswordField = document.getElementById("userPasswordField");
const loginForm = document.getElementById("loginForm");

import { serverURL } from "../helpers/serverURL.js";
import { handleSubmitLogin } from "./components/users/handleSubmitLogin.js";
import { getAllUserMeals } from "./components/meals/crud_functions/getAllUserMeals.js";

import { buildCardioWindow } from "./components/cardio/buildCardioWindow.js";

import { buildWorkoutWindow } from "./components/workout/buildWorkoutWindow.js";
import { buildMealsWindow } from "./components/meals/buildMealsWindow.js";
import { createDataObject } from "./components/createDataObject.js";

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

const calorieLimits = {
  "6_2": {
    260: {
      maintain: 2554,
      losehalf: 2304,
      loseone: 2054,
      losetwo: 1554,
    },
    250: {
      maintain: 2494,
      losehalf: 2244,
      loseone: 1994,
      losetwo: 1494,
    },
    240: {
      maintain: 2440,
      losehalf: 2190,
      loseone: 1940,
      losetwo: 1440,
    },
    230: {
      maintain: 2386,
      losehalf: 2136,
      loseone: 1886,
      losetwo: 1386,
    },
    220: {
      maintain: 2331,
      losehalf: 2081,
      loseone: 1831,
      losetwo: 1331,
    },
    210: {
      maintain: 2277,
      losehalf: 2027,
      loseone: 1777,
      losetwo: 1277,
    },
    200: {
      maintain: 2222,
      losehalf: 1972,
      loseone: 1722,
      losetwo: 1222,
    },
    190: {
      maintain: 2168,
      losehalf: 1918,
      loseone: 1668,
      losetwo: 1168,
    },
    180: {
      maintain: 2113,
      losehalf: 1863,
      loseone: 1613,
      losetwo: 1113,
    },
  },
};

//! Page Contruction Functions
async function createMainPage() {
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

      console.log("changed focusedDate: ", focusedDate);
      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(
        sessionStorage.userID,
        focusedDate,
        serverURL,
        allUserMeals
      );
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
      createDataObject(
        sessionStorage.userID,
        focusedDate,
        serverURL,
        allUserMeals
      );
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
      createDataObject(
        sessionStorage.userID,
        focusedDate,
        serverURL,
        allUserMeals
      );
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
      createDataObject(
        sessionStorage.userID,
        focusedDate,
        serverURL,
        allUserMeals
      );
    }

    header.after(prevNextSection);

    createDataObject(
      sessionStorage.userID,
      focusedDate,
      serverURL,
      allUserMeals
    );

    allUserMeals = await getAllUserMeals(serverURL, allUserMeals);

    //? build function calls
    buildCardioWindow();
    buildWorkoutWindow();
    buildMealsWindow();
    // buildRoutinesWindow()
  }
}

//! Begin
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmitLogin(serverURL, createMainPage);
});

createMainPage();
