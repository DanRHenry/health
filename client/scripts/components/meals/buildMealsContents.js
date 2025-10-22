import { openMealsIngredientsInputDropdownSection } from "./openMealsIngredientsInputDropdownSection.js";
import { findMealEntryByMealNameAndUserID } from "./crud_functions/findMealEntryByMealNameAndUserID.js";
import { serverURL } from "../../../helpers/serverURL.js";
import { getAllUserMeals } from "./crud_functions/getAllUserMeals.js";
import { getDailyMealsEntries } from "../dailyMeals/crud_functions/getDailyMealsEntries.js";
// import { buildDailyMealsSection } from "../dailyMeals/buildDailyMealsSection.js";
import {createDailyMealsEntry} from "../dailyMeals/crud_functions/createDailyMealsEntry.js"

export async function buildMealsContents(
  mealsObject,
  allUserMeals,
  focusedDate
) {
  let mealData;
      allUserMeals = await getAllUserMeals(serverURL, allUserMeals);
      // console.log("buildingMealsContents...")
      // console.log("allUserMeals: ",allUserMeals)
  mealsSection.innerHTML = "";
  const mealsTable = document.createElement("table");
  mealsTable.id = "mealsTable";

  const mealsRow = document.createElement("tr");

  const mealsCheckHeader = document.createElement("th");
  mealsCheckHeader.innerText = "Select";
  mealsCheckHeader.className = "mealsHeaders";

  const mealsNameHeader = document.createElement("th");
  mealsNameHeader.innerText = "Name";
  mealsNameHeader.className = "mealsHeaders";

  const mealsIngredientsHeader = document.createElement("th");
  mealsIngredientsHeader.innerText = "Ingredients";
  mealsIngredientsHeader.className = "mealsHeaders";

  mealsRow.append(mealsCheckHeader, mealsNameHeader, mealsIngredientsHeader);

  const mealsInputRow = document.createElement("tr");

  const mealsInputBtn = document.createElement("td");
  mealsInputBtn.id = "mealsInputBtn";
  mealsInputBtn.innerText = "";

  const mealsNameInputLocation = document.createElement("td");
  mealsNameInputLocation.id = "mealsNameInputLocation";
  mealsNameInputLocation.name = "mealsNameInputLocation";

  const mealsNameInput = document.createElement("input");
  mealsNameInput.type = "text";
  mealsNameInput.setAttribute("list", "mealsNameInputDropdown");
  mealsNameInput.id = "mealsNameInput";
  mealsNameInput.name = "mealsNameInput";
  mealsNameInput.spellcheck = "false";
  mealsNameInput.autocomplete = "off";
  
  // mealsNameInput.addEventListener("keydown", handleMealsInputClick);
  mealsNameInput.addEventListener("change", handleMealsInputChange);
  mealsNameInput.addEventListener("click", () => {
    if (mealsNameInput.value !== "") {
      mealsNameInput.value = "";
      mealsNameInput.blur();
      mealsNameInput.focus();
    }
  });

  const mealsNameInputDropdown = document.createElement("datalist");
  mealsNameInputDropdown.id = "mealsNameInputDropdown";

  // console.log(allUserMeals)
  for (let i = 0; i < allUserMeals.length; i++) {
    // console.log("allUserMeals[i]",allUserMeals[i])
    const mealsNameInputDropdownListItem = document.createElement("option");
    mealsNameInputDropdownListItem.value = allUserMeals[i];
    mealsNameInputDropdownListItem.innerText = allUserMeals[i];
    mealsNameInputDropdown.append(mealsNameInputDropdownListItem);
  }

  mealsNameInput.append(mealsNameInputDropdown);

  mealsNameInputLocation.append(mealsNameInput);

  const mealsIngredientsInputLocation = document.createElement("td");
  mealsIngredientsInputLocation.id = "mealsIngredientsInputLocation";
  mealsIngredientsInputLocation.name = "mealsIngredientsInputLocation";

  const mealsIngredientsInputDropdown = document.createElement("div");
  mealsIngredientsInputDropdown.id = "mealsIngredientsInputDropdown";

  const mealsIngredientsInputDropdownBtn = document.createElement("button");
  mealsIngredientsInputDropdownBtn.id = "mealsIngredientsInputDropdownBtn";
  mealsIngredientsInputDropdownBtn.innerText = "^";
    mealsIngredientsInputDropdownBtn.style.zIndex = "-1"
  mealsIngredientsInputDropdownBtn.style.visibility = "hidden"
  mealsIngredientsInputDropdownBtn.addEventListener(
    "click", () => {
      // console.log("allUserMeals: ",allUserMeals)
          openMealsIngredientsInputDropdownSection(
            focusedDate,
            allUserMeals
          );
    }
  );

  mealsIngredientsInputLocation.append(mealsIngredientsInputDropdownBtn);

  mealsInputRow.append(
    mealsInputBtn,
    mealsNameInputLocation,
    mealsIngredientsInputLocation
    // mealsCaloriesInputLocation,
    // mealsProteinInputLocation,
    // mealsSugarsInputLocation
  );

  const dailyMealsHeadersRow = document.createElement("tr")

  const dailyMealNameHeader = document.createElement("th")
  dailyMealNameHeader.innerText = "Name"
  // dailyMealNameHeader.className = "mealsHeaders"

  const dailyMealTimeHeader = document.createElement("th")
  dailyMealTimeHeader.innerText = "Type"
  // dailyMealTimeHeader.className = "mealsHeaders"

  const dailyMealCaloriesHeader = document.createElement("th")
  dailyMealCaloriesHeader.innerText = "Cals"
  // dailyMealCaloriesHeader.className = "mealsHeaders"

  dailyMealsHeadersRow.append(dailyMealNameHeader, dailyMealTimeHeader, dailyMealCaloriesHeader)

  mealsTable.append(mealsRow, mealsInputRow, dailyMealsHeadersRow);

  mealsSection.append(mealsTable);

  if (mealsObject) {
    for (let i = 0; i < mealsObject.length; i++) {
      let year = Number(mealsObject[i].date.slice(4));
      const date = Number(mealsObject[i].date.slice(2, 4));

      const month = Number(mealsObject[i].date.slice(0, 2));
      console.log(mealsObject[i]);
      const dateText = `${month}/${date}/${year}`;
      const nameText = mealsObject[i].mealName;

      const mealsRow = document.createElement("tr");
      mealsRow.className = "mealsRows";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "mealsCheckboxes";
      checkBox.id = `mealsCheckbox${i}`;
      checkBox.addEventListener("change", function () {
        const deleteRowSection = document.createElement("tr");
        deleteRowSection.id = `deleteMealsRowSection_${i}`;
        deleteRowSection.className = "deleteRows mealsRows";
        const spacer = document.createElement("td");
        spacer.style.backgroundColor = "initial";
        const deleterow = document.createElement("td");
        // deleterow.id = `mealsDeleteRow_${i}`
        deleterow.className = "mealsDeleteRowButtons";
        deleterow.addEventListener("click", () => {
          // console.log(mealsObject[i])
          deleteMealsEntry(mealsObject[i]._id);
        });
        deleteRowSection.append(spacer, deleterow);

        if (this.checked) {
          // mealsRow.style.backgroundColor = "red"
          mealsRow.style.textDecoration = "line-through";
          deleterow.innerText = "Delete?";
          deleterow.col;
          deleterow.colSpan = "3";
          mealsRow.after(deleteRowSection);
        } else if (!this.checked) {
          mealsRow.style.textDecoration = null;
          console.log("i", i);
          const deleteRowSection = document.getElementById(
            `deleteMealsRowSection_${i}`
          );
          deleteRowSection.remove();
        }
      });

      const mealsDate = document.createElement("td");
      mealsDate.innerText = dateText;
      mealsDate.className = "mealsDates";

      const mealsName = document.createElement("td");
      mealsName.innerText = nameText;
      mealsName.className = "mealsNames";

      mealsRow.append(
        checkBox,
        // mealsDate,
        mealsName
        // mealsCalories,
        // mealsLength
      );
      mealsTable.append(mealsRow);
    }
  }


const info = await getDailyMealsEntries(focusedDate)

  async function handleMealsInputChange() {
    for (let i = 0; i < allUserMeals.length; i++) {
          // console.log("allUserMeals[i]",allUserMeals[i])
          // console.log(mealsNameInput.value)
      if (allUserMeals[i] === mealsNameInput.value) {
        // console.log("match");
        mealData = await findMealEntryByMealNameAndUserID(
          mealsNameInput.value,
          serverURL
        );
        console.log("mealData: ", mealData);
        const mealInfo = mealData.getMealsByNameAndUserID;

        console.log(mealInfo)
          
        if (!document.getElementById("mealsIngredientsSection")) {
          console.log("focusedDateOutput: ",focusedDate)
          openMealsIngredientsInputDropdownSection(
            // handleMealsInputClick,
            focusedDate,
            allUserMeals
          );
        }
        // console.log(mealInfo)
                if (mealInfo) {

        console.log(mealInfo.calories)
        // console.log(mealInfo.mealTime)

        // const mealTimeInput = document.getElementById("mealTimeInput")
        // mealTimeInput.value = mealInfo.mealTime;

        const caloriesInput = document.getElementById("caloriesInput")
         caloriesInput.value = mealInfo.calories;
        // document.getElementById("proteinInput").value = mealInfo.protein;
        // document.getElementById("sugarsInput").value = mealInfo.sugars;

        }
      }
    }
    const dailyMeals = await getDailyMealsEntries(focusedDate)
    console.log(dailyMeals)

    // buildDailyMealsSection()
  }

  mealsIngredientsInputDropdownBtn.click()

}
