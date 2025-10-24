import { serverURL } from "../../../../helpers/serverURL.js"

export async function deleteDailyMealsEntry(mealID) {
    try {
        
    console.log("deleting ",mealID)
    const URL = `${serverURL}/dailyMeals/delete${mealID}`

    const headers = new Headers();
    headers.append("Authorization", sessionStorage.token);

    let requestOptions = {
      headers: headers,
      method: "DELETE",
    };


    console.log("URL:",URL)
    const res = await fetch(URL, requestOptions)
    const data = await res.json()

    console.log(data.message)

    } catch (err) {
        console.error(err)
    }
}