const toggleSignup = document.getElementById("toggle-signup");
const toggleLogin = document.getElementById("toggle-login");
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

toggleLogin.addEventListener("click", () => {
  if (loginForm.style.display === "none") {
    loginForm.style.display = "flex";
    signupForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
  }
});

toggleSignup.addEventListener("click", () => {
  if (signupForm.style.display === "none") {
    signupForm.style.display = "flex";
    loginForm.style.display = "none";
  } else {
    signupForm.style.display = "none";
    loginForm.style.display = "flex";
  }
});
