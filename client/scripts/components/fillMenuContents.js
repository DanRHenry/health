import { updatemealsByDay } from "./meals/crud_functions/updateMealsByDay.js";
import {buildWorkoutContents} from "./workout/buildWorkoutContents.js"
import { buildCardioContents } from "./cardio/buildCardioContents.js";
import {buildMealsContents} from "./meals/buildMealsContents.js"
export async function fillMenuContents(serverURL,object, mealsByDay, focusedDate, allUserMeals) {
  mealsByDay = [];

  await updatemealsByDay(serverURL, focusedDate);

  //! Routines
  // buildRoutinesContents(object.routines)
  //! Workout
  buildWorkoutContents(object.workout);

  //! Cardio
  buildCardioContents(object.cardio);
  
  //! Meals
  buildMealsContents(object.meals, allUserMeals);
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