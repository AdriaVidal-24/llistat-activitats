import { printChart } from "./grafics.js";
import { Task } from "./models.js";
import { getTasks, saveNewTasks } from "./storage.js";

export function printTasks() {
    const tasks = getTasks();

    const container = document.getElementById('task-list');
    const containerDone = document.getElementById('done-task-list');
    if(!container || !containerDone) {
        return;
    }
    container.innerHTML = '';
    containerDone.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = new Task(task.id, task.name, task.desc, task.date, task.category, task.priority, task.done);
        taskItem.printTask();
    })

    printChart();
    renderStats();
}

function renderStats() {
    const tasks = getTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.done === true).length;
    const nonCompletedTasks = totalTasks - completedTasks;
    document.getElementById("total-tasks").textContent = "Tasks: "+totalTasks;
    document.getElementById("completed-tasks").textContent = "Completed Tasks: "+completedTasks;
    document.getElementById("non-completed-tasks").textContent = "Non-Completed Tasks: "+nonCompletedTasks;
}

document.addEventListener("DOMContentLoaded", function(){
    printTasks();

    const form = document.getElementById("import-form");
    if(form == null) {
        return;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const file = document.getElementById("import-file").value;
        fetch(`../dades/${file}`)
        .then(response => response.json())
        .then(newTasks => saveNewTasks(newTasks))
        .catch(error => console.error(error));
    });
})