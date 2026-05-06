import { printCategories } from "./categories.js";
import { printTasks } from "./index.js";
import { deleteCategory, deleteTask, getCategories, toggleTask } from "./storage.js";

export class Task {
    static count = 1;

    constructor(id, name, desc, date, category, priority, done) {
        if(id == null) {
            Task.count = localStorage.getItem('count') || 1;
            this._id = `task-${String(Task.count).padStart(3, "0")}`;
            Task.count++;
            localStorage.setItem('count', Task.count);
        } else {
            this._id = id;
        }
        this._name = name;
        this._desc = desc;
        this._date = date;
        this._category = category;
        this._priority = priority;
        this._done = done;
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set desc(desc) {
        this._desc = desc;
    }

    get desc() {
        return this._desc;
    }

    set date(date) {
        this._date = date;
    }

    get date() {
        return this._date;
    }

    set category(category) {
        this._category = category;
    }

    get category() {
        return this._category;
    }

    set priority(priority) {
        this._priority = priority;
    }

    get priority() {
        return this._priority;
    }
    
    set done(done) {
        this._done = done;
    }

    get done() {
        return this._done;
    }
    
    printTask() {
        // <div class="flex w-32 j-around task-item">
        //     <div class="flex column w-100">
        //         <p></p>
        //         <p class="category-task"></p>
        //         <p></p>
        //         <p></p>
        //     </div>
        //     <div class="flex column w-25 j-around">
        //         <p></p>
        //         <div class="flex row">
        //             <svg class="task-done" width="64px" height="64px" viewBox="-1.6 -1.6 19.20 19.20" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#1f2933" d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"></path></g></svg>
        //             <svg class="task-delete" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f0f4f8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="f0f4f8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        //         </div>
        //     </div>
        // </div>

        const TaskList = document.getElementById("task-list");
        const TaskListDone = document.getElementById("done-task-list");
        const containerDiv = document.createElement("div");
        const firstDiv = document.createElement("div");
        const Title = document.createElement("p");
        const Category = document.createElement("p");
        const Date = document.createElement("p");
        const Description = document.createElement("p");
        
        const secondDiv = document.createElement("div");
        const Priority = document.createElement("p");
        const buttonsDiv = document.createElement("div");

        containerDiv.classList.add("flex", "w-32", "j-around", "task-item");
        firstDiv.classList.add("flex", "column", "w-100");
        secondDiv.classList.add("flex", "column", "w-25", "j-around");
        Category.classList.add("category-task");
        buttonsDiv.classList.add("flex", "row")
        
        let categories = getCategories();
        categories = categories.map(category => {
            if (category.name == this._category) {
                Category.style.backgroundColor = category.color;
            }
        })

        const priority = this._priority;
        const done = this._done;    

        let transparency = 0.40;
        if(done) {
            transparency = 0.20;
        }

        switch(priority){
            case "Low":
                containerDiv.style.backgroundColor = 'rgba(43, 255, 0, '+transparency+')';
                break;
            case "Medium":
                containerDiv.style.backgroundColor = 'rgba(217, 255, 0, '+transparency+')';
                break;
            default:
                containerDiv.style.backgroundColor = 'rgba(255, 0, 0, '+transparency+')';
                break;
        }


        Title.textContent = this._name;
        Category.textContent = this._category;
        Date.textContent = this._date;
        Description.textContent = this._desc;
        Priority.textContent = this._priority;
        buttonsDiv.innerHTML += '' +
            '<svg class="task-done" width="64px" height="64px" viewBox="-1.6 -1.6 19.20 19.20" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#1f2933" d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"></path></g></svg>' +
            '<svg class="task-delete" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f0f4f8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="f0f4f8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';

        const id = this._id;
        
        buttonsDiv.querySelector(".task-delete").addEventListener("click", function() {
            console.log(id);
            deleteTask(id);
            printTasks();
        })
        
        buttonsDiv.querySelector(".task-done").addEventListener("click", function() {
            console.log(id);
            toggleTask(id);
            printTasks();
        })

        if(this._done) {
            TaskListDone.appendChild(containerDiv);
        } else {
            TaskList.appendChild(containerDiv);
        }
        containerDiv.appendChild(firstDiv);
        containerDiv.appendChild(secondDiv);

        firstDiv.appendChild(Title);
        firstDiv.appendChild(Category);
        firstDiv.appendChild(Date);
        firstDiv.appendChild(Description);

        secondDiv.appendChild(Priority);
        secondDiv.appendChild(buttonsDiv);
    }

    toObject() {
        return {
            id: this._id,
            name: this._name,
            desc: this._desc,
            date: this._date,
            category: this._category,
            priority: this._priority,
            done: this._done
        }
    }
}

export class Category {
    constructor(name, color) {
        this._name = name;
        this._color = color;
    }

    set name(name) {
        this._name = name
    }

    get name() {
        return this._name;
    }

    set color(color) {
        this._color = color
    }

    get color() {
        return this._color;
    }

    printCategory() {
        // <div class="flex row a-center j-between category">
        //     <div class="flex a-center g-1">
        //         <div></div>
        //         <p>Category 1</p>
        //     </div>
        //     <button><svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f0f4f8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="f0f4f8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
        // </div>

        const CategoryList = document.getElementById("cat-list");
        const containerDiv = document.createElement("div");
        const smallDiv = document.createElement("div");
        const colorDiv = document.createElement("div");
        const name = document.createElement("p");
        const deleteButton = document.createElement("button");
        
        CategoryList.classList.add("flex", "column", "a-center", "j-between");
        containerDiv.classList.add("flex", "a-center", "g-1", "category");
        deleteButton.classList.add("cat-delete");
        colorDiv.style.backgroundColor = this._color;

        name.textContent = this._name;
        deleteButton.innerHTML = '<svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f0f4f8"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="f0f4f8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';

        let catName = this._name;

        deleteButton.addEventListener("click", function() {
            console.log(catName);
            deleteCategory(catName);
            printCategories();
        })
        
        CategoryList.appendChild(containerDiv);
        containerDiv.appendChild(smallDiv);
        containerDiv.appendChild(deleteButton);

        smallDiv.appendChild(colorDiv);
        smallDiv.appendChild(name);
    }

    toObject() {
        return {
            name: this._name,
            color: this._color
        }
    }
}