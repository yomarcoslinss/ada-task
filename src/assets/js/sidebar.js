// Mostrar sidebar
const btnExpandir = document.getElementById("btn-expandir")
const menuSide = document.querySelector(".menu-lateral")
const itemMenu = document.querySelector(".area-menu")
const iconExpand = document.getElementById("icon-expand")

btnExpandir.addEventListener("click", function (e) {
    menuSide.classList.toggle("mostrar")
    itemMenu.classList.toggle("esconder")

    if (menuSide.classList.contains("mostrar")) {
        iconExpand.classList.remove("bi-arrow-right")
        iconExpand.classList.add("bi-arrow-left")
    } else {
        iconExpand.classList.remove("bi-arrow-left")
        iconExpand.classList.add("bi-arrow-right")
        quadroCard.style.display = "none"
    }
})

// Criar Quadro
const addQuadroBtn = document.getElementById("add-quadro")
const closeQuadroBtn = document.getElementById("close-quadro")
const quadroCard = document.querySelector(".quadro-card")
const quadroTitleInput = document.getElementById("quadro-title")
const createQuadroBtn = document.getElementById("create-quadro")

addQuadroBtn.addEventListener("click", () => {
    quadroCard.style.display = "block"
    quadroTitleInput.focus()
})

closeQuadroBtn.addEventListener("click", () => {
    quadroCard.style.display = "none"
})

createQuadroBtn.addEventListener("click", () => {
    const title = quadroTitleInput.value
    if (title) {
        const newItem = document.createElement("li")
        newItem.className = "item-menu"
        newItem.innerHTML = `
            <a href="#">
                <span class="icon">
                    <i class="bi bi-columns-gap"></i>
                </span>
                <span class="txt-link">${title}</span>
            </a>
        `
        const sidebar = document.querySelector(".area-menu ul")
        sidebar.appendChild(newItem)

        quadroTitleInput.value = ""
        quadroCard.style.display = "none"
    }
})
