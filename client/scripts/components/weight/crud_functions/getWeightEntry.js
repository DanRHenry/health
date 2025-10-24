import { serverURL } from "../../../../helpers/serverURL.js";

export async function getWeightEntry(focusedDate) {
  try {
    const URL = `${serverURL}/weight/find/${sessionStorage.userID}/${focusedDate}`;

    const res = await fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.token,
      },
    });
    const data = await res.json();
    return data.getDailyWeight[0].weight;
  } catch (err) {
    console.error(err);
  }
}
