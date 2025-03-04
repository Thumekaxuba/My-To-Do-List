document.getElementById('add-todo').addEventListener('click', addTask);
document.getElementById('focus-mode').addEventListener('click', toggleFocusMode);

let taskList = [];
let suggestedTasks = ["Take a short walk", "Read a chapter of a book", "Organize your workspace", "Exercise for 10 minutes"];
let upcomingEvents = [
  { title: "Meeting with Team", date: "2025-03-10" },
  { title: "Doctor's Appointment", date: "2025-03-12" },
];

function addTask() {
  const taskInput = document.getElementById('todo-input');
  const taskDate = document.getElementById('task-date').value;
  
  if (taskInput.value.trim() !== "") {
    const task = { name: taskInput.value, date: taskDate };
    taskList.push(task);
    taskInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = "";
  taskList.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${task.name} - ${task.date || "No date"}`;
    todoList.appendChild(li);
  });
}

function toggleFocusMode() {
  document.body.classList.toggle('focus-mode');
  const focusButton = document.getElementById('focus-mode');
  focusButton.classList.toggle('active');
  if (document.body.classList.contains('focus-mode')) {
    document.querySelectorAll('.todo-container > div').forEach((section) => {
      if (!section.id === 'todo-list') {
        section.style.display = 'none';
      }
    });
  } else {
    document.querySelectorAll('.todo-container > div').forEach((section) => {
      section.style.display = 'block';
    });
  }
}

function showSuggestedTasks() {
  const suggestionsList = document.getElementById('suggestions-list');
  suggestionsList.innerHTML = "";
  suggestedTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;
    suggestionsList.appendChild(li);
  });
}

function showUpcomingEvents() {
  const eventsList = document.getElementById('events-list');
  eventsList.innerHTML = "";
  upcomingEvents.forEach(event => {
    const li = document.createElement('li');
    li.textContent = `${event.title} - ${event.date}`;
    eventsList.appendChild(li);
  });
}

showSuggestedTasks();
showUpcomingEvents();
