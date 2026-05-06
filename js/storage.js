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