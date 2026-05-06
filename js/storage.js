import { printTasks } from "./index.js";

export function saveNewTasks(newTasks) {
    const existingTasks = getTasks();
    const existingCategories = getCategories();

    const newCategories = [];

    newTasks.forEach(task => {
        let id = task.id;
        if(existingTasks.map(existingTask => existingTask.id === id)) {
            let count = localStorage.getItem('count') || 1;
            id =  `task-${String(count).padStart(3, "0")}`;
            count++;
            localStorage.setItem('count', count)
        }
        task.id = id;

        const name = task.category.name;
        if(!existingCategories.some(existingCategory => existingCategory.name === name)) {
            newCategories.push({ name: task.category.name, color: task.category.color });
        }
        task.category = name;
    }); 
    const updatedTasks = [...existingTasks, ...newTasks];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    const updatedCategories = [...existingCategories, ...newCategories];
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    printTasks();
}

export function getTasks() {
    let taskListAux = localStorage.getItem('tasks') || '[]';
    taskListAux = JSON.parse(taskListAux);
    return taskListAux;
}

export function saveTask(task) {
    console.log(task);
    let taskListAux = getTasks();
    taskListAux.push(task);
    console.log(taskListAux);
    taskListAux = JSON.stringify(taskListAux);
    localStorage.setItem('tasks', taskListAux);
}

export function deleteTask(id) {
    let taskListAux = getTasks();
    taskListAux = taskListAux.filter(task => id != task.id);
    taskListAux = JSON.stringify(taskListAux);
    localStorage.setItem('tasks', taskListAux);
}

export function toggleTask(id) {
    let taskListAux = getTasks();
    taskListAux = taskListAux.map(task => {
        if(task.id === id) {
            task.done = !task.done;
        }
        return task;
    });
    taskListAux = JSON.stringify(taskListAux);
    localStorage.setItem('tasks', taskListAux);
}

export function getCategories() {
    let categoryListAux = localStorage.getItem('categories') || '[]';
    categoryListAux = JSON.parse(categoryListAux);
    return categoryListAux;
}

export function saveCategory(category) {
    let categoryListAux = getCategories();
    categoryListAux.push(category);
    categoryListAux = JSON.stringify(categoryListAux);
    localStorage.setItem('categories', categoryListAux);
}

export function deleteCategory(name) {
    let categoryListAux = getCategories();
    categoryListAux = categoryListAux.filter(category => name != category.name);
    categoryListAux = JSON.stringify(categoryListAux);
    localStorage.setItem('categories', categoryListAux);
}