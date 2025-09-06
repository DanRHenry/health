import { serverURL } from "../../../../helpers/serverURL.js";

export async function createWeightEntry(weight, focusedDate){
    try{
        console.log("!!! CreatingWeightEntry...")
    const URL = `${serverURL}/weight/create`

    const weightEntryBody = JSON.stringify({
        weight: weight,
        date: focusedDate,
        userID: sessionStorage.userID
    })

    const res = await fetch (URL, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "authorization": sessionStorage.token,
        },
        body: weightEntryBody
    })

    const data = await res.json();
    if (data.message != "No Records Found") {
        console.log("Weight Record: ",data)
    }
    sessionStorage.weight = {weight: weight, date: focusedDate}
} catch (err) {
    console.error(err)
}
}