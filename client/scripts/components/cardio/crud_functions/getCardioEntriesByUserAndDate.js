export async function getCardioEntriesByUserAndDate(userID, date, serverURL) {
  try {
  const URL = `${serverURL}/cardio/find${userID}/${date}`;

  const res = await fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
  });

  const data = await res.json();

  if (data.message != "No Records Found.") {
    // console.log("Cardio Records: ",data);
  } else {
    // console.log("Is there any Cardio data?", console.log(data.message));
  }
  return data;
    } catch (err){
      console.error(err)
    }
}