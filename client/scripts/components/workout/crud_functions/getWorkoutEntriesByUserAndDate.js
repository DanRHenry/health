export async function getWorkoutEntriesByUserAndDate(userID, date, serverURL) {
  try{
  const URL = `${serverURL}/workout/find${userID}/${date}`;

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
    // console.log("Workout Records: ",data);
  } 
  // else {
  //   console.log("Is there any Workout data?", data.message);
  // }
  return data;
  } catch (err) {
    console.error(err)
  }
}