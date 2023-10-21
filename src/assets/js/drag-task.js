const addTaskButtons = document.querySelectorAll(".add-item");
const taskModal = document.getElementById("task-modal");
const taskEditModal = document.getElementById("edit-modal");
const closeTaskModal = taskModal.querySelector(".close");
const taskForm = document.querySelector("#task-modal #task-form");
const taskEditForm = document.querySelector("#edit-modal #task-form");
const columns = document.querySelectorAll(".card-column");
const btnCloseModal = document.querySelector("#edit-modal .close");
const cardColumn = document.querySelector(".card-column");

var itemCard;
function init() {
  document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
  });

  document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
  });

  columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
      const dragging = document.querySelector(".dragging");
      const applyAfter = getNewPosition(item, e.clientY);

      if (applyAfter) {
        applyAfter.insertAdjacentElement("afterend", dragging);
      } else {
        item.prepend(dragging);
      }
    });
  });

  handleDatepicker("#datepicker");

  addTaskButtons.forEach(function (addTaskButton) {
    addTaskButton.addEventListener("click", function () {
      taskModal.style.visibility = "visible";
    });
  });

  closeTaskModal.addEventListener("click", function () {
    taskModal.style.visibility = "hidden";
  });

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskName = document.querySelector("#task-form #task-name").value;
    const taskPriority = document.querySelector(
      "#task-form #task-priority"
    ).value;
    const taskDate = document.querySelector("#task-form #datepicker").value;

    const newItem = createNewCard(taskName, taskPriority, taskDate);

    cardColumn.appendChild(newItem);

    taskModal.style.visibility = "hidden";

    taskForm.reset();

    const deleteIcon = newItem.querySelector(".ph-trash");

    const btnPencil = newItem.querySelector(".ph-pencil-simple"); // Alterado para buscar o botão de lápis dentro do novo cartão

    btnPencil.addEventListener("click", function (e) {
      editarCard(newItem); // Agora passando o novo cartão para a função editarCard
    });

    deleteIcon.addEventListener("click", function () {
      apagarCard(this);
    });
  });

  taskEditForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const editModal = document.getElementById("edit-modal");
    const inputTaskName = editModal.querySelector("#task-name");
    const inputDatePicker = editModal.querySelector("#datepicker2");
    const selectTaskPriority = editModal.querySelector("#task-priority");

    console.log("submit form edit");

    const priorityValue = validatePriority(selectTaskPriority.value);

    const cardPriority = itemCard.querySelector("#task-priority");
    const cardName = itemCard.querySelector(".card-name p");
    const cardDate = itemCard.querySelector(".priority-date #task-date");

    const parentPriority = cardPriority.parentElement;
    parentPriority.setAttribute("class", selectTaskPriority.value);
    cardName.innerHTML = inputTaskName.value;
    cardDate.innerHTML = inputDatePicker.value;
    cardPriority.innerHTML = priorityValue;

    hidePanel(editModal);
  });

  btnCloseModal.addEventListener("click", function () {
    hidePanel(taskEditModal);
  });
}

function createNewCard(taskName, taskPriority, taskDate) {
  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.setAttribute("id", "card-item");
  newItem.draggable = true;
  newItem.innerHTML = `
    <div class="card-name">
      <p id="task-name">${taskName}</p>
      <div>
        <i class="ph-thin ph-pencil-simple"></i>
        <i class="ph-thin ph-trash"></i>
      </div>
    </div>
    <div class="priority">
      <div class="${taskPriority}">
        <i class="ph-thin ph-warning-circle"></i>
        <p data-priority="${taskPriority}" id="task-priority">${
    taskPriority === "low"
      ? "Baixa"
      : taskPriority === "medium"
      ? "Média"
      : "Alta"
  }</p>
      </div>
      <div class="priority-date">
        <i class="ph-thin ph-hourglass-medium"></i>
        <p id="task-date">${taskDate}</p>
      </div>
    </div>
  `;
  return newItem;
}
function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}

function validatePriority(priority) {
  switch (priority) {
    case "medium":
      return "Média";

    case "high":
      return "Alta";

    default:
      return "Baixa";
  }
}

function editarCard(cardItem) {
  console.log("icon editado", cardItem);
  showPanel(taskEditModal);

  handleDatepicker("#datepicker2");


  const inputTaskName = taskEditModal.querySelector("#task-name");
  const inputDatePicker = taskEditModal.querySelector("#datepicker2");

  console.log(inputTaskName, inputDatePicker);
  const selectTaskPriority = taskEditModal.querySelector("#task-priority");

  // Preencha os campos do formulário de edição com os dados do cartão selecionado
  const cardNameParagraph = cardItem.querySelector(".card-name p");
  const cardDateParagraph = cardItem.querySelector(".priority-date #task-date");
  const cardPriorityParagraph = cardItem.querySelector("#task-priority");

  inputTaskName.value = cardNameParagraph.textContent;
  inputDatePicker.value = cardDateParagraph.textContent;

  // Defina a opção do select conforme o valor do cartão
  selectTaskPriority.value =
    cardPriorityParagraph.getAttribute("data-priority");
  selectTaskPriority.dispatchEvent(new Event("change"));

  // Registre o cartão atual que está sendo editado
  taskEditModal.dataset.editingCard = cardItem.id;
  itemCard = cardItem;
}

function apagarCard(icon) {
  const card = icon.closest(".item");

  const confirmacao = confirm("excluir?");

  if (confirmacao) {
    card.remove();
  }
}

function handleDatepicker(ref) {
  $(ref).datepicker({
    minDate: 0,
    dateFormat: "dd/mm/yy",
  });
}
function showPanel(element) {
  element.style.visibility = "visible";
}

function hidePanel(element) {
  element.style.visibility = "hidden";
}

init();