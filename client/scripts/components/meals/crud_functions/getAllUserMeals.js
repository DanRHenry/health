export async function getAllUserMeals() {
  // console.log("sessionStorage.token: ", sessionStorage.token)
  // console.log("sessionStorage.userID: ", sessionStorage.userID)
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
  console.log('meals data:', data.mealNames)
  for (let i = 0; i < data.mealNames.length; i++) {
    allUserMeals.push(data.mealNames[i]);
  }
  console.log(allUserMeals);
}