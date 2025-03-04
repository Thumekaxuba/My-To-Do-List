document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const addButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");

  // Load tasks from localStorage on page load
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#todo-list li span").forEach(span => {
      tasks.push(span.textContent.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add task to DOM
  function addTaskToDOM(task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // Append elements
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);

    // Edit task functionality
    editButton.addEventListener("click", () => {
      const newTask = prompt("Edit your task:", span.textContent);
      if (newTask) {
        span.textContent = newTask;
        saveTasks(); // Update localStorage after editing
      }
    });

    // Delete task functionality with confirmation
    deleteButton.addEventListener("click", () => {
      const confirmed = confirm("Are you sure you want to delete this task?");
      if (confirmed) {
        li.remove();
        saveTasks(); // Update localStorage after deletion
      }
    });
  }

  // Add new task on button click
  addButton.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText) {
      addTaskToDOM(taskText);
      input.value = ''; // Clear input after adding task
      saveTasks(); // Save tasks to localStorage after adding
    }
  });

  // Load tasks when the page loads
  loadTasks();
});
