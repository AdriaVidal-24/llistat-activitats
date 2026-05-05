import {Task} from "./models.js";
import {getTasks} from "./storage.js";

document.addEventListener("DOMContentLoaded", function(){

    function printTasks() {
        const tasks = getTasks();

        const container = document.getElementById('task-list');
        container.innerHTML = '';

        tasks.forEach(task => {
            task = new Task(task.name, task.desc, task.date, task.category, task.priority);
            task.printTask();
        })
    }

    printTasks();

})