import { closeMealsIngredientsInputDropdownSection } from "./closeMealsIngredientsInputDropdownSection.js";
import {buildDailyMealsSection} from "../dailyMeals/buildDailyMealsSection.js"


export function openMealsIngredientsInputDropdownSection(handleMealsInputClick) {
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
  buildDailyMealsSection()
}
