import {buildWorkoutContents} from "./workout/buildWorkoutContents.js"
import { buildCardioContents } from "./cardio/buildCardioContents.js";
import {buildMealsContents} from "./meals/buildMealsContents.js"

export async function fillMenuContents(serverURL, object, focusedDate, allUserMeals) {

  //! Workout
  buildWorkoutContents(object.workout);

  //! Cardio
  buildCardioContents(object.cardio);
  
  //! Meals
  buildMealsContents(object.meals, allUserMeals, focusedDate);
}