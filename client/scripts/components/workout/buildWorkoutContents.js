export function buildWorkoutContents(workoutObject) {
  // console.log("bird")
  workoutSection.innerHTML = "";
  const workoutTable = document.createElement("table");
  workoutTable.id = "workoutTable";

  const workoutRow = document.createElement("tr");

  const workoutCheckHeader = document.createElement("th");
  workoutCheckHeader.innerText = "Select";
  workoutCheckHeader.className = "workoutHeaders";

  const workoutDateHeader = document.createElement("th");
  workoutDateHeader.innerText = "Date";
  workoutDateHeader.className = "workoutHeaders";

  const workoutNameHeader = document.createElement("th");
  workoutNameHeader.innerText = "Name";
  workoutNameHeader.className = "workoutHeaders";

  const workoutMachineHeader = document.createElement("th");
  workoutMachineHeader.innerText = "Machine";
  workoutMachineHeader.className = "workoutHeaders";

  const workoutLengthHeader = document.createElement("th");
  workoutLengthHeader.innerText = "Length";
  workoutLengthHeader.className = "workoutHeaders";

  workoutRow.append(
    workoutCheckHeader,
    // workoutDateHeader,
    workoutNameHeader,
    workoutMachineHeader,
    workoutLengthHeader
  );
  //---------------------------
  const workoutInputRow = document.createElement("tr");

  const workoutInputBtn = document.createElement("td");
  workoutInputBtn.id = "workoutInputBtn";
  workoutInputBtn.innerText = "";

  const workoutNameInputLocation = document.createElement("td");
  workoutNameInputLocation.id = "workoutNameInputLocation";
  workoutNameInputLocation.name = "workoutNameInputLocation";
  const workoutNameInput = document.createElement("input");
  workoutNameInput.id = "workoutNameInput";
  workoutNameInput.spellcheck = "false";
  workoutNameInput.addEventListener("keydown", handleWorkoutInputClick);
  workoutNameInputLocation.appendChild(workoutNameInput);

  const workoutMachineInputLocation = document.createElement("td");
  workoutMachineInputLocation.id = "workoutMachineInputLocation";
  workoutMachineInputLocation.name = "workoutMachineInputLocation";
  const workoutMachineInput = document.createElement("input");
  workoutMachineInput.id = `workoutMachineInput`;
  workoutMachineInput.spellcheck = "false";
  workoutMachineInput.addEventListener("keydown", handleWorkoutInputClick);
  workoutMachineInputLocation.appendChild(workoutMachineInput);

  const workoutLengthInputLocation = document.createElement("td");
  workoutLengthInputLocation.id = "workoutLengthInputLocation";
  workoutLengthInputLocation.name = "workoutLengthInputLocation";
  const workoutLengthInput = document.createElement("input");
  workoutLengthInput.id = "workoutLengthInput";
  workoutLengthInput.spellcheck = "false";
  workoutLengthInput.type = "number";
  workoutLengthInput.min = "0";
  workoutLengthInput.addEventListener("keypress", handleWorkoutInputClick);
  workoutLengthInputLocation.appendChild(workoutLengthInput);

  workoutInputRow.append(
    workoutInputBtn,
    workoutNameInputLocation,
    workoutMachineInputLocation,
    workoutLengthInputLocation
  );
  //------------------------
  workoutTable.append(workoutRow, workoutInputRow);

  workoutSection.append(workoutTable);

  if (workoutObject) {
    //-------------------------------
    for (let i = 0; i < workoutObject.length; i++) {
      let year = Number(workoutObject[i].dateCreated.slice(4));
      const date = Number(workoutObject[i].dateCreated.slice(2, 4));

      const month = Number(workoutObject[i].dateCreated.slice(0, 2));
      const dateText = `${month}/${date}/${year}`;
      const nameText = workoutObject[i].exerciseName;
      const machineText = workoutObject[i].machine;
      const lengthText = `${workoutObject[i].duration} min`;

      const workoutRow = document.createElement("tr");
      workoutRow.className = "workoutRows";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.className = "workoutCheckboxes";
      checkBox.id = `workoutCheckbox${i}`;
      checkBox.addEventListener("change", function () {
        const deleteRowSection = document.createElement("tr");
        deleteRowSection.id = `deleteWorkoutRowSection_${i}`;
        deleteRowSection.className = "deleteRows workoutRows";
        const spacer = document.createElement("td");
        spacer.style.backgroundColor = "initial";
        const deleterow = document.createElement("td");
        // deleterow.id = `workoutDeleteRow_${i}`
        deleterow.className = "workoutDeleteRowButtons";
        deleterow.addEventListener("click", () => {
          // console.log(workoutObject[i])
          deleteWorkoutEntry(workoutObject[i]._id);
        });
        deleteRowSection.append(spacer, deleterow);

        if (this.checked) {
          // workoutRow.style.backgroundColor = "red"
          workoutRow.style.textDecoration = "line-through";
          deleterow.innerText = "Delete?";
          deleterow.col;
          deleterow.colSpan = "3";
          workoutRow.after(deleteRowSection);
        } else if (!this.checked) {
          workoutRow.style.textDecoration = null;
          console.log("i", i);
          const deleteRowSection = document.getElementById(
            `deleteWorkoutRowSection_${i}`
          );
          deleteRowSection.remove();
        }
      });

      const workoutDate = document.createElement("td");
      workoutDate.innerText = dateText;
      workoutDate.className = "workoutDates";

      const workoutName = document.createElement("td");
      workoutName.innerText = nameText;
      workoutName.className = "workoutNames";

      const workoutMachine = document.createElement("td");
      workoutMachine.innerText = machineText;
      workoutMachine.className = "workoutMachines";

      const workoutLength = document.createElement("td");
      workoutLength.innerText = lengthText;
      workoutLength.className = "workoutLengths";
      workoutRow.append(
        checkBox,
        // workoutDate,
        workoutName,
        workoutMachine,
        workoutLength
      );
      workoutTable.append(workoutRow);
    }
  }

  async function handleWorkoutInputClick(e) {
  // console.log(e.key)
  if (e.key !== "Enter") {
    return;
  }

  const workoutName = document.getElementById("workoutNameInput").value;

  const workoutMachine = document.getElementById("workoutMachineInput").value;

  const workoutLength = document.getElementById("workoutLengthInput").value;

  // console.log("clicked", workoutName, workoutMachine, workoutLength);

  if (workoutName && workoutMachine && workoutLength) {
    console.log("new workout: ", workoutName, workoutMachine, workoutLength);
    await createWorkoutEntry(workoutName, workoutMachine, workoutLength);

    await createDataObject(sessionStorage.userID, focusedDate);
  }
}

}