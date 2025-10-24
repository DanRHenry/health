export function toggleMealsSectionMenu() {
  if (!mealsSection.style.minHeight) {
    // mealsSection.style.minHeight = "30vh";
        mealsSection.style.minHeight = "fit-content";
  } else {
    mealsSection.style.minHeight = null;
  }
}