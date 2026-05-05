export function getTasks() {
    let taskListAux = localStorage.getItem('tasks') || '[]';
    taskListAux = JSON.parse(taskListAux);
    return taskListAux;
}

export function saveTask(task) {
    let taskListAux = getTasks();
    taskListAux.push(task);
    taskListAux = JSON.stringify(taskListAux);
    localStorage.setItem('tasks', taskListAux);
}

export function deleteTask(id) {
    let taskListAux = getTasks();
    taskListAux = taskListAux.filter(task => id != task.id);
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

export function deleteCategory(id) {
    let categoryListAux = getCategories();
    categoryListAux = categoryListAux.filter(category => id != category.id);
    localStorage.setItem('categories', categoryListAux);
}