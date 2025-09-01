import { serverURL } from "../../../../helpers/serverURL.js";
export async function getMealsEntriesByUserAndDate(userID, date) {
  try{
  const URL = `${serverURL}/meals/find${userID}/${date}`;
  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token
    },
  });

  const data = await res.json();
  return data;
} catch (err) {
  console.error(err)
}
}
