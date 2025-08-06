export async function handleSubmitSignUp(e) {
  e.preventDefault();

  console.log("signing up");

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
  //   if (data.message === "User not found.") {
  //     loginForm.removeEventListener("submit",handleSubmitLogin)
  //     loginForm.addEventListener("submit", handleSubmitSignUp)
  //   } else {
  //     createMainPage();
  //   }
}
