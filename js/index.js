import {Task} from "./models.js";
import {getTasks} from "./storage.js";

export function printTasks() {
    const tasks = getTasks();

    const container = document.getElementById('task-list');
    container.innerHTML = '';
    const containerDone = document.getElementById('done-task-list');
    containerDone.innerHTML = '';

    tasks.forEach(task => {
        task = new Task(task.id, task.name, task.desc, task.date, task.category, task.priority, task.done);
        task.printTask();
    })
}

document.addEventListener("DOMContentLoaded", function(){

    printTasks();

})