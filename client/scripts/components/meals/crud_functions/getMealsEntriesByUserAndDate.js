export async function getMealsEntriesByUserAndDate(userID, date, serverURL) {
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
}
