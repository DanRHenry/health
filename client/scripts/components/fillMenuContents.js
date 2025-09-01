import {buildWorkoutContents} from "./workout/buildWorkoutContents.js"
import { buildCardioContents } from "./cardio/buildCardioContents.js";
import {buildMealsContents} from "./meals/buildMealsContents.js"
// import { buildDailyMealsSection } from "./dailyMeals/buildDailyMealsSection.js";
import {fillDailyMealsContent} from "./dailyMeals/fillDailyMealsContent.js"

export async function fillMenuContents(serverURL, object, focusedDate, allUserMeals) {
  console.log("fillingMenuContents...")

  //! Workout
  // await buildWorkoutContents(object.workout);

  //! Cardio
  // await buildCardioContents(object.cardio);
  
  //! Meals
  await buildMealsContents(object.meals, allUserMeals, focusedDate);

  //! DailyMeals
  // buildDailyMealsSection(focusedDate)

  await fillDailyMealsContent(focusedDate)
}