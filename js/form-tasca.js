import { Task } from "./models.js";
import { getCategories, saveTask } from "./storage.js";

document.addEventListener("DOMContentLoaded", function(){

    const taskCategory = document.getElementById("task-category");
    const categories = getCategories();
    const taskForm = document.getElementById("task");
    const submitButton = document.getElementById("task-submit");

    taskCategory.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        option.style.backgroundColor = category.color;
        taskCategory.appendChild(option);
    });

    document.getElementById("task").addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("task-name");
        const taskDescription = document.getElementById("task-description");
        const taskDate = document.getElementById("task-date");
        const taskCategory = document.getElementById("task-category");
        const taskPriority = document.getElementById("task-priority");

        const taskItem = new Task(null, taskName.value, taskDescription.value, taskDate.value, taskCategory.value, taskPriority.value, false);

        taskName.value = '';
        taskDescription.value = '';
        taskDate.value = '';

        console.log(taskItem);
        saveTask(taskItem.toObject());
        
    })

})