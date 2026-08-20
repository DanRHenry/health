import { handleSubmitSignUp } from "./handleSubmitSignUp.js";
export async function handleSubmitLogin(serverURL, createMainPage) {
  const userEmailField = document.getElementById("userEmailField");

  const userPasswordField = document.getElementById("userPasswordField");

  try {
    const URL = `${serverURL}/user/login`;

    console.log(URL);
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
    if (data.message === "User not found." || data.token === undefined) {
      loginForm.removeEventListener("submit", handleSubmitLogin);
      loginForm.addEventListener("submit", handleSubmitSignUp);

      const signupBtn = document.createElement("button");
      signupBtn.innerText = "Sign Up";
      signupBtn.addEventListener("submit", handleSubmitSignUp);

      loginForm.appendChild(signupBtn);
    } else {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userID", data.user._id);
      sessionStorage.setItem("weight", data.user.weight);
      console.log("creating main page...");

      createMainPage();
    }
  } catch (err) {
    console.error(err);
  }
}
