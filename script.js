document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const addTodoButton = document.getElementById("add-todo");
  const todayTasksList = document.getElementById("todo-list"); // Today's tasks
  const upcomingTasksList = document.getElementById("upcoming-tasks-list"); // Upcoming tasks
  const focusModeButton = document.getElementById("focus-mode");
  const todoContainer = document.querySelector(".todo-container");
  const saveGoalsButton = document.getElementById("save-goals");
  const goalsText = document.getElementById("goals-text");
  const goalProgress = document.getElementById("goal-progress");
  const progressValue = document.getElementById("progress-value");

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ text, date }) => {
      const taskElement = createTaskElement(text, date);
      if (date === today) {
        todayTasksList.appendChild(taskElement);
      } else {
        upcomingTasksList.appendChild(taskElement);
      }
    });
  }

  // Create task element
  function createTaskElement(task, date) {
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
      removeTask(task, date);
    });

    // Delete Icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt");
    deleteIcon.addEventListener("click", () => {
      removeTask(task, date);
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

    return taskElement;
  }

  // Function to add a task
  function addTask() {
    const task = todoInput.value;
    const date = todoDate.value;

    if (!task || !date) {
      alert("Please enter a task and select a date.");
      return;
    }

    const taskElement = createTaskElement(task, date);

    if (date === today) {
      todayTasksList.appendChild(taskElement);
    } else {
      upcomingTasksList.appendChild(taskElement);
    }

    saveTask(task, date);
    todoInput.value = "";
    todoDate.value = "";
  }

  // Save task to localStorage
  function saveTask(task, date) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: task, date });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove task from localStorage
  function removeTask(task, date) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => !(t.text === task && t.date === date));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTodoButton.addEventListener("click", addTask);
  loadTasks();

  // Save Goals
  saveGoalsButton.addEventListener("click", () => {
    localStorage.setItem("goals", goalsText.value);
    alert("Goals saved!");
  });

  // Load Goals
  function loadGoals() {
    goalsText.value = localStorage.getItem("goals") || "";
  }
  loadGoals();

  // Update Progress Bar
  goalProgress.addEventListener("input", () => {
    progressValue.textContent = goalProgress.value + "%";
  });

  // Save Notes
  document.getElementById("save-notes").addEventListener("click", saveNote);

  // Function to save notes with the current date
  function saveNote() {
    const noteText = document.getElementById('notes-text').value;
    const currentDate = new Date().toLocaleString();  // Get the current date and time
    
    if (noteText.trim() !== "") {
      // Get existing notes from localStorage or create an empty array if none exist
      const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      
      // Add the new note with the current date
      savedNotes.push({ note: noteText, date: currentDate });
      
      // Save the updated notes array back to localStorage
      localStorage.setItem('notes', JSON.stringify(savedNotes));
      
      // Clear the textarea after saving
      document.getElementById('notes-text').value = '';
      alert("Note saved successfully!");
    } else {
      alert("Please write a note before saving.");
    }
  }

  // Function to redirect to notes.html to view saved notes
  document.getElementById("access-notes").addEventListener("click", () => {
    window.location.href = 'notes.html';  // Redirect to notes.html
  });
});
