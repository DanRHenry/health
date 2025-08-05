export async function deleteMealsEntry(mealsEntryID) {
  const URL = `${serverURL}/meals/delete${mealsEntryID}`;

  const res = await fetch(URL, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json",
      "authorization": sessionStorage.token
     },

  });
  const data = await res.json();
  console.log(data);
}