export async function updateMealsEntry(mealsUpdateObject) {
  console.log("mealsUpdateObject: ", mealsUpdateObject);
  const URL = `${serverURL}/meals/update`;

  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updateInfo: mealsUpdateObject,
      "authorization": sessionStorage.token
     }),
    
  });
  const data = await res.json();
  console.log(data);
  document.getElementById("mealUpdateConfirmationLine").remove();
}
