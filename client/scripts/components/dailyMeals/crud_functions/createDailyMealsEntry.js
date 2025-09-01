import { serverURL } from "../../../../helpers/serverURL.js";

import { createDataObject } from "../../createDataObject.js";
import { findMealEntryByMealNameAndUserID } from "../../meals/crud_functions/findMealEntryByMealNameAndUserID.js";
import { createMealsEntry } from "../../meals/crud_functions/createMealsEntry.js";
import { getAllUserMeals } from "../../meals/crud_functions/getAllUserMeals.js";

import { fillDailyMealsContent } from "../fillDailyMealsContent.js";
export async function createDailyMealsEntry(focusedDate, mealName, mealTime, calories) {
  const URL = `${serverURL}/dailymeals/create`;

  const userID = sessionStorage.userID;
  const date = focusedDate;

  const dailyMealsEntryBody = JSON.stringify({
    mealName: mealName,
    mealTime: mealTime,
    calories: calories,
    // protein: protein,
    // sugars: sugars,
    userID: userID,
    date: date,
  });

  try {
    const res = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "authorization": sessionStorage.token,
      },
      body: dailyMealsEntryBody,
    });

    const data = await res.json();
    if (data.message != "No Records Found.") {
      fillDailyMealsContent(focusedDate);
    }
    
    if (data.message === "Success! New DailyMeals Entry Created!") {
      const checkForExistingMealEntry = await findMealEntryByMealNameAndUserID(
        mealName,
        serverURL
      );

      if (!checkForExistingMealEntry === undefined &&(checkForExistingMealEntry.message = "No Meal Found")) {
        console.log("no meal found, creating meal entry");

        createMealsEntry(mealName, calories, protein, sugars, serverURL);
        // buildMealsSection();

        let allUserMeals = [];
        allUserMeals = await getAllUserMeals(serverURL, allUserMeals);

        console.log("all user meals: ", allUserMeals)

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
