import { serverURL } from "../../../../helpers/serverURL.js";

export async function updateMealsEntry(mealsUpdateObject) {
  try{
  console.log("mealsUpdateObject: ", mealsUpdateObject);
  const URL = `${serverURL}/meals/update`;

  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token
    },
    body: JSON.stringify({ updateInfo: mealsUpdateObject,
     }),
  });
  const data = await res.json();
  if (data.message !=="Entry not found to update."){
  console.log(data);
  
  document.getElementById("mealUpdateConfirmationLine").remove();
  }
  } catch (err) {
    console.error(err)
  }
}
