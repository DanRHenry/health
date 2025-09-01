import { serverURL } from "../../../helpers/serverURL.js";
import { deleteDailyMealsEntry } from "./crud_functions/deleteDailyMealsEntry.js";
import { getDailyMealsEntries } from "./crud_functions/getDailyMealsEntries.js";

export async function fillDailyMealsContent(focusedDate) {
  const data = await getDailyMealsEntries(focusedDate);
  const dailyMeals = await data.getDailyMealsRecords;

  const mealsEntries = document.getElementsByClassName("dailyMealsEntries");

  for (let i = mealsEntries.length; i > 0; i--) {
    mealsEntries[i - 1].remove();
  }

  for (let i = 0; i < dailyMeals?.length; i++) {
    console.log("record", i, dailyMeals[i]);
    const mealsTable = document.getElementById("mealsTable");

    const row = document.createElement("tr");
    row.className = "dailyMealsEntries";
    const mealName = document.createElement("td");    
    const mealTime = document.createElement("td");
    const calories = document.createElement("td");
    calories.className = "dailyMealCalories";

    mealName.innerText = dailyMeals[i].mealName;
    mealTime.innerText = dailyMeals[i].mealTime;
    calories.innerText = dailyMeals[i].calories;

    row.append(mealName, mealTime, calories);
    mealsTable.appendChild(row);

    row.addEventListener("click", () => {
      let confirmDelete;

      confirmDelete = window.confirm("Delete Entry?");

      if (confirmDelete) {
        deleteDailyMealsEntry(dailyMeals[i]._id);
        console.log("deleted... filling daily meals");
        fillDailyMealsContent(focusedDate);
      }
    });
  }

  const mealCalories = document.getElementsByClassName("dailyMealCalories");

  let total = 0;
  for (let i = 0; i < mealCalories.length; i++) {
    console.log(mealCalories[i].textContent);
    total += Number(mealCalories[i].textContent);
  }
  // console.log("total daily calories: ", total);
  document.getElementById("dailyCalories").innerText = total;
}
