export function toggleWorkoutSectionMenu() {
  if (!workoutSection.style.minHeight) {
    workoutSection.style.maxHeight = null;
    workoutSection.style.minHeight = "30vh";
    workoutSection.style.height = "fit-content";
  } else {
    workoutSection.style.minHeight = null;
    workoutSection.style.maxHeight = 0;
  }
}