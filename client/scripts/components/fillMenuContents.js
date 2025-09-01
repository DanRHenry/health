import {buildWorkoutContents} from "./workout/buildWorkoutContents.js"
import { buildCardioContents } from "./cardio/buildCardioContents.js";
import {buildMealsContents} from "./meals/buildMealsContents.js"
// import { buildDailyMealsSection } from "./dailyMeals/buildDailyMealsSection.js";
import {fillDailyMealsContent} from "./dailyMeals/fillDailyMealsContent.js"

export async function fillMenuContents(serverURL, object, focusedDate, allUserMeals) {
  console.log("fillingMenuContents...")

  //! Workout
  // buildWorkoutContents(object.workout);

  //! Cardio
  // buildCardioContents(object.cardio);
  
  //! Meals
  buildMealsContents(object.meals, allUserMeals, focusedDate);

  //! DailyMeals
  // buildDailyMealsSection(focusedDate)

  fillDailyMealsContent(focusedDate)
}