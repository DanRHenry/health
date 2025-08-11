export async function deleteCardioEntry(cardioEntryID) {
  try{
  const URL = `${serverURL}/cardio/delete${cardioEntryID}`;

  const res = await fetch(URL, {
    method: "DELETE",
    mode: "cors",
    headers: { "Content-Type": "application/json", 
    "authorization": sessionStorage.token
    },
  });
  const data = await res.json();
  // console.log(data);
  await createDataObject(sessionStorage.userID, focusedDate);
  } catch (err) {
    console.error(err)
  }
}