const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const listaUser = JSON.parse(localStorage.getItem("listaUser"));
const usuarioAtual = listaUser.find(
  (user) => user.email === usuarioLogado.email
);
localStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual));

if (localStorage.getItem("token") === null) {
  window.location.href = "./index.html";
}

// Mostrar sidebar
const btnExpandir = document.getElementById("btn-expandir");
const menuSide = document.querySelector(".menu-lateral");
const itemMenu = document.querySelector(".area-menu");
const iconExpand = document.getElementById("icon-expand");

btnExpandir.addEventListener("click", function (e) {
  menuSide.classList.toggle("mostrar");
  itemMenu.classList.toggle("esconder");

  if (menuSide.classList.contains("mostrar")) {
    iconExpand.classList.remove("bi-arrow-right");
    iconExpand.classList.add("bi-arrow-left");
  } else {
    iconExpand.classList.remove("bi-arrow-left");
    iconExpand.classList.add("bi-arrow-right");
    quadroCard.style.display = "none";
  }
});

// Criar Quadro
const addQuadroBtn = document.getElementById("add-quadro");
const closeQuadroBtn = document.getElementById("close-quadro");
const quadroCard = document.querySelector(".quadro-card");
const quadroTitleInput = document.getElementById("quadro-title");
const createQuadroBtn = document.getElementById("create-quadro");
const btnLogout = document.getElementById("btnLogout");

addQuadroBtn.addEventListener("click", () => {
  quadroCard.style.display = "block";
  quadroTitleInput.focus();
});

closeQuadroBtn.addEventListener("click", () => {
  quadroCard.style.display = "none";
});

createQuadroBtn.addEventListener("click", () => {
  const title = quadroTitleInput.value;
  if (title) {
    const newItem = document.createElement("li");
    newItem.className = "item-menu";
    newItem.innerHTML = `
            <a href="#">
                <span class="icon">
                    <i class="bi bi-columns-gap"></i>
                </span>
                <span class="txt-link">${title}</span>
            </a>
        `;
    const sidebar = document.querySelector(".area-menu ul");
    sidebar.appendChild(newItem);

    if (!usuarioAtual.quadros) {
      usuarioAtual.quadros = [];
    }

    usuarioAtual.quadros.push({
      titulo: `${quadroTitleInput.value}`,
      cartoes: [],
    });

    localStorage.setItem("usuarioAtual", JSON.stringify(usuarioAtual));
    localStorage.setItem("listaUser", JSON.stringify(listaUser));

    quadroTitleInput.value = "";
    quadroCard.style.display = "none";
  }
});

btnLogout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuarioAtual");
  localStorage.removeItem("usuarioLogado");
  window.location.href = "./index.html";
});

window.onload = () => {
  if (usuarioAtual.quadros) {
    usuarioAtual.quadros.forEach((quadro) => {
        const newItem = document.createElement("li");
        newItem.className = "item-menu";
        newItem.innerHTML = `
            <a href="#">
                <span class="icon">
                    <i class="bi bi-columns-gap"></i>
                </span>
                <span class="txt-link">${quadro.titulo}</span>
            </a>
        `;
        const sidebar = document.querySelector(".area-menu ul");
        sidebar.appendChild(newItem);
    });
  }
};

const ulQuadros = document.querySelector('#ulQuadros');

ulQuadros.addEventListener('click', (e) => {
    if (e.target.closest('li.item-menu')) {
        const quadroClicado = e.target.closest('li.item-menu');
        const tituloQuadroClicado = quadroClicado.querySelector(".txt-link").innerText;
        usuarioLogado.quadroSelecionado = tituloQuadroClicado;
        console.log(usuarioLogado.quadroSelecionado);
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    }
});