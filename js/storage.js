export function saveNewTasks(newTasks) {
    const existingTasks = getTasks();
    const existingCategories = getCategories();
    const existingProjects = getProjects();

    const newCategories = [];
    const newProjects = [];

    newTasks.forEach(task => {
        let count = getCount();
        let id = count;
        count++;
        saveCount(count);
        task.id = id;

        const name = task.category.name;
        if(!existingCategories.some(existingCategory => existingCategory.name === name)) {
            newCategories.push({ name: task.category.name, color: task.category.color });
        }
        task.category = name;

        const project = task.project;
        if(!existingProjects.includes(project) && !newProjects.includes(project)) {
            newProjects.push(project);
        }
    }); 
    const updatedTasks = [...existingTasks, ...newTasks];
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    const updatedCategories = [...existingCategories, ...newCategories];
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    const updatedProjects = [...existingProjects, ...newProjects];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
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
    taskListAux.forEach(task => {
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

export function getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}

export function saveProject(project) {
    let projectListAux = getProjects();
    if (projectListAux.includes(project)) return;
    projectListAux.push(project);
    localStorage.setItem('projects', JSON.stringify(projectListAux));
}

export function deleteProject(name) {
    let projectListAux = getProjects();
    projectListAux = projectListAux.filter(project => project !== name);
    localStorage.setItem('projects', JSON.stringify(projectListAux));
}

export function saveCount(count) {
    localStorage.setItem('count', Number(count));
}

export function getCount() {
    return Number(localStorage.getItem('count')) || 1;
}

export function saveCurrentProject(project) {
    localStorage.setItem('current-project', project);
}

export function getCurrentProject() {
    return localStorage.getItem('current-project');
}