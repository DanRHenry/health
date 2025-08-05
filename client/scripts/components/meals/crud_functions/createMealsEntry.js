export async function createMealsEntry(
  mealsNameInput,
  mealTimeInput,
  caloriesInput,
  proteinInput,
  sugarsInput
) {
  const mealsEntryBody = JSON.stringify({
    mealName: mealsNameInput,
    mealTime: mealTimeInput,
    calories: caloriesInput,
    protein: proteinInput,
    sugars: sugarsInput,
    userID: sessionStorage.userID,
    date: focusedDate,
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
  } else {
    console.log("Is there any Meals data?");
  }
}