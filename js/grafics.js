import { getTasksMonth, saveTasksMonth } from "./storage.js";

const month = new Date().getMonth();
const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let chart = null;

export function addTaskMonth() {
    const data = getTasksMonth();
    data[month]++;
    saveTasksMonth(data);
}

export function removeTaskMonth() {
    const data = getTasksMonth();
    if(data[month] > 0) {
        data[month]--;
    }
    saveTasksMonth(data);
}

export function printChart() {
    const ctx = document.getElementById('Graph');
    const data = getTasksMonth();
    
    if(chart) {
        chart.destroy();
    }
    

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthLabels,
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