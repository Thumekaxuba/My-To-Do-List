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
        document.querySelectorAll("#todo-list li").forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add task to the list and localStorage
    function addTask() {
        const taskText = input.value.trim();
        if (taskText !== "") {
            addTaskToDOM(taskText);
            saveTasks(); // Save tasks after adding
            input.value = "";
        }
    }

    // Add task to the DOM
    function addTaskToDOM(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create a delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = function () {
            const confirmDelete = confirm("Are you sure you want to delete this task?");
            if (confirmDelete) {
                li.remove();
                saveTasks(); // Save tasks after deleting
            }
        };

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // Event listeners
    addButton.addEventListener("click", addTask);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    // Load tasks on page load
    loadTasks();
});
