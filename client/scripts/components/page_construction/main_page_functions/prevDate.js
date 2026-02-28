import { updateSessionStorageWeightEntry } from "../main_page_functions/updateSessionStorageWeightEntry.js";
import { createDataObject } from "../../createDataObject.js";

export     async function prevDate(serverURL, dateOffset, today, weekdays, focusedDate, allUserMeals) {
      dateOffset--;
      let adjustedDate = new Date(today);
      adjustedDate.setDate(today.getDate() + dateOffset);

      let month = (adjustedDate.getMonth() + 1).toString();
      let adjustedMonth = +month;

      if (month.length < 2) {
        month = month.padStart(2, "0");
      }

      let date = adjustedDate.getDate().toString();
      if (date.length < 2) {
        date = date.padStart(2, "0");
      }

      let dateDisplayInfo = `${
        weekdays[adjustedDate.getDay()]
      }, ${adjustedMonth}/${adjustedDate.getDate()}/${adjustedDate.getFullYear()}`;

      focusedDate = `${month}${date}${adjustedDate.getFullYear()}`;

      dateDisplay.innerText = dateDisplayInfo;
      createDataObject(
        sessionStorage.userID,
        focusedDate,
        serverURL,
        allUserMeals,
      );
      document.getElementById("dailyCalories").innerText = 0;

      updateSessionStorageWeightEntry(focusedDate, dateOffset);
      calculateCalorieLimits();
      updateCalories();
    }