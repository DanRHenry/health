import { serverURL } from "../../../../helpers/serverURL.js";
export async function getAllUserMeals() {  
  try{
  const allUserMeals = []
  const res = await fetch(
    `${serverURL}/meals/findbyuser${sessionStorage.userID}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionStorage.token,
        },
      }
  );

  const data = await res.json();
  console.log("mealdata: ",data)
  for (let i = 0; i < data.mealNames.length; i++) {
    allUserMeals.push(data.mealNames[i]);
    // allUserMeals.push(data)
  }
  return allUserMeals;
  } catch (err) {
    console.error(err)
  }
}