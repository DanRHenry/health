import { openMealsIngredientsInputDropdownSection } from "./openMealsIngredientsInputDropdownSection.js";

export function closeMealsIngredientsInputDropdownSection() {
  document.getElementById("mealsIngredientsInputDropdownBtn").removeEventListener(
    "click",
    closeMealsIngredientsInputDropdownSection
  );
  document
    .getElementById("mealsIngredientsInputDropdownBtn")
    .addEventListener("click", openMealsIngredientsInputDropdownSection);
  // mealsIngredientsInputDropdown.style.height = "0"
  document.getElementById("mealsIngredientsInputDropdownBtn").style.transform =
    null;
  // console.log("clicked")
  document.getElementById("mealsIngredientsSection").remove();
}