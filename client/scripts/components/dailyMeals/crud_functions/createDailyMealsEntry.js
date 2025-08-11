import { serverURL } from "../../../../helpers/serverURL.js";
// import { buildMealsWindow } from "../../meals/buildMealsWindow.js";
import { createDataObject } from "../../createDataObject.js";
import { findMealEntryByMealNameAndUserID } from "../../meals/crud_functions/findMealEntryByMealNameAndUserID.js";
import { createMealsEntry } from "../../meals/crud_functions/createMealsEntry.js";
import { getAllUserMeals } from "../../meals/crud_functions/getAllUserMeals.js";
export async function createDailyMealsEntry(focusedDate) {
  const URL = `${serverURL}/dailyMeals/create`;

  const mealName = document.getElementById("mealsNameInput").value;
  const mealTime = document.getElementById("mealTimeInput").value;
  const calories = document.getElementById("caloriesInput").value;
  const protein = document.getElementById("proteinInput").value;
  const sugars = document.getElementById("sugarsInput").value;
  const userID = sessionStorage.userID;
  const date = focusedDate;

  const dailyMealsEntryBody = JSON.stringify({
    mealName: mealName,
    mealTime: mealTime,
    calories: calories,
    protein: protein,
    sugars: sugars,
    userID: userID,
    date: date,
  });

  console.log(
    "values: ",
    mealName,
    mealTime,
    calories,
    protein,
    sugars,
    userID,
    date
  );

  try {
    const res = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.token,
      },
      body: dailyMealsEntryBody,
    });

    const data = await res.json();
    if (data.message != "No Records Found.") {
      console.log("Meals Records: ", data);
    }
    if (data.message === "Success! New DailyMeals Entry Created!") {
      const checkForExistingMealEntry = await findMealEntryByMealNameAndUserID(
        mealName,
        serverURL
      );

      if ((checkForExistingMealEntry.message = "No Meal Found")) {
        console.log("no meal found, creating meal entry");

        createMealsEntry(mealName, calories, protein, sugars, serverURL);
        // buildMealsWindow();

        let allUserMeals = [];
        allUserMeals = await getAllUserMeals(serverURL, allUserMeals);

        createDataObject(
          sessionStorage.userID,
          focusedDate,
          serverURL,
          allUserMeals
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}
