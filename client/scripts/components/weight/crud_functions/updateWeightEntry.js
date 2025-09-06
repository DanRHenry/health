import { serverURL } from "../../../../helpers/serverURL.js";
import { calculateCalorieLimits } from "../../meals/calculateCalorieLimits.js";
import { createWeightEntry } from "./createWeightEntry.js";

export async function updateWeightEntry(weight, focusedDate) {
  try {
    console.log("weight: ",weight)
    const URL = `${serverURL}/weight/update`;

    const res = await fetch(URL, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.token,
      },
      body: JSON.stringify({
        weight: weight,
        date: focusedDate,
        userID: sessionStorage.userID,
      }),
    });
    let data = await res.json();
    console.log(data);

    if (data.message === "Weight Entry Not Found.") {
        console.log(data.message)
        console.log("creatingWeightEntry")
        data = await createWeightEntry(weight, focusedDate)

    }
    console.log(weight)
        sessionStorage.weight = weight
        calculateCalorieLimits();

  } catch (err) {
    console.error(err);
  }
}
