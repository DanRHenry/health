export async function findMealEntryByMealNameAndUserID(mealName) {
  const URL = `${serverURL}/meals/find/${sessionStorage.userID}/${mealName}`;

  // console.log(URL);

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token
    },
  });

  const data = await res.json();
  // console.log(data);
  return data;
}