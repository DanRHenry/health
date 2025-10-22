import { buildDailyMealsSection } from "../dailyMeals/buildDailyMealsSection.js";
import {toggleMealsSectionMenu} from "./toggleMealsSectionMenu.js"
export function buildMealsSection() {
  const mealsSectionTop = document.createElement("div");
  mealsSectionTop.id = "mealsSectionTop";
  mealsSectionTop.addEventListener("click", toggleMealsSectionMenu);

  const mealsTitle = document.createElement("div");
  mealsTitle.innerText = "Meals";
  mealsTitle.id = "mealsTitle";

  const mealsSectionBtn = document.createElement("span");
  mealsSectionBtn.innerText = "+";
  mealsSectionBtn.id = "mealsSectionBtn";

  const mealsSection = document.createElement("div");
  mealsSection.id = "mealsSection";

  mealsSectionTop.append(mealsTitle);

  document.getElementById("prevNextSection").after(mealsSectionTop);
  mealsSectionTop.after(mealsSection);

  // buildDailyMealsSection()
}