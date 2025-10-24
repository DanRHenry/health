export function buildCardioContents(cardioObject) {
  cardioSection.innerHTML = "";
  const cardioTable = document.createElement("table");

  const cardioRow = document.createElement("tr");

  const cardioCheckHeader = document.createElement("th");
  cardioCheckHeader.innerText = "Select";
  cardioCheckHeader.className = "cardioHeaders";

  const cardioDateHeader = document.createElement("th");
  cardioDateHeader.innerText = "Date";
  cardioDateHeader.className = "cardioHeaders";

  const cardioNameHeader = document.createElement("th");
  cardioNameHeader.innerText = "Name";
  cardioNameHeader.className = "cardioHeaders";

  const cardioMachineHeader = document.createElement("th");
  cardioMachineHeader.innerText = "Machine";
  cardioMachineHeader.className = "cardioHeaders";

  const cardioLengthHeader = document.createElement("th");
  cardioLengthHeader.innerText = "Length";
  cardioLengthHeader.className = "cardioHeaders";

  cardioRow.append(
    cardioCheckHeader,
    // cardioDateHeader,
    cardioNameHeader,
    cardioMachineHeader,
    cardioLengthHeader
  );

  //---------------------------
  const cardioInputRow = document.createElement("tr");

  const cardioInputBtn = document.createElement("td");
  cardioInputBtn.id = "cardioInputBtn";
  cardioInputBtn.innerText = "";
  // cardioInputBtn.addEventListener("click", handleCardioInputClick);

  const cardioNameInputLocation = document.createElement("td");
  cardioNameInputLocation.id = "cardioNameInputLocation";
  cardioNameInputLocation.name = "cardioNameInputLocation";
  const cardioNameInput = document.createElement("input");
  cardioNameInput.id = "cardioNameInput";
  cardioNameInput.spellcheck = "false";
  cardioNameInputLocation.appendChild(cardioNameInput);
  cardioNameInput.addEventListener("keydown", handleCardioInputClick);

  const cardioMachineInputLocation = document.createElement("td");
  cardioMachineInputLocation.id = "cardioMachineInputLocation";
  cardioMachineInputLocation.name = "cardioMachineInputLocation";
  const cardioMachineInput = document.createElement("input");
  cardioMachineInput.id = "cardioMachineInput";
  cardioMachineInput.spellcheck = "false";
  cardioMachineInput.addEventListener("keydown", handleCardioInputClick);
  cardioMachineInputLocation.appendChild(cardioMachineInput);

  const cardioLengthInputLocation = document.createElement("td");
  cardioLengthInputLocation.id = "cardioLengthInputLocation";
  cardioLengthInputLocation.name = "cardioLengthInputLocation";
  const cardioLengthInput = document.createElement("input");
  cardioLengthInput.id = "cardioLengthInput";
  cardioLengthInput.spellcheck = "false";
  cardioLengthInput.type = "number";
  cardioLengthInput.min = "0";
  cardioLengthInput.addEventListener("keydown", handleCardioInputClick);

  cardioLengthInputLocation.appendChild(cardioLengthInput);

  cardioInputRow.append(
    cardioInputBtn,
    cardioNameInputLocation,
    cardioMachineInputLocation,
    cardioLengthInputLocation
  );

  cardioTable.append(cardioRow, cardioInputRow);

  cardioSection.append(cardioTable);
  //-------------------------------
  if (cardioObject) {
    for (let i = 0; i < cardioObject.length; i++) {
      let year = Number(cardioObject[i].date.slice(4));
      const date = Number(cardioObject[i].date.slice(2, 4));

      const month = Number(cardioObject[i].date.slice(0, 2));
      const dateText = `${month}/${date}/${year}`;
      const nameText = cardioObject[i].exerciseName;
      const machineText = cardioObject[i].machine;
      const lengthText = `${cardioObject[i].duration} min`;

      const cardioRow = document.createElement("tr");
      cardioRow.className = "cardioRows";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "cardioCheckboxes";
      checkBox.id = `cardioCheckbox${i}`;

      checkBox.addEventListener("change", function () {
        const deleteRowSection = document.createElement("tr");
        deleteRowSection.id = `deleteCardioRowSection_${i}`;
        deleteRowSection.className = "deleteRows cardioRows";
        const spacer = document.createElement("td");
        spacer.style.backgroundColor = "initial";
        const deleterow = document.createElement("td");
        // deleterow.id = `cardioDeleteRow_${i}`
        deleterow.className = "cardioDeleteRowButtons";
        deleterow.addEventListener("click", () => {
          // console.log(cardioObject[i])
          deleteCardioEntry(cardioObject[i]._id);
        });
        deleteRowSection.append(spacer, deleterow);

        if (this.checked) {
          // cardioRow.style.backgroundColor = "red"
          cardioRow.style.textDecoration = "line-through";
          deleterow.innerText = "Delete?";
          deleterow.col;
          deleterow.colSpan = "3";
          cardioRow.after(deleteRowSection);
        } else if (!this.checked) {
          cardioRow.style.textDecoration = null;
          console.log("i", i);
          const deleteRowSection = document.getElementById(
            `deleteCardioRowSection_${i}`
          );
          deleteRowSection.remove();
        }
      });

      const cardioDate = document.createElement("td");
      cardioDate.innerText = dateText;
      cardioDate.className = "cardioDates";

      const cardioName = document.createElement("td");
      cardioName.innerText = nameText;
      cardioName.className = "cardioNames";
      cardioName.addEventListener("click", handleCardioNameClick);

      async function handleCardioNameClick() {
        cardioName.removeEventListener("click", handleCardioNameClick);
        const cardioNameInput = document.createElement("input");
        cardioNameInput.placeholder = cardioName.innerText;
        cardioName.innerText = null;
        cardioName.appendChild(cardioNameInput);
        cardioNameInput.focus();
        cardioNameInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && cardioNameInput.value !== null) {
            const updateObject = {
              exerciseName: cardioNameInput.value,
            };
            updateCardioEntry(updateObject, cardioObject[i]._id);

            console.log(sessionStorage.userID);
            console.log(focusedDate);

            // createDataObject(sessionStorage.userID, focusedDate);
            // createDataObject(userID, date)
            buildCardioContents(object.cardioObject);
          }
        });
      }

      const cardioMachine = document.createElement("td");
      cardioMachine.innerText = machineText;
      cardioMachine.className = "cardioMachines";
      cardioMachine.addEventListener("click", handleCardioMachineClick);

      async function handleCardioMachineClick() {
        cardioMachine.removeEventListener("click", handleCardioMachineClick);
        const cardioMachineInput = document.createElement("input");
        cardioMachineInput.placeholder = cardioMachine.innerText;
        cardioMachine.innerText = null;
        cardioMachine.appendChild(cardioMachineInput);
        cardioMachineInput.focus();
        cardioMachineInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && cardioMachineInput.value !== null) {
            const updateObject = {
              machine: cardioMachineInput.value,
            };
            updateCardioEntry(updateObject, cardioObject[i]._id);

            console.log(sessionStorage.userID);
            console.log(focusedDate);

            // createDataObject(sessionStorage.userID, focusedDate);
            // createDataObject(userID, date)
            buildCardioContents(object.cardioObject);
          }
        });
      }

      const cardioLength = document.createElement("td");
      cardioLength.innerText = lengthText;
      cardioLength.className = "cardioLengths";
      cardioLength.addEventListener("click", handleCardioLengthClick);

      async function handleCardioLengthClick() {
        cardioLength.removeEventListener("click", handleCardioLengthClick);
        const cardioLengthInput = document.createElement("input");
        cardioLengthInput.placeholder = cardioLength.innerText;
        cardioLength.innerText = null;
        cardioLength.appendChild(cardioLengthInput);
        cardioLengthInput.focus();
        cardioLengthInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter" && cardioLengthInput.value !== null) {
            const updateObject = {
              duration: cardioLengthInput.value,
            };
            updateCardioEntry(updateObject, cardioObject[i]._id);

            console.log(sessionStorage.userID);
            console.log(focusedDate);

            // createDataObject(sessionStorage.userID, focusedDate);
            // createDataObject(userID, date)
            buildCardioContents(object.cardioObject);
          }
        });
      }

      cardioRow.append(
        checkBox,
        // cardioDate,
        cardioName,
        cardioMachine,
        cardioLength
      );
      cardioTable.append(cardioRow);
    }
  }
  async function handleCardioInputClick(e) {
  // console.log(e.key)
  if (e.key !== "Enter") {
    return;
  }

  const cardioName = document.getElementById("cardioNameInput").value;

  const cardioMachine = document.getElementById("cardioMachineInput").value;

  const cardioLength = document.getElementById("cardioLengthInput").value;

  // console.log("clicked", cardioName, cardioMachine, cardioLength);

  if (cardioName && cardioMachine && cardioLength) {
    console.log("new cardio:", cardioName, cardioMachine, cardioLength);
    await createCardioEntry(cardioName, cardioMachine, cardioLength);
    await createDataObject(sessionStorage.userID, focusedDate);
  }
}
}