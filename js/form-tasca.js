import { Task } from "./models.js";
import { getCategories, saveTask } from "./storage.js";

document.addEventListener("DOMContentLoaded", function(){

    const taskForm = document.getElementById("task");
    const submitButton = document.getElementById("task-submit");

    document.getElementById("task").addEventListener("submit", function(event) {
        event.preventDefault();

        const taskName = document.getElementById("task-name");
        const taskDescription = document.getElementById("task-description");
        const taskDate = document.getElementById("task-date");
        const taskCategory = document.getElementById("task-category");
        const taskPriority = document.getElementById("task-priority");

        const taskItem = new Task();

        taskItem.name = taskName.value;
        taskItem.desc = taskDescription.value;
        taskItem.date = taskDate.value;
        taskItem.category = taskCategory.value;
        taskItem.priority = taskPriority.value;
        taskItem.done = false;

        taskName.value = '';
        taskDescription.value = '';
        taskDate.value = '';

        console.log(taskItem);
        saveTask(taskItem.toObject());
        
    })

})