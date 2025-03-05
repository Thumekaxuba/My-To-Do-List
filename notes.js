document.addEventListener("DOMContentLoaded", () => {
  const goalText = document.getElementById("goal-text");
  const goalType = document.getElementById("goal-type");
  const saveGoalButton = document.getElementById("save-goal");
  const monthlyGoalsList = document.getElementById("monthly-goals-list");
  const weeklyGoalsList = document.getElementById("weekly-goals-list");

  // Load existing goals from localStorage
  function loadGoals() {
    const goals = JSON.parse(localStorage.getItem("goals")) || { monthly: [], weekly: [] };

    // Display monthly goals
    monthlyGoalsList.innerHTML = "";
    goals.monthly.forEach((goal) => {
      const goalElement = createGoalElement(goal.text, goal.progress);
      monthlyGoalsList.appendChild(goalElement);
    });

    // Display weekly goals
    weeklyGoalsList.innerHTML = "";
    goals.weekly.forEach((goal) => {
      const goalElement = createGoalElement(goal.text, goal.progress);
      weeklyGoalsList.appendChild(goalElement);
    });
  }

  // Create a goal element with progress bar
  function createGoalElement(goalText, progress) {
    const goalElement = document.createElement("li");
    goalElement.classList.add("goal-item");

    const goalLabel = document.createElement("span");
    goalLabel.textContent = goalText;
    goalElement.appendChild(goalLabel);

    const progressBarContainer = document.createElement("div");
    progressBarContainer.classList.add("progress-bar-container");

    const progressBar = document.createElement("input");
    progressBar.type = "range";
    progressBar.value = progress;
    progressBar.max = 100;
    progressBar.addEventListener("input", () => {
      updateGoalProgress(goalText, progressBar.value);
    });
    progressBarContainer.appendChild(progressBar);

    const progressValue = document.createElement("span");
    progressValue.textContent = `${progress}%`;
    progressBarContainer.appendChild(progressValue);

    goalElement.appendChild(progressBarContainer);

    return goalElement;
  }

  // Save goal to localStorage
  function saveGoal(text, type) {
    const goals = JSON.parse(localStorage.getItem("goals")) || { monthly: [], weekly: [] };

    const newGoal = { text, progress: 0 };

    if (type === "monthly") {
      goals.monthly.push(newGoal);
    } else if (type === "weekly") {
      goals.weekly.push(newGoal);
    }

    localStorage.setItem("goals", JSON.stringify(goals));
  }

  // Update goal progress in localStorage
  function updateGoalProgress(goalText, progress) {
    const goals = JSON.parse(localStorage.getItem("goals")) || { monthly: [], weekly: [] };

    const allGoals = [...goals.monthly, ...goals.weekly];
    const goalIndex = allGoals.findIndex(goal => goal.text === goalText);
    
    if (goalIndex !== -1) {
      allGoals[goalIndex].progress = progress;
      localStorage.setItem("goals", JSON.stringify(goals));
      loadGoals(); // Reload goals after progress update
    }
  }

  // Handle save goal button click
  saveGoalButton.addEventListener("click", () => {
    const goalTextValue = goalText.value.trim();
    const goalTypeValue = goalType.value;

    console.log("Goal Text:", goalTextValue); // Debugging
    console.log("Goal Type:", goalTypeValue); // Debugging

    if (!goalTextValue) {
      alert("Please enter a goal.");
      return;
    }

    saveGoal(goalTextValue, goalTypeValue);
    goalText.value = ""; // Clear input after saving
    loadGoals(); // Reload goals after adding
  });

  loadGoals(); // Load goals on page load
});
