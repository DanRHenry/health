import { serverURL } from "../helpers/serverURL.js";

// const body = document.getElementById("body");
// const userEmailField = document.getElementById("userEmailField");
// const userPasswordField = document.getElementById("userPasswordField");
const loginForm = document.getElementById("loginForm");

import { handleSubmitLogin } from "./components/users/handleSubmitLogin.js";
import { createMainPage } from "./components/page_construction/createMainPage.js";


//! Begin
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmitLogin(serverURL, createMainPage);
});

createMainPage();
