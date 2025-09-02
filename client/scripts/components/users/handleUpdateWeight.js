import { serverURL } from "../../../helpers/serverURL.js";
import { calculateCalorieLimits } from "../meals/calculateCalorieLimits.js";

export async function handleUpdateWeight(weight) {
    try{
        // console.log("weight: ",weight)
        const URL = `${serverURL}/user/update${sessionStorage.userID}`
        
        const res = await fetch (URL, {
            method: "PATCH",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "authorization": sessionStorage.token
            },
            body: JSON.stringify({weight: weight})
        });
        const data = await res.json();
        console.log(data)
        sessionStorage.weight = weight;
        calculateCalorieLimits()
    }
    catch (err) {
        console.error(err)
    }
}