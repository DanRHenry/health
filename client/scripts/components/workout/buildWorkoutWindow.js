export function buildWorkoutWindow() {
  const workoutSectionTop = document.createElement("div");
  workoutSectionTop.id = "workoutSectionTop";
  workoutSectionTop.addEventListener("click", toggleWorkoutSectionMenu);

  const workoutTitle = document.createElement("div");
  workoutTitle.innerText = "Workout";
  workoutTitle.id = "workoutTitle";

  const workoutSectionBtn = document.createElement("span");
  workoutSectionBtn.innerText = "+";
  workoutSectionBtn.id = "workoutSectionBtn";

  const workoutSection = document.createElement("div");
  workoutSection.id = "workoutSection";

  workoutSectionTop.append(workoutTitle);

  prevNextSection.after(workoutSectionTop);
  workoutSectionTop.after(workoutSection);
  // buildWorkoutContents();
}