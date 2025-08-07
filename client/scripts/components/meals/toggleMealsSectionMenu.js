export function toggleMealsSectionMenu() {
  if (!mealsSection.style.minHeight) {
    mealsSection.style.maxHeight = null;
    // mealsSection.style.minHeight = "30vh";
    mealsSection.style.height = "fit-content";
  } else {
    // mealsSection.style.minHeight = null;
    // mealsSection.style.maxHeight = 0;
  }
}