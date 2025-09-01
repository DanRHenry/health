import { serverURL } from "../../../../helpers/serverURL.js";

export async function createMealsEntry(
  mealsNameInput,
  caloriesInput,
  proteinInput,
  sugarsInput,
) {

  try {
  const mealsEntryBody = JSON.stringify({
    mealName: mealsNameInput,
    calories: caloriesInput,
    protein: proteinInput,
    sugars: sugarsInput,
    userID: sessionStorage.userID,
  });

  const URL = `${serverURL}/meals/create`;

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
    body: mealsEntryBody,
  });

  const data = await res.json();
  if (data.message != "No Records Found.") {
    console.log("Meals Records: ", data);
  } 
  } catch (err) {
    console.error(err)
  }
}