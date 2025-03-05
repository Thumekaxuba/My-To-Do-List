document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");
    const addTodoButton = document.getElementById("add-todo");
    const todayTasksList = document.getElementById("todo-list"); // Today's tasks
    const upcomingTasksList = document.getElementById("upcoming-tasks-list"); // Upcoming tasks
    const focusModeButton = document.getElementById("focus-mode");
    const todoContainer = document.querySelector(".todo-container");
    const saveGoalsButton = document.getElementById("save-goal");
    const goalsText = document.getElementById("goal-text");
    const goalProgress = document.getElementById("goal-progress");
    const progressValue = document.getElementById("progress-value");
    const notesText = document.getElementById("notes-text");
  
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
  
    // Save Notes
    function saveNote() {
      const notes = notesText.value;
  
      if (notes.trim() === "") {
        alert("Please write a note before saving.");
        return;
      }
  
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const currentDateTime = new Date().toLocaleString();
      savedNotes.push({ notes, date: currentDateTime });
  
      localStorage.setItem("notes", JSON.stringify(savedNotes));
      notesText.value = "";
      alert("Notes saved!");
    }
  
    // Access Notes (redirects to the notes.html page)
    function accessNotes() {
      window.location.href = "notes.html"; // Redirect to notes.html
    }
  
    // Goal Saving
    function saveGoal() {
      const goalText = document.getElementById('goal-text').value;
      const goalType = document.getElementById('goal-type').value;
  
      if (goalText.trim() === "") {
        alert("Please write a goal before saving.");
        return;
      }
  
      let monthlyGoals = JSON.parse(localStorage.getItem('monthlyGoals')) || [];
      let weeklyGoals = JSON.parse(localStorage.getItem('weeklyGoals')) || [];
  
      if (goalType === "monthly") {
        monthlyGoals.push({ goal: goalText });
        localStorage.setItem('monthlyGoals', JSON.stringify(monthlyGoals));
      } else if (goalType === "weekly") {
        weeklyGoals.push({ goal: goalText });
        localStorage.setItem('weeklyGoals', JSON.stringify(weeklyGoals));
      }
  
      document.getElementById('goal-text').value = "";
      loadGoals();
    }
  
    // Load Goals
    function loadGoals() {
      const monthlyGoalsList = document.getElementById('monthly-goals-list');
      const weeklyGoalsList = document.getElementById('weekly-goals-list');
      
      monthlyGoalsList.innerHTML = '';
      weeklyGoalsList.innerHTML = '';
  
      const monthlyGoals = JSON.parse(localStorage.getItem('monthlyGoals')) || [];
      const weeklyGoals = JSON.parse(localStorage.getItem('weeklyGoals')) || [];
  
      monthlyGoals.forEach(goal => {
        const listItem = document.createElement('li');
        listItem.textContent = goal.goal;
        monthlyGoalsList.appendChild(listItem);
      });
  
      weeklyGoals.forEach(goal => {
        const listItem = document.createElement('li');
        listItem.textContent = goal.goal;
        weeklyGoalsList.appendChild(listItem);
      });
    }
  
    saveGoalsButton.addEventListener("click", saveGoal);
    loadGoals();
  });
  