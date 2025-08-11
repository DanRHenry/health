export async function updateCardioEntry(cardioUpdateObject, id) {
  try{
  const URL = `${serverURL}/cardio/update${id}`;
  // console.log(cardioUpdateObject, id)
  const res = await fetch(URL, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
    body: JSON.stringify({ updateInfo: cardioUpdateObject }),
  });
  const data = await res.json();
  console.log(data);
  createDataObject(sessionStorage.userID, focusedDate);
    } catch (err) {
      console.error(err)
    }
}