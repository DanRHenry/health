export async function getMealsByDay(serverURL, focusedDate) {
  let mealsByDay = []
  const url = `${serverURL}/meals/findmealbydateandid/${sessionStorage.userID}/${focusedDate}`;
  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
  });
  const data = await res.json();

  for (let i = 0; i < data.allMealNames.length; i++) {
    mealsByDay.push(data.allMealNames[i]);
  }
  return mealsByDay
}