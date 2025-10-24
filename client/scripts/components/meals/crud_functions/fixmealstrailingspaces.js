import { getAllUserMeals } from "./getAllUserMeals.js";
import { updateMealsEntry } from "./updateMealsEntry.js";
import { serverURL } from "../../../../helpers/serverURL.js";
import { findMealEntryByMealNameAndUserID } from "./findMealEntryByMealNameAndUserID.js";

export async function fixmealstrailingspaces() {
  const allMeals = await getAllUserMeals();

  // console.log("allUserMeals: ",allMeals)
  // console.log("length", allMeals.length)

  for (let i = 0; i < allMeals.length; i++) {
    const lastCharacter = allMeals[i][allMeals[i].length - 1];
    // console.log(lastCharacter)

    if (lastCharacter === " ") {
      console.log("---- this qualifies ----")
      const mealInfo = await findMealEntryByMealNameAndUserID(
        allMeals[i],
        serverURL
      );

      console.log("---- mealInfo ---- ", mealInfo)
      if (mealInfo === "not found") {
          console.log("---- no meal info found ----")
        // console.log(mealInfo)
      } else {
          console.log(mealInfo);
console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      const updateName = await mealInfo.getMealsByNameAndUserID.mealName;
      if (updateName[updateName.length - 1] === " ") {
        console.log("update this: ", `"${updateName}"`, updateName.length);

        try {
            // console.log(mealInfo.getMealsByNameAndUserID)
        const URL = `${serverURL}/meals/updatewithmealid${mealInfo.getMealsByNameAndUserID._id}`;
            const updatedNameBody = {"mealName": updateName.trim()}

          const res = await fetch(URL, {
            method: "PATCH",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: sessionStorage.token,
            },
            body: JSON.stringify(updatedNameBody),
          });
          const data = await res.json();
          console.log(data);
        //   document.getElementById("mealUpdateConfirmationLine").remove();
        } catch (err) {
          console.error(err);
        }
        }
      }
      // console.log(allMeals[i])
              updateMealsEntry({
            mealName: allMeals[i].trim(),
            // mealTime: mealTimeInput,
            // calories: caloriesInput,
            // protein: proteinInput,
            // sugars: sugarsInput,
            userID: sessionStorage.userID,
            // date: focusedDate,
          });
    }
  }
}
