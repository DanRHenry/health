export function buildMealsWindow() {
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

  prevNextSection.after(mealsSectionTop);
  mealsSectionTop.after(mealsSection);
}