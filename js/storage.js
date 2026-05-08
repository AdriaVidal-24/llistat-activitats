export function saveNewTasks(newTasks) {
    const existingTasks = getTasks();
    const existingCategories = getCategories();

    const newCategories = [];

    newTasks.forEach(task => {
        let id = task.id;
        let count = JSON.parse(localStorage.getItem('count')) || 1;
        if(existingTasks.some(existingTask => existingTask.id === id)) {
            id =  `task-${String(count).padStart(3, "0")}`;
        }
        count++;
        localStorage.setItem('count', JSON.stringify(count));
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
}

export function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

export function saveTask(task) {
    let taskListAux = getTasks();
    taskListAux.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskListAux));
}

export function deleteTask(id) {
    let taskListAux = getTasks();
    taskListAux = taskListAux.filter(task => id != task.id);
    localStorage.setItem('tasks', JSON.stringify(taskListAux));
}

export function toggleTask(id) {
    let taskListAux = getTasks();
    taskListAux = taskListAux.map(task => {
        if(task.id === id) {
            task.done = !task.done;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(taskListAux));
}

export function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

export function saveCategory(category) {
    let categoryListAux = getCategories();
    categoryListAux.push(category);
    localStorage.setItem('categories', JSON.stringify(categoryListAux));
}

export function deleteCategory(name) {
    let categoryListAux = getCategories();
    categoryListAux = categoryListAux.filter(category => name != category.name);
    localStorage.setItem('categories', JSON.stringify(categoryListAux));
}

export function getTasksMonth() {
    return JSON.parse(localStorage.getItem('dataMonth')) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export function saveTasksMonth(data) {
    localStorage.setItem('dataMonth', JSON.stringify(data));
}
}