const columns = document.querySelectorAll(".card-column");

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

document.addEventListener("DOMContentLoaded", function () {
  const addTaskButtons = document.querySelectorAll(".add-item");
  const taskModal = document.getElementById("task-modal");
  const closeTaskModal = taskModal.querySelector(".close");
  const taskForm = document.getElementById("task-form");
  const cardColumn = document.querySelector(".card-column");

  $(function () {
    $("#datepicker").datepicker({
      minDate: 0,
      dateFormat: "dd/mm/yy",
    });
  });

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

    const taskName = document.getElementById("task-name").value;
    const taskPriority = document.getElementById("task-priority").value;
    const taskDate = document.getElementById("datepicker").value;

    const newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.draggable = true;
    newItem.innerHTML = `
      <div class="card-name">
        <p>${taskName}</p>
        <div>
          <i class="ph-thin ph-pencil-simple"></i>
          <i class="ph-thin ph-trash"></i>
        </div>
      </div>
      <div class="priority">
        <div class="${taskPriority}">
          <i class="ph-thin ph-warning-circle"></i>
          <p>${
            taskPriority === "low"
              ? "Baixa"
              : taskPriority === "medium"
              ? "Média"
              : "Alta"
          }</p>
        </div>
        <div class="priority-date">
          <i class="ph-thin ph-hourglass-medium"></i>
          <p>${taskDate}</p>
        </div>
      </div>
    `;

    cardColumn.appendChild(newItem);

    taskModal.style.visibility = "hidden";

    taskForm.reset();

    const editIcon = newItem.querySelector(".ph-pencil-simple");
    const deleteIcon = newItem.querySelector(".ph-trash");

    editIcon.addEventListener("click", function () {
      editarCard(this);
    });

    deleteIcon.addEventListener("click", function () {
      apagarCard(this);
    });

    function editarCard(icon) {
      
      const card = icon.closest(".item");
      
      const cardNameParagraph = card.querySelector(".card-name p");
      
      const novoNome = prompt("Novo nome do card:", cardNameParagraph.textContent);
      
      if (novoNome !== null) {
        cardNameParagraph.textContent = novoNome;
      }
    }

    function apagarCard(icon) {
      const card = icon.closest(".item");

      const confirmacao = confirm("excluir?");

      if (confirmacao) {
        card.remove();
      }
    }
  });
});
