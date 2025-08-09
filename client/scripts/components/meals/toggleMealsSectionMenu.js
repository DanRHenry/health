export function toggleMealsSectionMenu() {
  if (!mealsSection.style.minHeight) {
    mealsSection.style.minHeight = "30vh";
  } else {
    mealsSection.style.minHeight = null;
  }
}