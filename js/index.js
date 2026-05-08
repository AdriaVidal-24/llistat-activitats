import { printChart } from "./grafics.js";
import { Task } from "./models.js";
import { getTasks, saveNewTasks } from "./storage.js";

export function printTasks(project) {
    const tasks = getTasksByProject(project);

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

export function printProjects() {
    const projects = getProjects();

    const container = document.getElementById('projects-aside');
    container.innerHTML = '';
    
    let projectItem = document.createElement("li");
    projectItem.textContent = "No project";
    projectItem.value = "";
    projectItem.addEventListener("click", function(event) {
        saveCurrentProject("");
        printTasks("");
    });
    container.appendChild(projectItem);
    projects.forEach(project => {
        let projectItem = document.createElement("li");

        projectItem.textContent = project;

        projectItem.addEventListener("click", function(event) {
            saveCurrentProject(project);
            printTasks(project);
        });

        container.appendChild(projectItem);
    });
}

export function getTasksByProject() {
    const project = getCurrentProject();
    if (!project) {
        return getTasks();
    }
    return getTasks().filter(task => task.project === project);
}

function renderStats() {
    const tasks = getTasksByProject();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.done === true).length;
    const nonCompletedTasks = totalTasks - completedTasks;
    document.getElementById("total-tasks").textContent = "Tasks: "+totalTasks;
    document.getElementById("completed-tasks").textContent = "Completed Tasks: "+completedTasks;
    document.getElementById("non-completed-tasks").textContent = "Non-Completed Tasks: "+nonCompletedTasks;
}

document.addEventListener("DOMContentLoaded", function(){
    printTasks();
    printProjects();

    const form = document.getElementById("import-form");
    if(form == null) {
        return;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const file = document.getElementById("import-file").value;
        fetch(`/llistat-activitats/dades/${file}`)
        .then(response => response.json())
        .then(newTasks => saveNewTasks(newTasks))
        .then(() => printTasks())
        .catch(error => console.error(error));
    });
})