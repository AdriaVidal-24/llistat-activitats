import { Task } from "./models.js";
import { getCategories, saveTask } from "./storage.js";

document.addEventListener("DOMContentLoaded", function(){

    let taskCategory = document.getElementById("task-category");
    const categories = getCategories();
    const taskForm = document.getElementById("task");

    if(taskCategory) {
        taskCategory.innerHTML = '';
    }

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.name;
        option.textContent = category.name;
        option.style.backgroundColor = category.color;
        taskCategory.appendChild(option);
    });

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("task-name");
        const taskDescription = document.getElementById("task-description");
        const taskDate = document.getElementById("task-date");
        taskCategory = document.getElementById("task-category");
        const taskPriority = document.getElementById("task-priority");

        const taskItem = new Task(null, taskName.value, taskDescription.value, taskDate.value, taskCategory.value, taskPriority.value, false);

        taskName.value = '';
        taskDescription.value = '';
        taskDate.value = '';

        saveTask(taskItem.toObject());
        
    })

})