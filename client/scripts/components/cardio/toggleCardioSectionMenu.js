export function toggleCardioSectionMenu() {
  if (!cardioSection.style.minHeight) {
    cardioSection.style.maxHeight = null;
    cardioSection.style.minHeight = "30vh";
    cardioSection.style.height = "fit-content";
  } else {
    cardioSection.style.minHeight = null;
    cardioSection.style.maxHeight = 0;
  }
}