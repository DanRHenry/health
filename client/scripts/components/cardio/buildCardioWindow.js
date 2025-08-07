import {toggleCardioSectionMenu} from "./toggleCardioSectionMenu.js"
export function buildCardioWindow() {
  const cardioSectionTop = document.createElement("div");
  cardioSectionTop.id = "cardioSectionTop";
  cardioSectionTop.addEventListener("click", toggleCardioSectionMenu);

  const cardioTitle = document.createElement("div");
  cardioTitle.innerText = "Cardio";
  cardioTitle.id = "cardioTitle";

  const cardioSectionBtn = document.createElement("span");
  cardioSectionBtn.innerText = "-";
  cardioSectionBtn.id = "cardioSectionBtn";

  const cardioSection = document.createElement("div");
  cardioSection.id = "cardioSection";

  cardioSectionTop.append(cardioTitle);

  prevNextSection.after(cardioSectionTop);
  cardioSectionTop.after(cardioSection);
}