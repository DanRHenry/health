import { serverURL } from "../../../../helpers/serverURL.js";

export async function getDailyMealsEntries(focusedDate) {
    // console.log("focusedDate: ",focusedDate)
try {
    // console.log(sessionStorage.userID)
  // console.log(focusedDate)
  const URL = `${serverURL}/dailymeals/findbyuseranddate/${sessionStorage.userID}/${focusedDate}`;

// const URL = `${serverURL}/dailymeals/findbyuseranddate`
  // console.log("getDailyMeals url: ",URL)
    const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token
    },
  });

  const data = await res.json();
  // console.log("dailyMealsData: ",data);
  return data;

} catch (err) {
    console.error(err)
}
}