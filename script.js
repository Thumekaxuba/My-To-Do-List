document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const addTodoButton = document.getElementById("add-todo");
  const todayTasksList = document.getElementById("todo-list"); // Today's tasks
  const upcomingTasksList = document.getElementById("upcoming-tasks-list"); // Upcoming tasks
  const focusModeButton = document.getElementById("focus-mode");
  const saveGoalsButton = document.getElementById("save-goal");
  const goalsText = document.getElementById("goal-text");
  const goalType = document.getElementById("goal-type");
  const monthlyGoalsList = document.getElementById("monthly-goals-list");
  const weeklyGoalsList = document.getElementById("weekly-goals-list");

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

  // Add event listener to Add Task button
  addTodoButton.addEventListener("click", addTask);
  loadTasks();

  // Save Goal function
  function saveGoal() {
    const goalText = goalsText.value;
    const goalCategory = goalType.value;

    if (goalText.trim() === "") {
      alert("Please enter a goal before saving.");
      return;
    }

    const goals = JSON.parse(localStorage.getItem("goals")) || {
      monthly: [],
      weekly: [],
    };

    // Add the goal to the appropriate category (monthly or weekly)
    goals[goalCategory].push(goalText);

    // Save the updated goals list to localStorage
    localStorage.setItem("goals", JSON.stringify(goals));

    // Clear the input field after saving
    goalsText.value = "";

    alert("Goal saved successfully!");
    displayGoals();  // Update the displayed goals list
  }

  // Display goals from localStorage
  function displayGoals() {
    const savedGoals = JSON.parse(localStorage.getItem("goals")) || {
      monthly: [],
      weekly: [],
    };

    // Clear the current goal lists
    monthlyGoalsList.innerHTML = "";
    weeklyGoalsList.innerHTML = "";

    // Add monthly goals to the list
    savedGoals.monthly.forEach(goal => {
      const goalElement = document.createElement("li");
      goalElement.textContent = goal;
      monthlyGoalsList.appendChild(goalElement);
    });

    // Add weekly goals to the list
    savedGoals.weekly.forEach(goal => {
      const goalElement = document.createElement("li");
      goalElement.textContent = goal;
      weeklyGoalsList.appendChild(goalElement);
    });
  }

  // Add event listener to Save Goal button
  saveGoalsButton.addEventListener("click", saveGoal);

  // Load the goals when the page is loaded
  displayGoals();
});
