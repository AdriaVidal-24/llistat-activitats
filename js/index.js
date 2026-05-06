import { Task } from "./models.js";
import { getTasks, saveNewTasks } from "./storage.js";

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

    const totalTasks = tasks.length;
    const nonCompletedTasks = tasks.filter(task => task.done === false).length;
    const completedTasks = tasks.filter(task => task.done === true).length;
    document.getElementById("total-tasks").innerHTML = "Tasks: "+totalTasks;
    document.getElementById("non-completed-tasks").innerHTML = "Non-Completed Tasks: "+nonCompletedTasks;
    document.getElementById("completed-tasks").innerHTML = "Completed Tasks: "+completedTasks;
}

document.addEventListener("DOMContentLoaded", function(){
    printTasks();

    document.getElementById("import-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const file = document.getElementById("import-file").value;
        fetch(`../dades/${file}`)
        .then(response => response.json())
        .then(newTasks => saveNewTasks(newTasks))
        .catch(error => console.error(error));
    });
})