export async function createCardioEntry(exerciseName, machine, duration) {
  const cardioEntryBody = JSON.stringify({
    exerciseName: exerciseName,
    duration: duration,
    machine: machine,
    date: focusedDate,
    userID: sessionStorage.userID,
  });

  const URL = `${serverURL}/cardio/create`;

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
    body: cardioEntryBody,
  });

  const data = await res.json();
}