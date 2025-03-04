// Get DOM elements
const addTodoButton = document.getElementById('add-todo');
const todoInput = document.getElementById('todo-input');
const taskDate = document.getElementById('task-date');
const todoList = document.getElementById('todo-list');
const upcomingTasksList = document.getElementById('upcoming-tasks-list');

// Function to create task item
function createTaskItem(taskText, taskDateValue) {
  const li = document.createElement('li');
  li.classList.add('task-item');

  // Add task text and date
  li.innerHTML = `${taskText} <span>${taskDateValue}</span>`;

  // Create icons for edit, delete, and complete
  const icons = document.createElement('div');
  icons.classList.add('task-icons');

  const editIcon = document.createElement('i');
  editIcon.classList.add('fas', 'fa-edit');
  editIcon.addEventListener('click', () => editTask(li));

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash');
  deleteIcon.addEventListener('click', () => deleteTask(li));

  const completeIcon = document.createElement('i');
  completeIcon.classList.add('fas', 'fa-check-circle');
  completeIcon.addEventListener('click', () => completeTask(li));

  icons.append(editIcon, deleteIcon, completeIcon);
  li.appendChild(icons);

  return li;
}

// Function to add task to list
function addTask() {
  const taskText = todoInput.value;
  const date = taskDate.value;
  const taskDateValue = new Date(date).toLocaleDateString();

  if (!taskText || !date) return;

  const taskItem = createTaskItem(taskText, taskDateValue);

  // Check if the task is for tomorrow or a later date
  const taskDateObj = new Date(date);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (taskDateObj >= tomorrow) {
    upcomingTasksList.appendChild(taskItem);  // Add to Upcoming Tasks
  } else {
    todoList.appendChild(taskItem);  // Add to normal task list
  }

  // Clear input fields
  todoInput.value = '';
  taskDate.value = '';
}

// Function to edit task
function editTask(taskItem) {
  const newText = prompt('Edit your task:', taskItem.firstChild.textContent.trim());
  if (newText) {
    taskItem.firstChild.textContent = newText;
  }
}

// Function to delete task
function deleteTask(taskItem) {
  taskItem.remove();
}

// Function to mark task as complete
function completeTask(taskItem) {
  taskItem.style.textDecoration = 'line-through';
  taskItem.style.color = 'grey';
}

// Event listener for Add Task button
addTodoButton.addEventListener('click', addTask);
