import validacoes from "./validacoes.js";

const toggleSignup = document.getElementById("toggle-signup");
const toggleLogin = document.getElementById("toggle-login");
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const btnLogin = loginForm.querySelector("#btnLogin");
const btnCadastrar = signupForm.querySelector("#btnCadastrar");
const checkAceitoTermos = signupForm.querySelector("#checkAceitoTermos");
const inputCadastroUsuario = signupForm.querySelector("#cadastroUsuario");
const inputCadastroEmail = signupForm.querySelector("#cadastroEmail");
const inputCadastroSenha = signupForm.querySelector("#cadastroSenha");
const inputLoginEmail = loginForm.querySelector("#loginEmail");
const inputLoginSenha = loginForm.querySelector("#loginSenha");
const alertMessage = document.querySelector("#alert");


const capturarValor = (elemento) => {
  const dom = elemento;

  return dom.value;
}

const login = () => {
  const valueEmail = validacoes.validarEmail(capturarValor(inputLoginEmail));
  const valueSenha = validacoes.validarSenha(capturarValor(inputLoginSenha));
};

const cadastrar = () => {
  const valueUsuario = validacoes.validarUsuario(capturarValor(inputCadastroUsuario));
  const valueEmail = validacoes.validarEmail(capturarValor(inputCadastroEmail));
  const valueSenha = validacoes.validarSenha(capturarValor(inputCadastroSenha));
  const termosAceitos = validacoes.validarCheckbox(checkAceitoTermos);
};

export default function ativarAlert(msg) {

  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  const messageImg = document.createElement("img");
  messageImg.src = "./src/assets/img/error.png";
  const messageText = document.createElement("p");
  messageContainer.appendChild(messageImg);
  messageContainer.appendChild(messageText);
  messageText.innerText = msg;
  alertMessage.appendChild(messageContainer);

  setTimeout(() => {
    if (alertMessage.contains(messageContainer)) {
      alertMessage.removeChild(messageContainer);
    }
  }, 2550);
}

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

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

btnCadastrar.addEventListener("click", (e) => {
  e.preventDefault();
  cadastrar();
});
