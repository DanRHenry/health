export async function getMealsEntriesByUserAndDate(userID, date) {
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
  // console.log(data);

  if (data.message != "No Records Found.") {
    // console.log("Meals Records: ",data);
  } else {
    // console.log("Is there any Meals data?", console.log(data.message));
  }

  return data;
}
