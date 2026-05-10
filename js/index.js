import { printChart } from "./grafics.js";
import { Task } from "./models.js";
import { getCurrentProject, getProjects, getTasks, saveCurrentProject, saveNewTasks } from "./storage.js";

document.addEventListener("DOMContentLoaded", function () {
    printTasks();
    printProjects();

    const form = document.getElementById("import-form");
    if (form == null) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const file = document.getElementById("import-file").value;
        fetch(`/llistat-activitats/dades/${file}`)
            .then(response => response.json())
            .then(newTasks => saveNewTasks(newTasks))
            .then(() => printTasks())
            .then(() => printProjects())
            .catch(error => console.error(error));
    });
})

export function printTasks() {

    const tasks = getTasksByProject();
    const container = document.getElementById('task-list');
    const containerDone = document.getElementById('done-task-list');

    if (!container || !containerDone) {
        return;
    }

    container.innerHTML = '';
    containerDone.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = new Task(task.id, task.name, task.desc, task.date, task.category, task.priority, task.done, task.project);
        taskItem.printTask();
    })

    printChart();
    renderStats();
}

export function printProjects() {
    const projects = getProjects();

    const container = document.getElementById('projects-aside');
    const index = document.getElementById('task-list');
    if (!container) {
        return;
    }
    container.innerHTML = '';

    let projectItem = document.createElement("li");
    projectItem.textContent = "Any project";
    projectItem.addEventListener("click", function (event) {
        saveCurrentProject("");
        if (index) {
            printTasks();
        } else {
            window.location.href = "index.html";
        };
    });
    container.appendChild(projectItem);
    projects.forEach(project => {
        let projectItem = document.createElement("li");
        projectItem.textContent = project;

        projectItem.addEventListener("click", function (event) {
            saveCurrentProject(project);
            if (index) {
                printTasks();
            } else {
                window.location.href = "index.html";
            };
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
    document.getElementById("total-tasks").textContent = "Tasks: " + totalTasks;
    document.getElementById("completed-tasks").textContent = "Completed Tasks: " + completedTasks;
    document.getElementById("non-completed-tasks").textContent = "Non-Completed Tasks: " + nonCompletedTasks;
}