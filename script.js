const focusModeButton = document.getElementById("focus-mode");
const todoContainer = document.querySelector(".todo-container");
const addTodoButton = document.getElementById("add-todo");
const todoInput = document.getElementById("todo-input");
const todoDate = document.getElementById("todo-date");
const todayTasksList = document.getElementById("todo-list"); // Today's tasks
const upcomingTasksList = document.getElementById("upcoming-tasks-list"); // Upcoming tasks
const saveNotesButton = document.getElementById("save-notes");
const saveGoalsButton = document.getElementById("save-goals");
const notesText = document.getElementById("notes-text");
const goalsText = document.getElementById("goals-text");
const goalProgress = document.getElementById("goal-progress");
const progressValue = document.getElementById("progress-value");

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

// Toggle Focus Mode
focusModeButton.addEventListener("click", () => {
  focusModeButton.classList.toggle("active");
  todoContainer.classList.toggle("focus-active");
});

// Function to add a task
function addTask() {
  const task = todoInput.value;
  const date = todoDate.value;

  if (!task || !date) {
    alert("Please enter a task and select a date.");
    return;
  }

  // Create task item
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

  // Complete Task Icon
  const completeIcon = document.createElement("i");
  completeIcon.classList.add("fas", "fa-check-circle");
  completeIcon.addEventListener("click", () => {
    taskElement.style.textDecoration = "line-through";
    taskElement.style.opacity = "0.6";
  });

  taskIcons.appendChild(editIcon);
  taskIcons.appendChild(deleteIcon);
  taskIcons.appendChild(completeIcon);
  taskElement.appendChild(taskIcons);

  // Check if task is for today or upcoming
  if (date === today) {
    todayTasksList.appendChild(taskElement); // Add to today's tasks
  } else {
    upcomingTasksList.appendChild(taskElement); // Add to upcoming tasks
  }

  // Clear input fields
  todoInput.value = "";
  todoDate.value = "";
}

// Add Task Button Click Event
addTodoButton.addEventListener("click", addTask);

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
