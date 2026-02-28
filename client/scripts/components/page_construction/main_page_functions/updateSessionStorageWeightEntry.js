import { getWeightEntry } from "../../weight/crud_functions/getWeightEntry.js";

export async function updateSessionStorageWeightEntry(focusedDate, dateOffset) {
  let weightData = await getWeightEntry(focusedDate);
  if (weightData == undefined) {
    const weight = await checkPreviousDateForWeightEntry(weightData);
  }
  sessionStorage.setItem("weight", weightData);
  dailyWeight.innerText = weightData;

    async function checkPreviousDateForWeightEntry(weightData) {
      let tempOffset = dateOffset;
      let tempFocusedDate = focusedDate;
      let today = new Date();
  
      for (let i = 7; i > 0; i--) {
        tempOffset--;
        let adjustedDate = new Date(today);
        adjustedDate.setDate(today.getDate() + tempOffset);
  
        let month = (adjustedDate.getMonth() + 1).toString();
        let adjustedMonth = +month;
  
        if (month.length < 2) {
          month = month.padStart(2, "0");
        }
  
        let date = adjustedDate.getDate().toString();
        if (date.length < 2) {
          date = date.padStart(2, "0");
        }
        tempFocusedDate = `${month}${date}${adjustedDate.getFullYear()}`;
        weightData = await getWeightEntry(tempFocusedDate);
  
        const foundWeight = await weightData;
        if (foundWeight) {
          i = 0;
        }
      }
      if (foundWeight) {
        return foundWeight;
      } else {
        return 0;
      }
    }
  
}
