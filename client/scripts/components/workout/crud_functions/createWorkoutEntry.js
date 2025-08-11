export async function createWorkoutEntry(workoutName, machine, duration) {
  const workoutEntryBody = JSON.stringify({
    exerciseName: workoutName,
    duration: duration,
    machine: machine,
    // exerciseType: "default",
    dateCreated: focusedDate,
    userID: sessionStorage.userID,
  });

  try{
  const URL = `${serverURL}/workout/create`;

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "authorization": sessionStorage.token,
    },
    body: workoutEntryBody,
  });

  const data = await res.json();

  // console.log(data);
  } catch (err) {
    console.error(err)
  }
}