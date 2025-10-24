import { serverURL } from "../../../helpers/serverURL.js";
import { buildMealsSection } from "../meals/buildMealsSection.js";
import { buildMealsContents } from "../meals/buildMealsContents.js";
import { calculateCalorieLimits } from "../meals/calculateCalorieLimits.js";
import { deleteDailyMealsEntry } from "./crud_functions/deleteDailyMealsEntry.js";
import { getDailyMealsEntries } from "./crud_functions/getDailyMealsEntries.js";


export async function fillDailyMealsContent(meals, allUserMeals, focusedDate) {
  try { 

  const data = await getDailyMealsEntries(focusedDate);
  let dailyMeals = await data.getDailyMealsRecords;

  // console.log("dailyMeals records: ",dailyMeals)
  const dailyMealsEntries = document.getElementsByClassName("dailyMealsEntries");

  for (let i = dailyMealsEntries.length; i > 0; i--) {
    dailyMealsEntries[i - 1].remove();
  }

  // console.log("dailyMeals: ",dailyMeals)

  // if (dailyMeals === null) {
  //     dailyMeals = await data.getDailyMealsRecords;
  // }

  // console.log(dailyMeals.length)
  // console.log(dailyMeals)

  dailyMeals?.map((meal) => {

        // console.log("record", meal);

    const row = document.createElement("tr");
    row.className = "dailyMealsEntries";
    const mealName = document.createElement("td");    
    const mealTime = document.createElement("td");
    const calories = document.createElement("td");
    calories.className = "dailyMealCalories";

    mealName.innerText = meal.mealName;
    mealTime.innerText = meal.mealTime;
    calories.innerText = meal.calories;

    // console.log(meal)
        //todo find out why this sometimes results in null promise
        //todo "Cannot read properties of null (reading 'appendChild')"
    document.getElementById("mealsTable").appendChild(row);

    row.append(mealName, mealTime, calories);

    row.addEventListener("click", () => {
      let confirmDelete;

      confirmDelete = window.confirm("Delete Entry?");

      if (confirmDelete) {
        deleteDailyMealsEntry(meal._id);
        console.log("deleted... filling daily meals");
        // location.reload()
        // document.getElementById("mealsSection").remove()
        // document.getElementById("mealsSectionTop").remove()
        // buildMealsSection()
        // buildMealsContents(meals, allUserMeals, focusedDate)
        // fillDailyMealsContent(focusedDate);
        location.reload()
      }
    });
  })


  // for (let i = 0; i < dailyMeals?.length; i++) {
  //   console.log("record", i, dailyMeals[i]);
  //   const mealsTable = document.getElementById("mealsTable");

  //   const row = document.createElement("tr");
  //   row.className = "dailyMealsEntries";
  //   const mealName = document.createElement("td");    
  //   const mealTime = document.createElement("td");
  //   const calories = document.createElement("td");
  //   calories.className = "dailyMealCalories";

  //   mealName.innerText = dailyMeals[i].mealName;
  //   mealTime.innerText = dailyMeals[i].mealTime;
  //   calories.innerText = dailyMeals[i].calories;

  //   row.append(mealName, mealTime, calories);
  //   mealsTable.appendChild(row);

  //   row.addEventListener("click", () => {
  //     let confirmDelete;

  //     confirmDelete = window.confirm("Delete Entry?");

  //     if (confirmDelete) {
  //       deleteDailyMealsEntry(dailyMeals[i]._id);
  //       console.log("deleted... filling daily meals");
  //       fillDailyMealsContent(focusedDate);
  //     }
  //   });
  // }
  const mealCalories = document.getElementsByClassName("dailyMealCalories");

  let total = 0;
  for (let i = 0; i < mealCalories.length; i++) {
    // console.log(mealCalories[i].textContent);
    total += Number(mealCalories[i].textContent);
  }
  // console.log("total daily calories: ", total);
  document.getElementById("dailyCalories").innerText = total;

  calculateCalorieLimits()
    } catch (err) {
    console.log(err)
  }
}
