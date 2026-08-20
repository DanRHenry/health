export async function handleSubmitSignUp(e) {
    e.preventDefault()
  
const userEmailField = document.getElementById("userEmailField");
const userPasswordField = document.getElementById("userPasswordField");

const email = userEmailField.value
const password = userPasswordField.value

if (!email || !password) return
else {
console.log(userEmailField.value)
console.log(userPasswordField.value)
// console.log("signing up")
  e.preventDefault();

  console.log("signing up");
 try{
  const URL = `${serverURL}/user/signup`;

  const body = JSON.stringify({
    email: userEmailField.value,
    password: userPasswordField.value,
  });

  const res = await fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const data = await res.json();

  console.log(data);

  if (data.message === "Success! User Created!") {
    sessionStorage.setItem("token", data.token);
    createMainPage();
  }
  }catch (err) {
    console.error(err)
  }
  }
}
