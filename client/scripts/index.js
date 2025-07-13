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

function buildMealsWindow() {
  const mealsSectionTop = document.createElement("div");
  mealsSectionTop.id = "mealsSectionTop";
  mealsSectionTop.addEventListener("click", toggleMealsSectionMenu);

  const mealsTitle = document.createElement("div");
  mealsTitle.innerText = "Meals";
  mealsTitle.id = "mealsTitle";

  const mealsSectionBtn = document.createElement("span");
  mealsSectionBtn.innerText = "+";
  mealsSectionBtn.id = "mealsSectionBtn";

  const mealsSection = document.createElement("div");
  mealsSection.id = "mealsSection";

  mealsSectionTop.append(mealsTitle);

  prevNextSection.after(mealsSectionTop);
  mealsSectionTop.after(mealsSection);
}

// function buildRoutinesWindow() {
//     const routinesSectionTop = document.createElement("div");
//   routinesSectionTop.id = "routinesSectionTop";
//   routinesSectionTop.addEventListener("click", toggleRoutinesSectionMenu);

//   const routinesTitle = document.createElement("div");
//   routinesTitle.innerText = "Routines";
//   routinesTitle.id = "routinesTitle";

//   const routinesSectionBtn = document.createElement("span");
//   routinesSectionBtn.innerText = "-";
//   routinesSectionBtn.id = "routinesSectionBtn";

//   const routinesSection = document.createElement("div");
//   routinesSection.id = "routinesSection";

//   routinesSectionTop.append(routinesTitle);
//   prevNextSection.after(routinesSectionTop);
//   routinesSectionTop.after(routinesSection);
// }

function buildCardioWindow() {
  const cardioSectionTop = document.createElement("div");
  cardioSectionTop.id = "cardioSectionTop";
  cardioSectionTop.addEventListener("click", toggleCardioSectionMenu);

  const cardioTitle = document.createElement("div");
  cardioTitle.innerText = "Cardio";
  cardioTitle.id = "cardioTitle";

  const cardioSectionBtn = document.createElement("span");
  cardioSectionBtn.innerText = "-";
  cardioSectionBtn.id = "cardioSectionBtn";

  const cardioSection = document.createElement("div");
  cardioSection.id = "cardioSection";

  cardioSectionTop.append(cardioTitle);

  prevNextSection.after(cardioSectionTop);
  cardioSectionTop.after(cardioSection);
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

// function buildRoutinesContents(routinesObject){
//   routinesSection.innerHTML = "";
//   const routinesTable = document.createElement("table");

//   const routinesRow = document.createElement("tr");

//   const routinesCheckHeader = document.createElement("th");
//   routinesCheckHeader.innerText = "Select";
//   routinesCheckHeader.className = "routinesHeaders";

//   const routinesDateHeader = document.createElement("th");
//   routinesDateHeader.innerText = "Date";
//   routinesDateHeader.className = "routinesHeaders";

//   const routinesNameHeader = document.createElement("th");
//   routinesNameHeader.innerText = "Name";
//   routinesNameHeader.className = "routinesHeaders";

//   const routinesMachineHeader = document.createElement("th");
//   routinesMachineHeader.innerText = "Machine";
//   routinesMachineHeader.className = "routinesHeaders";

//   const routinesLengthHeader = document.createElement("th");
//   routinesLengthHeader.innerText = "Length";
//   routinesLengthHeader.className = "routinesHeaders";

//   routinesRow.append(
//     routinesCheckHeader,
//     // routinesDateHeader,
//     routinesNameHeader,
//     routinesMachineHeader,
//     routinesLengthHeader
//   );

//   //---------------------------
//   const routinesInputRow = document.createElement("tr");

//   const routinesInputBtn = document.createElement("td");
//   routinesInputBtn.id = "routinesInputBtn";
//   routinesInputBtn.innerText = "";
//   // routinesInputBtn.addEventListener("click", handleRoutinesInputClick);

//   const routinesNameInputLocation = document.createElement("td");
//   routinesNameInputLocation.id = "routinesNameInputLocation";
//   routinesNameInputLocation.name = "routinesNameInputLocation";
//   const routinesNameInput = document.createElement("input");
//   routinesNameInput.id = "routinesNameInput";
//   routinesNameInput.spellcheck = "false";
//   routinesNameInputLocation.appendChild(routinesNameInput);
//   routinesNameInput.addEventListener("keydown", handleRoutinesInputClick);

//   const routinesMachineInputLocation = document.createElement("td");
//   routinesMachineInputLocation.id = "routinesMachineInputLocation";
//   routinesMachineInputLocation.name = "routinesMachineInputLocation";
//   const routinesMachineInput = document.createElement("input");
//   routinesMachineInput.id = "routinesMachineInput";
//   routinesMachineInput.spellcheck = "false";
//   routinesMachineInput.addEventListener("keydown", handleRoutinesInputClick);
//   routinesMachineInputLocation.appendChild(routinesMachineInput);

//   const routinesLengthInputLocation = document.createElement("td");
//   routinesLengthInputLocation.id = "routinesLengthInputLocation";
//   routinesLengthInputLocation.name = "routinesLengthInputLocation";
//   const routinesLengthInput = document.createElement("input");
//   routinesLengthInput.id = "routinesLengthInput";
//   routinesLengthInput.spellcheck = "false";
//   routinesLengthInput.type = "number";
//   routinesLengthInput.min = "0";
//   routinesLengthInput.addEventListener("keydown", handleRoutinesInputClick);

//   routinesLengthInputLocation.appendChild(routinesLengthInput);

//   routinesInputRow.append(
//     routinesInputBtn,
//     routinesNameInputLocation,
//     routinesMachineInputLocation,
//     routinesLengthInputLocation
//   );
//   routinesTable.append(routinesRow, routinesInputRow);

//   routinesSection.append(routinesTable);
//   //-------------------------------
//   if (routinesObject) {
//     for (let i = 0; i < routinesObject.length; i++) {
//       let year = Number(routinesObject[i].date.slice(4));
//       const date = Number(routinesObject[i].date.slice(2, 4));

//       const month = Number(routinesObject[i].date.slice(0, 2));
//       const dateText = `${month}/${date}/${year}`;
//       const nameText = routinesObject[i].exerciseName;
//       const machineText = routinesObject[i].machine;
//       const lengthText = `${routinesObject[i].duration} min`;

//       const routinesRow = document.createElement("tr");
//       routinesRow.className = "routinesRows";

//       const checkBox = document.createElement("input");
//       checkBox.type = "checkbox";
//       checkBox.className = "routinesCheckboxes";
//       checkBox.id = `routinesCheckbox${i}`;

//       checkBox.addEventListener("change", function () {
//         const deleteRowSection = document.createElement("tr")
//         deleteRowSection.id = `deleteRoutinesRowSection_${i}`
//         deleteRowSection.className = "deleteRows routinesRows";
//         const spacer = document.createElement("td")
//         spacer.style.backgroundColor = "initial"
//         const deleterow = document.createElement("td")
//         // deleterow.id = `routinesDeleteRow_${i}`
//         deleterow.className = "routinesDeleteRowButtons"
//         deleterow.addEventListener("click", () => {
//           // console.log(routinesObject[i])
//           deleteRoutinesEntry(routinesObject[i]._id)
//         })
//         deleteRowSection.append(spacer,deleterow)

//         if (this.checked) {
//           // routinesRow.style.backgroundColor = "red"
//           routinesRow.style.textDecoration = "line-through"
//           deleterow.innerText = "Delete?"
//           deleterow.col
//           deleterow.colSpan = "3"
//           routinesRow.after(deleteRowSection)
//         }
//         else if (!this.checked) {
//           routinesRow.style.textDecoration = null;
//           console.log("i",i)
//           const deleteRowSection = document.getElementById(`deleteRoutinesRowSection_${i}`)
//           deleteRowSection.remove()
//         }
//       })

//       const routinesDate = document.createElement("td");
//       routinesDate.innerText = dateText;
//       routinesDate.className = "routinesDates";

//       const routinesName = document.createElement("td");
//       routinesName.innerText = nameText;
//       routinesName.className = "routinesNames";
//       routinesName.addEventListener("click", handleRoutinesNameClick)

//       async function handleRoutinesNameClick () {
//         routinesName.removeEventListener("click", handleRoutinesNameClick)
//         const routinesNameInput = document.createElement("input")
//         routinesNameInput.placeholder = routinesName.innerText
//         routinesName.innerText = null
//         routinesName.appendChild(routinesNameInput)
//         routinesNameInput.focus()
//         routinesNameInput.addEventListener("keypress", (e) => {
//           if (e.key === "Enter" && routinesNameInput.value !== null) {
//             const updateObject = {
//               exerciseName: routinesNameInput.value
//             }
//             updateRoutinesEntry(updateObject, routinesObject[i]._id)

//             console.log(sessionStorage.userID)
//             console.log(focusedDate)

//             // createDataObject(sessionStorage.userID, focusedDate);
//             // createDataObject(userID, date)
//             buildRoutinesContents(object.routinesObject)
//           }
//         })
//       }

//       const routinesMachine = document.createElement("td");
//       routinesMachine.innerText = machineText;
//       routinesMachine.className = "routinesMachines";
//       routinesMachine.addEventListener("click", handleRoutinesMachineClick)

//       async function handleRoutinesMachineClick () {
//         routinesMachine.removeEventListener("click", handleRoutinesMachineClick)
//         const routinesMachineInput = document.createElement("input")
//         routinesMachineInput.placeholder = routinesMachine.innerText
//         routinesMachine.innerText = null
//         routinesMachine.appendChild(routinesMachineInput)
//         routinesMachineInput.focus()
//         routinesMachineInput.addEventListener("keypress", (e) => {
//           if (e.key === "Enter" && routinesMachineInput.value !== null) {
//             const updateObject = {
//               machine: routinesMachineInput.value
//             }
//             updateRoutinesEntry(updateObject, routinesObject[i]._id)

//             console.log(sessionStorage.userID)
//             console.log(focusedDate)

//             // createDataObject(sessionStorage.userID, focusedDate);
//             // createDataObject(userID, date)
//             buildRoutinesContents(object.routinesObject)
//           }
//         })
//       }

//       const routinesLength = document.createElement("td");
//       routinesLength.innerText = lengthText;
//       routinesLength.className = "routinesLengths";
//       routinesLength.addEventListener("click", handleRoutinesLengthClick)

//       async function handleRoutinesLengthClick () {
//         routinesLength.removeEventListener("click", handleRoutinesLengthClick)
//         const routinesLengthInput = document.createElement("input")
//         routinesLengthInput.placeholder = routinesLength.innerText
//         routinesLength.innerText = null
//         routinesLength.appendChild(routinesLengthInput)
//         routinesLengthInput.focus()
//         routinesLengthInput.addEventListener("keypress", (e) => {
//           if (e.key === "Enter" && routinesLengthInput.value !== null) {
//             const updateObject = {
//               duration: routinesLengthInput.value
//             }
//             updateRoutinesEntry(updateObject, routinesObject[i]._id)

//             console.log(sessionStorage.userID)
//             console.log(focusedDate)

//             // createDataObject(sessionStorage.userID, focusedDate);
//             // createDataObject(userID, date)
//             buildRoutinesContents(object.routinesObject)
//           }
//         })
//       }

//       routinesRow.append(
//         checkBox,
//         // routinesDate,
//         routinesName,
//         routinesMachine,
//         routinesLength
//       );
//       routinesTable.append(routinesRow);
//     }
//   }
// }

function buildMealsContents(mealsObject) {
  // console.log("mealsObject: ", mealsObject);
  // console.log("bird")
  mealsSection.innerHTML = "";
  const mealsTable = document.createElement("table");
  mealsTable.id = "mealsTable";

  const mealsRow = document.createElement("tr");

  const mealsCheckHeader = document.createElement("th");
  mealsCheckHeader.innerText = "Select";
  mealsCheckHeader.className = "mealsHeaders";

  const mealsNameHeader = document.createElement("th");
  mealsNameHeader.innerText = "Name";
  mealsNameHeader.className = "mealsHeaders";

  const mealsIngredientsHeader = document.createElement("th");
  mealsIngredientsHeader.innerText = "Ingredients";
  mealsIngredientsHeader.className = "mealsHeaders";

  mealsRow.append(mealsCheckHeader, mealsNameHeader, mealsIngredientsHeader);
  //---------------------------
  const mealsInputRow = document.createElement("tr");

  const mealsInputBtn = document.createElement("td");
  mealsInputBtn.id = "mealsInputBtn";
  mealsInputBtn.innerText = "";

  const mealsNameInputLocation = document.createElement("td");
  mealsNameInputLocation.id = "mealsNameInputLocation";
  mealsNameInputLocation.name = "mealsNameInputLocation";

  const mealsNameInput = document.createElement("input");
  mealsNameInput.type = "text";
  mealsNameInput.setAttribute("list", "mealsNameInputDropdown");
  mealsNameInput.id = "mealsNameInput";
  mealsNameInput.name = "mealsNameInput";
  mealsNameInput.spellcheck = "false";
  mealsNameInput.addEventListener("keydown", handleMealsInputClick);
  mealsNameInput.addEventListener("change", handleMealsInputChange);

  const mealsNameInputDropdown = document.createElement("datalist");
  mealsNameInputDropdown.id = "mealsNameInputDropdown";

  for (let i = 0; i < allUserMeals.length; i++) {
    const mealsNameInputDropdownListItem = document.createElement("option");
    mealsNameInputDropdownListItem.value = allUserMeals[i];
    mealsNameInputDropdownListItem.innerText = allUserMeals[i];
    mealsNameInputDropdown.append(mealsNameInputDropdownListItem);
  }

  mealsNameInput.append(mealsNameInputDropdown);

  mealsNameInputLocation.append(mealsNameInput);

  const mealsIngredientsInputLocation = document.createElement("td");
  mealsIngredientsInputLocation.id = "mealsIngredientsInputLocation";
  mealsIngredientsInputLocation.name = "mealsIngredientsInputLocation";

  const mealsIngredientsInputDropdown = document.createElement("div");
  mealsIngredientsInputDropdown.id = "mealsIngredientsInputDropdown";

  const mealsIngredientsInputDropdownBtn = document.createElement("button");
  mealsIngredientsInputDropdownBtn.id = "mealsIngredientsInputDropdownBtn";
  mealsIngredientsInputDropdownBtn.innerText = "^";
  mealsIngredientsInputDropdownBtn.addEventListener(
    "click",
    openMealsIngredientsInputDropdownSection
  );

  mealsIngredientsInputLocation.append(mealsIngredientsInputDropdownBtn);

  mealsInputRow.append(
    mealsInputBtn,
    mealsNameInputLocation,
    mealsIngredientsInputLocation
    // mealsCaloriesInputLocation,
    // mealsProteinInputLocation,
    // mealsSugarsInputLocation
  );
  //------------------------
  mealsTable.append(mealsRow, mealsInputRow);

  mealsSection.append(mealsTable);

  if (mealsObject) {
    console.log("mealsObject: ", mealsObject);
    //-------------------------------
    for (let i = 0; i < mealsObject.length; i++) {
      let year = Number(mealsObject[i].date.slice(4));
      const date = Number(mealsObject[i].date.slice(2, 4));

      const month = Number(mealsObject[i].date.slice(0, 2));
      console.log(mealsObject[i]);
      const dateText = `${month}/${date}/${year}`;
      const nameText = mealsObject[i].mealName;

      const mealsRow = document.createElement("tr");
      mealsRow.className = "mealsRows";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "mealsCheckboxes";
      checkBox.id = `mealsCheckbox${i}`;
      checkBox.addEventListener("change", function () {
        const deleteRowSection = document.createElement("tr");
        deleteRowSection.id = `deleteMealsRowSection_${i}`;
        deleteRowSection.className = "deleteRows mealsRows";
        const spacer = document.createElement("td");
        spacer.style.backgroundColor = "initial";
        const deleterow = document.createElement("td");
        // deleterow.id = `mealsDeleteRow_${i}`
        deleterow.className = "mealsDeleteRowButtons";
        deleterow.addEventListener("click", () => {
          // console.log(mealsObject[i])
          deleteMealsEntry(mealsObject[i]._id);
        });
        deleteRowSection.append(spacer, deleterow);

        if (this.checked) {
          // mealsRow.style.backgroundColor = "red"
          mealsRow.style.textDecoration = "line-through";
          deleterow.innerText = "Delete?";
          deleterow.col;
          deleterow.colSpan = "3";
          mealsRow.after(deleteRowSection);
        } else if (!this.checked) {
          mealsRow.style.textDecoration = null;
          console.log("i", i);
          const deleteRowSection = document.getElementById(
            `deleteMealsRowSection_${i}`
          );
          deleteRowSection.remove();
        }
      });

      const mealsDate = document.createElement("td");
      mealsDate.innerText = dateText;
      mealsDate.className = "mealsDates";

      const mealsName = document.createElement("td");
      mealsName.innerText = nameText;
      mealsName.className = "mealsNames";

      // const
      // const mealsCalories = document.createElement("td");
      // mealsCalories.innerText = machineText;
      // mealsCalories.className = "mealsCalories";

      // const mealsLength = document.createElement("td");
      // mealsLength.innerText = lengthText;
      // mealsLength.className = "mealsLengths";
      mealsRow.append(
        checkBox,
        // mealsDate,
        mealsName
        // mealsCalories,
        // mealsLength
      );
      mealsTable.append(mealsRow);
    }
  }
}

function buildCardioContents(cardioObject) {
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
  cardioInputBtn.innerText = "";
  // cardioInputBtn.addEventListener("click", handleCardioInputClick);

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
      const lengthText = `${cardioObject[i].duration} min`;

      const cardioRow = document.createElement("tr");
      cardioRow.className = "cardioRows";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "cardioCheckboxes";
      checkBox.id = `cardioCheckbox${i}`;

      checkBox.addEventListener("change", function () {
        const deleteRowSection = document.createElement("tr");
        deleteRowSection.id = `deleteCardioRowSection_${i}`;
        deleteRowSection.className = "deleteRows cardioRows";
        const spacer = document.createElement("td");
        spacer.style.backgroundColor = "initial";
        const deleterow = document.createElement("td");
        // deleterow.id = `cardioDeleteRow_${i}`
        deleterow.className = "cardioDeleteRowButtons";
        deleterow.addEventListener("click", () => {
          // console.log(cardioObject[i])
          deleteCardioEntry(cardioObject[i]._id);
        });
        deleteRowSection.append(spacer, deleterow);

        if (this.checked) {
          // cardioRow.style.backgroundColor = "red"
          cardioRow.style.textDecoration = "line-through";
          deleterow.innerText = "Delete?";
          deleterow.col;
          deleterow.colSpan = "3";
          cardioRow.after(deleteRowSection);
        } else if (!this.checked) {
          cardioRow.style.textDecoration = null;
          console.log("i", i);
          const deleteRowSection = document.getElementById(
            `deleteCardioRowSection_${i}`
          );
          deleteRowSection.remove();
        }
      });

      const cardioDate = document.createElement("td");
      cardioDate.innerText = dateText;
      cardioDate.className = "cardioDates";

      const cardioName = document.createElement("td");
      cardioName.innerText = nameText;
      cardioName.className = "cardioNames";
      cardioName.addEventListener("click", handleCardioNameClick);

      async function handleCardioNameClick() {
        cardioName.removeEventListener("click", handleCardioNameClick);
        const cardioNameInput = document.createElement("input");
        cardioNameInput.placeholder = cardioName.innerText;
        cardioName.innerText = null;
        cardioName.appendChild(cardioNameInput);
        cardioNameInput.focus();
        cardioNameInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && cardioNameInput.value !== null) {
            const updateObject = {
              exerciseName: cardioNameInput.value,
            };
            updateCardioEntry(updateObject, cardioObject[i]._id);

            console.log(sessionStorage.userID);
            console.log(focusedDate);

            // createDataObject(sessionStorage.userID, focusedDate);
            // createDataObject(userID, date)
            buildCardioContents(object.cardioObject);
          }
        });
      }

      const cardioMachine = document.createElement("td");
      cardioMachine.innerText = machineText;
      cardioMachine.className = "cardioMachines";
      cardioMachine.addEventListener("click", handleCardioMachineClick);

      async function handleCardioMachineClick() {
        cardioMachine.removeEventListener("click", handleCardioMachineClick);
        const cardioMachineInput = document.createElement("input");
        cardioMachineInput.placeholder = cardioMachine.innerText;
        cardioMachine.innerText = null;
        cardioMachine.appendChild(cardioMachineInput);
        cardioMachineInput.focus();
        cardioMachineInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && cardioMachineInput.value !== null) {
            const updateObject = {
              machine: cardioMachineInput.value,
            };
            updateCardioEntry(updateObject, cardioObject[i]._id);

            console.log(sessionStorage.userID);
            console.log(focusedDate);

            // createDataObject(sessionStorage.userID, focusedDate);
            // createDataObject(userID, date)
            buildCardioContents(object.cardioObject);
          }
        });
      }

      const cardioLength = document.createElement("td");
      cardioLength.innerText = lengthText;
      cardioLength.className = "cardioLengths";
      cardioLength.addEventListener("click", handleCardioLengthClick);

      async function handleCardioLengthClick() {
        cardioLength.removeEventListener("click", handleCardioLengthClick);
        const cardioLengthInput = document.createElement("input");
        cardioLengthInput.placeholder = cardioLength.innerText;
        cardioLength.innerText = null;
        cardioLength.appendChild(cardioLengthInput);
        cardioLengthInput.focus();
        cardioLengthInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && cardioLengthInput.value !== null) {
            const updateObject = {
              duration: cardioLengthInput.value,
            };
            updateCardioEntry(updateObject, cardioObject[i]._id);

            console.log(sessionStorage.userID);
            console.log(focusedDate);

            // createDataObject(sessionStorage.userID, focusedDate);
            // createDataObject(userID, date)
            buildCardioContents(object.cardioObject);
          }
        });
      }

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

function buildWorkoutContents(workoutObject) {
  // console.log("bird")
  workoutSection.innerHTML = "";
  const workoutTable = document.createElement("table");
  workoutTable.id = "workoutTable";

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
  workoutInputBtn.innerText = "";

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
  workoutLengthInput.type = "number";
  workoutLengthInput.min = "0";
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
      const lengthText = `${workoutObject[i].duration} min`;

      const workoutRow = document.createElement("tr");
      workoutRow.className = "workoutRows";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "workoutCheckboxes";
      checkBox.id = `workoutCheckbox${i}`;
      checkBox.addEventListener("change", function () {
        const deleteRowSection = document.createElement("tr");
        deleteRowSection.id = `deleteWorkoutRowSection_${i}`;
        deleteRowSection.className = "deleteRows workoutRows";
        const spacer = document.createElement("td");
        spacer.style.backgroundColor = "initial";
        const deleterow = document.createElement("td");
        // deleterow.id = `workoutDeleteRow_${i}`
        deleterow.className = "workoutDeleteRowButtons";
        deleterow.addEventListener("click", () => {
          // console.log(workoutObject[i])
          deleteWorkoutEntry(workoutObject[i]._id);
        });
        deleteRowSection.append(spacer, deleterow);

        if (this.checked) {
          // workoutRow.style.backgroundColor = "red"
          workoutRow.style.textDecoration = "line-through";
          deleterow.innerText = "Delete?";
          deleterow.col;
          deleterow.colSpan = "3";
          workoutRow.after(deleteRowSection);
        } else if (!this.checked) {
          workoutRow.style.textDecoration = null;
          console.log("i", i);
          const deleteRowSection = document.getElementById(
            `deleteWorkoutRowSection_${i}`
          );
          deleteRowSection.remove();
        }
      });

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

// function toggleRoutinesSectionMenu() {
//   if (!routinesSection.style.minHeight) {
//     routinesSection.style.maxHeight = null;
//     routinesSection.style.minHeight = "30vh";
//     routinesSection.style.height = "fit-content";
//   } else {
//     routinesSection.style.minHeight = null;
//     routinesSection.style.maxHeight = 0;
//   }
// }
function openMealsIngredientsInputDropdownSection() {
  document
    .getElementById("mealsIngredientsInputDropdownBtn")
    .removeEventListener("click", openMealsIngredientsInputDropdownSection);
  document
    .getElementById("mealsIngredientsInputDropdownBtn")
    .addEventListener("click", closeMealsIngredientsInputDropdownSection);
  document.getElementById("mealsIngredientsInputDropdownBtn").style.transform =
    "initial";
  document
    .getElementById("mealsTable")
    .childNodes[1].after(
      document.getElementById("mealsIngredientsInputDropdown")
    );

  // mealsIngredientsInputDropdown.style.height = "30vh"
  console.log("clicked");
  const mealsIngredientsSection = document.createElement("div");
  mealsIngredientsSection.id = "mealsIngredientsSection";

  const mealTimeRow = document.createElement("div");
  mealTimeRow.className = "ingredientInputLabels";
  const mealTimeLabel = document.createElement("span");
  mealTimeLabel.innerText = "Meal Time: ";
  const mealTimeInput = document.createElement("input");
  mealTimeInput.addEventListener("keydown", handleMealsInputClick);
  mealTimeInput.id = "mealTimeInput";
  mealTimeRow.append(mealTimeLabel, mealTimeInput);

  const caloriesRow = document.createElement("div");
  caloriesRow.className = "ingredientInputLabels";
  const caloriesLabel = document.createElement("span");
  caloriesLabel.innerText = "Calories: ";
  const caloriesInput = document.createElement("input");
  caloriesInput.addEventListener("keydown", handleMealsInputClick);
  caloriesInput.id = "caloriesInput";
  caloriesRow.append(caloriesLabel, caloriesInput);

  const proteinRow = document.createElement("div");
  proteinRow.className = "ingredientInputLabels";
  const proteinLabel = document.createElement("span");
  proteinLabel.innerText = "Protein: ";
  const proteinInput = document.createElement("input");
  proteinInput.id = "proteinInput";
  proteinInput.addEventListener("keydown", handleMealsInputClick);
  proteinRow.append(proteinLabel, proteinInput);

  const sugarsRow = document.createElement("div");
  sugarsRow.className = "ingredientInputLabels";
  const sugarsLabel = document.createElement("span");
  sugarsLabel.innerText = "Sugars: ";
  const sugarsInput = document.createElement("input");
  sugarsInput.id = "sugarsInput";
  sugarsInput.addEventListener("keydown", handleMealsInputClick);
  sugarsRow.append(sugarsLabel, sugarsInput);

  mealsIngredientsSection.append(
    mealTimeRow,
    caloriesRow,
    proteinRow,
    sugarsRow
  );

  mealsTable.after(mealsIngredientsSection);
}

function closeMealsIngredientsInputDropdownSection() {
  "mealsIngredientsInputDropdownBtn".removeEventListener(
    "click",
    closeMealsIngredientsInputDropdownSection
  );
  document
    .getElementById("mealsIngredientsInputDropdownBtn")
    .addEventListener("click", openMealsIngredientsInputDropdownSection);
  // mealsIngredientsInputDropdown.style.height = "0"
  document.getElementById("mealsIngredientsInputDropdownBtn").style.transform =
    null;
  // console.log("clicked")
  mealsIngredientsSection.remove();
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

// async function handleRoutinesInputClick(e) {
//   // console.log(e.key)
//   if (e.key !== "Enter") {
//     return;
//   }

//   const routinesName = document.getElementById("routinesNameInput").value;

//   const routinesMachine = document.getElementById("routinesMachineInput").value;

//   const routinesLength = document.getElementById("routinesLengthInput").value;

//   // console.log("clicked", routinesName, routinesMachine, routinesLength);

//   if (routinesName && routinesMachine && routinesLength) {
//     console.log("new routines:",routinesName, routinesMachine, routinesLength)
//     await createRoutinesEntry(routinesName, routinesMachine, routinesLength);
//     await createDataObject(sessionStorage.userID, focusedDate);
//   }
// }

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

//! Cardio CRUD functions
async function createCardioEntry(exerciseName, machine, duration) {
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
      "authorization": sessionStorage.token,
    },
    body: cardioEntryBody,
  });

  const data = await res.json();
}

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

async function getCardioEntriesByUserAndDate(userID, date) {
  const URL = `${serverURL}/cardio/find${userID}/${date}`;

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
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
  // console.log(cardioUpdateObject, id)
  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
    body: JSON.stringify({ updateInfo: cardioUpdateObject }),
  });
  const data = await res.json();
  console.log(data);
  createDataObject(sessionStorage.userID, focusedDate);
}

async function deleteCardioEntry(cardioEntryID) {
  const URL = `${serverURL}/cardio/delete${cardioEntryID}`;

  const res = await fetch(URL, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json", 
    "authorization": sessionStorage.token
    },
  });
  const data = await res.json();
  // console.log(data);
  await createDataObject(sessionStorage.userID, focusedDate);
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
      "authorization": sessionStorage.token,
    },
    body: workoutEntryBody,
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
      "authorization": sessionStorage.token,
    },
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
      "authorization": sessionStorage.token,
    },
  });

  const data = await res.json();

  if (data.message != "No Records Found.") {
    // console.log("Workout Records: ",data);
  } 
  // else {
  //   console.log("Is there any Workout data?", data.message);
  // }
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
    body: JSON.stringify({ updateInfo: workoutUpdateObject,
          authorization: sessionStorage.token
     }),
  });
  const data = await res.json();
  console.log(data);
}

async function deleteWorkoutEntry(workoutEntryID) {
  const URL = `${serverURL}/workout/delete${workoutEntryID}`;

  const res = await fetch(URL, {
    method: "DELETE",
    mode: "cors",
    headers: { 
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
     },
  });
  const data = await res.json();
  console.log(data);
  await createDataObject(sessionStorage.userID, focusedDate);
}

const workoutUpdateObject = JSON.stringify({
  exerciseName: "again changedName",
  machine: "newmachine",
  date: focusedDate,
});
//!

//! Meals CRUD functions
async function getAllUserMeals() {
  // console.log("sessionStorage.token: ", sessionStorage.token)
  // console.log("sessionStorage.userID: ", sessionStorage.userID)
  const res = await fetch(
    `${serverURL}/meals/findbyuser${sessionStorage.userID}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionStorage.token,
        },
      }
  );

  const data = await res.json();
  console.log('meals data:', data.mealNames)
  for (let i = 0; i < data.mealNames.length; i++) {
    allUserMeals.push(data.mealNames[i]);
  }
  console.log(allUserMeals);
}

async function createMealsEntry(
  mealsNameInput,
  mealTimeInput,
  caloriesInput,
  proteinInput,
  sugarsInput
) {
  const mealsEntryBody = JSON.stringify({
    mealName: mealsNameInput,
    mealTime: mealTimeInput,
    calories: caloriesInput,
    protein: proteinInput,
    sugars: sugarsInput,
    userID: sessionStorage.userID,
    date: focusedDate,
  });

  const URL = `${serverURL}/meals/create`;

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
    body: mealsEntryBody,
  });

  const data = await res.json();
  if (data.message != "No Records Found.") {
    console.log("Meals Records: ", data);
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
      "authorization": sessionStorage.token,
    },
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
      "authorization": sessionStorage.token
    },
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

async function updateMealsEntry(mealsUpdateObject) {
  console.log("mealsUpdateObject: ", mealsUpdateObject);
  const URL = `${serverURL}/meals/update`;

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
  document.getElementById("mealUpdateConfirmationLine").remove();
}

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

async function deleteMealsEntry(mealsEntryID) {
  const URL = `${serverURL}/meals/delete${mealsEntryID}`;

  const res = await fetch(URL, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json",
      "authorization": sessionStorage.token
     },

  });
  const data = await res.json();
  console.log(data);
}

async function findMealEntryByMealNameAndUserID(mealName) {
  const URL = `${serverURL}/meals/find/${sessionStorage.userID}/${mealName}`;

  // console.log(URL);

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token
    },
  });

  const data = await res.json();
  // console.log(data);
  return data;
}

const mealsUpdateObject = JSON.stringify({
  breakfast: { name: "changedName" },
});
//!

async function updatemealsByDay() {
  const url = `${serverURL}/meals/findmealbydateandid/${sessionStorage.userID}/${focusedDate}`;
  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
  });
  const data = await res.json();

  for (let i = 0; i < data.allMealNames.length; i++) {
    mealsByDay.push(data.allMealNames[i]);
  }
}

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
