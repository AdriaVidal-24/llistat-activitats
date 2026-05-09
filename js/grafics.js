import { getCurrentProject, getProjects, getTasks, saveCurrentProject } from "./storage.js";

let chart = null;

export function printChart() {
    const ctx = document.getElementById('Graph');
    
    const tasks = getTasks();
    const projects = getProjects();
    
    const projectLabels = ["Any project"];
    const data = [tasks.filter(task => task.done).length];
    
    projects.forEach(project => {
        let currTasks = tasks.filter(task => task.project == project && task.done);
        data.push(currTasks.length);
        projectLabels.push(project);
    });
    
    if(chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: projectLabels,
            datasets: [{
                label: '# of Tasks completed',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}