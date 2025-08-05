export function buildMealsContents(mealsObject) {
  // console.log("mealsObject: ", mealsObject);
  // console.log("bird")
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
  //---------------------------
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
  mealsNameInput.addEventListener("keydown", handleMealsInputClick);
  mealsNameInput.addEventListener("change", handleMealsInputChange);

  const mealsNameInputDropdown = document.createElement("datalist");
  mealsNameInputDropdown.id = "mealsNameInputDropdown";

  for (let i = 0; i < allUserMeals.length; i++) {
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
  mealsIngredientsInputDropdownBtn.addEventListener(
    "click",
    openMealsIngredientsInputDropdownSection
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
  //------------------------
  mealsTable.append(mealsRow, mealsInputRow);

  mealsSection.append(mealsTable);

  if (mealsObject) {
    console.log("mealsObject: ", mealsObject);
    //-------------------------------
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

      // const
      // const mealsCalories = document.createElement("td");
      // mealsCalories.innerText = machineText;
      // mealsCalories.className = "mealsCalories";

      // const mealsLength = document.createElement("td");
      // mealsLength.innerText = lengthText;
      // mealsLength.className = "mealsLengths";
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
}