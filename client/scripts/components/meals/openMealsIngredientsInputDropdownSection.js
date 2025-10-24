import { closeMealsIngredientsInputDropdownSection } from "./closeMealsIngredientsInputDropdownSection.js";
import { createMealsEntry } from "../meals/crud_functions/createMealsEntry.js";
import { buildDailyMealsSection } from "../dailyMeals/buildDailyMealsSection.js";
import { getAllUserMeals } from "./crud_functions/getAllUserMeals.js";
import { createDataObject } from "../createDataObject.js";
import { updateMealsEntry } from "../meals/crud_functions/updateMealsEntry.js";
import { createDailyMealsEntry } from "../dailyMeals/crud_functions/createDailyMealsEntry.js";
import { findMealEntryByMealNameAndUserID } from "./crud_functions/findMealEntryByMealNameAndUserID.js";
import { serverURL } from "../../../helpers/serverURL.js";

export function openMealsIngredientsInputDropdownSection(
  // handleMealsInputClick,
  focusedDate,
  allUserMeals
) {
  document
    .getElementById("mealsIngredientsInputDropdownBtn")
    .removeEventListener("click", openMealsIngredientsInputDropdownSection);
  document
    .getElementById("mealsIngredientsInputDropdownBtn")
    .addEventListener("click", closeMealsIngredientsInputDropdownSection);
  document.getElementById("mealsIngredientsInputDropdownBtn").style.transform =
    "initial";
  // document
  //   .getElementById("mealsTable")
  //   .childNodes[1].after(
  //     document.getElementById("mealsIngredientsInputDropdown")
  //   );

  // mealsIngredientsInputDropdown.style.height = "30vh"
  // console.log("clicked");
  const mealsIngredientsSection = document.createElement("div");
  mealsIngredientsSection.id = "mealsIngredientsSection";

  const mealTimeRow = document.createElement("div");
  mealTimeRow.className = "ingredientInputLabels";
  const mealTimeLabel = document.createElement("span");
  mealTimeLabel.innerText = "Meal Time: ";
  const mealTimeInput = document.createElement("input");
  mealTimeInput.addEventListener("keydown", handleMealsInputClick);
  mealTimeInput.id = "mealTimeInput";
  mealTimeInput.name = "mealTimeInput";
  mealTimeInput.setAttribute("list", "meal-time-choices");
  // mealTimeInput.list = "meal-time-choices";
  mealTimeInput.id = "meal-time-choice";
  mealTimeInput.autocomplete = "off";

  mealTimeInput.addEventListener("click", () => {
    if (mealTimeInput.value !== "") {
      mealTimeInput.value = "";
      mealTimeInput.blur();
      mealTimeInput.focus();
      // mealTimeInput.click()
    }
  });

  const mealTimeOptions = document.createElement("datalist");
  mealTimeOptions.id = "meal-time-choices";
  const breakfastOption = document.createElement("option");
  breakfastOption.value = "Breakfast";
  const lunchOption = document.createElement("option");
  lunchOption.value = "Lunch";
  const dinnerOption = document.createElement("option");
  dinnerOption.value = "Dinner";
  const snackOption = document.createElement("option");
  snackOption.value = "Snack";

  mealTimeOptions.append(
    breakfastOption,
    lunchOption,
    dinnerOption,
    snackOption
  );

  mealTimeInput.appendChild(mealTimeOptions);

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
    caloriesRow
    // proteinRow,
    // sugarsRow
  );

  // buildDailyMealsSection(focusedDate);

  mealsTable.after(mealsIngredientsSection);

  async function handleMealsInputClick(e) {
    if (e.key !== "Enter") {
      return;
    }

    const mealsNameInput = document.getElementById("mealsNameInput").value;

    const caloriesInput = document.getElementById("caloriesInput").value;

    createDailyMealsEntry(
      focusedDate,
      mealsNameInput,
      mealTimeInput.value,
      caloriesInput
    );

    // const proteinInput = document.getElementById("proteinInput")?.value;

    // const sugarsInput = document.getElementById("sugarsInput")?.value;

    // const allUserMeals = await getAllUserMeals(focusedDate)
    // console.log(focusedDate)
    // console.log("allUserMeals: ",allUserMeals)
    // console.log(mealsNameInput)
    for (let i = 0; i < allUserMeals.length; i++) {
      if (allUserMeals[i] === mealsNameInput) {
        const existingMealEntry = await findMealEntryByMealNameAndUserID(
          allUserMeals[i],
          serverURL
        );
        const existingMealCalories =
          existingMealEntry.getMealsByNameAndUserID.calories;

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
            mealName: mealsNameInput.trim(),
            mealTime: mealTimeInput,
            calories: caloriesInput,
            // protein: proteinInput,
            // sugars: sugarsInput,
            userID: sessionStorage.userID,
            date: focusedDate,
          });
        });
        noBtn.addEventListener("click", () => {
          console.log("adding meal to today's meals");
          // createDailyMealsEntry(focusedDate, mealsNameInput, mealTimeInput.value, caloriesInput)
          document.getElementById("mealUpdateConfirmationLine").remove();
        });
        updateConfirmationLine.append(yesBtn, noBtn);
        console.log("caloriesInput: ", caloriesInput);
        console.log("calories: ", existingMealCalories);
        // if (caloriesInput !== allUserMeals[i].calories) {
        if (!document.getElementById("mealUpdateConfirmationLine")) {
          if (+caloriesInput !== +existingMealCalories) {
            mealsSection.append(updateConfirmationLine);
          }
        }
        // yesBtn.focus()
        // }
        mealTimeInput.value = "";
        document.getElementById("caloriesInput").value = "";
        return;
      }
    }

    // if (mealsNameInput && caloriesInput && proteinInput && sugarsInput) {
    if (mealsNameInput && caloriesInput) {
      await createMealsEntry(
        mealsNameInput,
        caloriesInput
        // proteinInput,
        // sugarsInput
      );

      await createDataObject(sessionStorage.userID, focusedDate);
    }
  }
}
