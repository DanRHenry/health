import { getWeightEntry } from "../weight/crud_functions/getWeightEntry.js";
import { createDataObject } from "../createDataObject.js";
import { getAllUserMeals } from "../meals/crud_functions/getAllUserMeals.js";
import { buildMealsSection } from "../meals/buildMealsSection.js";
import { buildCardioWindow } from "../cardio/buildCardioWindow.js";
import { buildWorkoutWindow } from "../workout/buildWorkoutWindow.js";

import { calculateCalorieLimits } from "../meals/calculateCalorieLimits.js";
import { updateWeightEntry } from "../weight/crud_functions/updateWeightEntry.js";
import { updateSessionStorageWeightEntry } from "./main_page_functions/updateSessionStorageWeightEntry.js";
import { prevDate } from "./main_page_functions/prevDate.js";


export async function createMainPage(serverURL) {
  // const body = document.getElementById("body");
  // const userEmailField = document.getElementById("userEmailField");
  // const userPasswordField = document.getElementById("userPasswordField");
  let allUserMeals = [];

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

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dateDisplayInfo = `${
    weekdays[today.getDay()]
  }, ${adjustedMonth}/${today.getDate()}/${today.getFullYear()}`;

  let focusedDate = `${month}${date}${today.getFullYear()}`;

  updateSessionStorageWeightEntry();
  if (sessionStorage.userID && sessionStorage.token) {
    body.innerHTML = "";

    const navbar = document.createElement("nav");
    navbar.id = "navbar";

    body.append(navbar);

    const header = document.createElement("h2");
    header.id = "header";
    header.innerText = "Health";
    body.append(header);

    const prevNextSection = document.createElement("div");
    prevNextSection.id = "prevNextSection";

    const prevDateBtn = document.createElement("button");
    prevDateBtn.id = "prevDateBtn";
    prevDateBtn.innerText = "<<";
    prevDateBtn.addEventListener("click", () => {
        prevDate(serverURL, dateOffset, today, weekdays, focusedDate, allUserMeals)
    });

    const dateDisplay = document.createElement("span");
    dateDisplay.id = "dateDisplay";
    dateDisplay.innerText = "Date";
    dateDisplay.addEventListener("click", resetDate);

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

      let dateDisplayInfo = `${
        weekdays[adjustedDate.getDay()]
      }, ${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

      focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(
        sessionStorage.userID,
        focusedDate,
        serverURL,
        allUserMeals,
      );
      document.getElementById("dailyCalories").innerText = 0;

      getWeightEntry(focusedDate);

      updateSessionStorageWeightEntry();
      calculateCalorieLimits();

      updateCalories();
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

      let dateDisplayInfo = `${
        weekdays[adjustedDate.getDay()]
      }, ${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

      focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(
        sessionStorage.userID,
        focusedDate,
        serverURL,
        allUserMeals,
      );
      document.getElementById("dailyCalories").innerText = 0;

      // getWeightEntry(focusedDate)

      updateSessionStorageWeightEntry();
      calculateCalorieLimits();

      updateCalories();
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

      let dateDisplayInfo = `${
        weekdays[adjustedDate.getDay()]
      }, ${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

      focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(
        sessionStorage.userID,
        focusedDate,
        serverURL,
        allUserMeals,
      );
      document.getElementById("dailyCalories").innerText = 0;
      updateSessionStorageWeightEntry();
      calculateCalorieLimits();

      updateCalories();
    }

    const dailyInfoLine = document.createElement("div");
    dailyInfoLine.id = "dailyInfoLine";

    const calories = document.createElement("div");
    const dailyCalories = document.createElement("span");
    dailyCalories.name = "dailyCalories";
    dailyCalories.id = "dailyCalories";
    dailyCalories.innerText = "0";

    const dailyCaloriesLabel = document.createElement("span");
    dailyCaloriesLabel.innerText = "Cals";

    const weight = document.createElement("div");

    updateSessionStorageWeightEntry();

    const dailyWeight = document.createElement("span");
    dailyWeight.name = "dailyWeight";
    dailyWeight.id = "dailyWeight";
    dailyWeight.innerText = sessionStorage.weight;
    dailyWeight.addEventListener("click", handleWeightClick);

    const dailyWeightLabel = document.createElement("span");
    dailyWeightLabel.innerText = "Weight";
    dailyWeightLabel.id = "weightLabel";

    calories.append(dailyCaloriesLabel, dailyCalories);
    weight.append(dailyWeightLabel, dailyWeight);
    dailyInfoLine.append(calories, weight);

    // ----------------------------
    const maxCaloriesLine = document.createElement("div");
    maxCaloriesLine.id = "maxCaloriesLine";

    const maintain = document.createElement("div");
    const maintainCals = document.createElement("span");
    maintainCals.name = "maintainCals";
    maintainCals.id = "maintainCals";
    maintainCals.innerText = "0";

    const maintainCalsLabel = document.createElement("span");
    maintainCalsLabel.innerText = "Maintain: ";

    maintain.append(maintainCalsLabel, maintainCals);

    const loseOnePointFiveLbs = document.createElement("div");

    const loseOnePointFiveLbsCals = document.createElement("span");
    loseOnePointFiveLbsCals.name = "loseOnePointFiveLbsCals";
    loseOnePointFiveLbsCals.id = "loseOnePointFiveLbsCals";
    loseOnePointFiveLbsCals.innerText = "0";

    const loseOnePointFiveLbsCalsLabel = document.createElement("span");
    loseOnePointFiveLbsCalsLabel.innerText = "Lose 1.5: ";
    loseOnePointFiveLbs.append(
      loseOnePointFiveLbsCalsLabel,
      loseOnePointFiveLbsCals,
    );

    const loseOneLb = document.createElement("div");

    const loseOneLbCals = document.createElement("span");
    loseOneLbCals.name = "loseOneLbCals";
    loseOneLbCals.id = "loseOneLbCals";
    loseOneLbCals.innerText = "0";

    const loseOneLbCalsLabel = document.createElement("span");
    loseOneLbCalsLabel.innerText = "Lose 1: ";
    loseOneLb.append(loseOneLbCalsLabel, loseOneLbCals);

    const losePointFiveLb = document.createElement("div");

    const losePointFiveLbCals = document.createElement("span");
    losePointFiveLbCals.name = "losePointFiveLbCals";
    losePointFiveLbCals.id = "losePointFiveLbCals";
    losePointFiveLbCals.innerText = "0";

    const losePointFiveLbCalsLabel = document.createElement("span");
    losePointFiveLbCalsLabel.innerText = "Lose .5: ";
    losePointFiveLb.append(losePointFiveLbCalsLabel, losePointFiveLbCals);

    //------------------

    maxCaloriesLine.append(
      maintain,
      losePointFiveLb,
      loseOneLb,
      loseOnePointFiveLbs,
    );

    header.after(dailyInfoLine, maxCaloriesLine, prevNextSection);

    createDataObject(
      sessionStorage.userID,
      focusedDate,
      serverURL,
      allUserMeals,
    );

    allUserMeals = await getAllUserMeals(serverURL, allUserMeals);

    //? build function calls
    // buildCardioWindow();
    // buildWorkoutWindow();
    buildMealsSection();
    document.getElementById("mealsTitle").click();
    // buildRoutinesWindow()
  }
  calculateCalorieLimits();

  function resetDate() {
    dateOffset = 0;
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

    let dateDisplayInfo = `${
      weekdays[adjustedDate.getDay()]
    }, ${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

    focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

    dateDisplay.innerText = dateDisplayInfo;
    createDataObject(
      sessionStorage.userID,
      focusedDate,
      serverURL,
      allUserMeals,
    );
    document.getElementById("dailyCalories").innerText = 0;

    getWeightEntry(focusedDate);

    updateSessionStorageWeightEntry();
    calculateCalorieLimits();

    updateCalories();
  }

  async function handleWeightClick() {
    const dailyWeight = document.getElementById("dailyWeight");

    const weightPlaceholder = dailyWeight.innerText;

    dailyWeight.remove();

    const weightInput = document.createElement("input");
    weightInput.id = "weightInput";
    weightInput.placeholder = weightPlaceholder;
    // dailyWeight.removeEventListener("click", handleWeightClick)
    const weightLabel = document.getElementById("weightLabel");
    weightLabel.after(weightInput);

    weightInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const newWeight = weightInput.value;

        weightInput.remove();
        const dailyWeight = document.createElement("span");
        dailyWeight.name = "dailyWeight";
        dailyWeight.id = "dailyWeight";
        dailyWeight.innerText = newWeight;

        updateWeightEntry(newWeight, focusedDate);
        weightLabel.after(dailyWeight);
        dailyWeight.addEventListener("click", handleWeightClick);
      }
    });
    weightInput.focus();
  }

  function updateCalories() {
    const mealCalories = document.getElementsByClassName("dailyMealCalories");

    let total = 0;
    for (let i = 0; i < mealCalories.length; i++) {
      total += Number(mealCalories[i].textContent);
    }
    document.getElementById("dailyCalories").innerText = total;
    calculateCalorieLimits();
  }
}
