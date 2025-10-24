export async function findMealEntryByMealNameAndUserID(mealName, serverURL) {
  try{
  // const URL = `${serverURL}/meals/searchbyidandmealname`;
  const URL = `${serverURL}/meals/searchbyidandmealname`;

  console.log("getting by user idand meal name: ",`"${URL}"`);

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token
    },
    body: JSON.stringify({
      mealName: mealName,
      userID: sessionStorage.userID
    })
  });

  console.log(res.status)

  if (res.status === 404) {
    return "not found"
  }

  const data = await res.json();
  console.log(data);
  return data;
  } catch (err) {
    console.error(err)
  }
}