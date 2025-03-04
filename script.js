const focusModeButton = document.getElementById("focus-mode");
const todoContainer = document.querySelector(".todo-container");
const addTodoButton = document.getElementById("add-todo");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todoList = document.getElementById("todo-list");
const upcomingTasksList = document.getElementById("upcoming-tasks-list");
const saveNotesButton = document.getElementById("save-notes");
const saveGoalsButton = document.getElementById("save-goals");
const notesText = document.getElementById("notes-text");
const goalsText = document.getElementById("goals-text");
const goalProgress = document.getElementById("goal-progress");
const progressValue = document.getElementById("progress-value");

// Toggle Focus Mode
focusModeButton.addEventListener("click", () => {
  focusModeButton.classList.toggle("active");
  todoContainer.classList.toggle("focus-active");
});

// Add Task
addTodoButton.addEventListener("click", () => {
  const task = todoInput.value;
  const date = todoDate.value;

  if (task && date) {
    const taskElement = document.createElement("li");
    taskElement.textContent = `${task} - Due: ${date}`;

    const taskIcons = document.createElement("span");
    taskIcons.classList.add("task-icons");

    // Edit Icon
    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit");
    editIcon.addEventListener("click", () => {
      todoInput.value = task;
      todoDate.value = date;
      taskElement.remove();
    });

    // Delete Icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");
    deleteIcon.addEventListener("click", () => {
      taskElement.remove();
    });

    taskIcons.appendChild(editIcon);
    taskIcons.appendChild(deleteIcon);

    taskElement.appendChild(taskIcons);
    todoList.appendChild(taskElement);

    todoInput.value = "";
    todoDate.value = "";
  }
});

// Save Notes
saveNotesButton.addEventListener("click", () => {
  localStorage.setItem("notes", notesText.value);
  alert("Notes saved!");
});

// Save Goals
saveGoalsButton.addEventListener("click", () => {
  localStorage.setItem("goals", goalsText.value);
  alert("Goals saved!");
});

// Update Progress Bar
goalProgress.addEventListener("input", () => {
  progressValue.textContent = goalProgress.value + "%";
});
