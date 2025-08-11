import { getWorkoutEntriesByUserAndDate } from "./workout/crud_functions/getWorkoutEntriesByUserAndDate.js";
import { getCardioEntriesByUserAndDate } from "./cardio/crud_functions/getCardioEntriesByUserAndDate.js";
import { getMealsEntriesByUserAndDate } from "./meals/crud_functions/getMealsEntriesByUserAndDate.js";
import { fillMenuContents } from "./fillMenuContents.js";
import { createMealsEntry } from "./meals/crud_functions/createMealsEntry.js";
import { getAllUserMeals } from "./meals/crud_functions/getAllUserMeals.js";

export async function createDataObject(userID, focusedDate, serverURL, allUserMeals) {

      allUserMeals = await getAllUserMeals(serverURL, allUserMeals);


  let today = new Date();

  let date = today.getDate().toString();
  if (date.length < 2) {
  date = date.padStart(2, "0");
}

  let dataObject = {};

  const workoutData = await getWorkoutEntriesByUserAndDate(
    userID,
    date,
    serverURL
  );
  const workoutArray = await workoutData.getWorkoutRecords;

  const cardioData = await getCardioEntriesByUserAndDate(
    userID,
    date,
    serverURL
  );
  const cardioArray = await cardioData.getCardioRecords;

  const mealsData = await getMealsEntriesByUserAndDate(userID, date, serverURL);
  const mealsDataArray = await mealsData.getMealsRecords;

  dataObject.workout = workoutArray;
  dataObject.cardio = cardioArray;
  dataObject.meals = mealsDataArray;

  fillMenuContents(serverURL, dataObject, focusedDate, allUserMeals);

  //!temporary test button section:
  const createMealBtn = document.createElement("button");
  createMealBtn.id = "createMealBtn";
  createMealBtn.textContent = "create meal";
  if (!document.getElementById("createMealBtn")) {
    document.getElementById("navbar").after(createMealBtn);
  }

  createMealBtn.addEventListener("click", () => {
    const calories = "200";
    const protein = 20;
    const sugars = 20;
    const mealName = "Testname";
    createMealsEntry(mealName, calories, protein, sugars, serverURL);
  });
}