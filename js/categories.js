import {getCategories, saveCategory} from "./storage.js";
import {Category} from "./models.js";

export function printCategories() {
    const categories = getCategories();

    const container = document.getElementById('cat-list');
    container.innerHTML = '';

    categories.forEach(cat => {
        cat = new Category(cat.name, cat.color);
        cat.printCategory();
    })
}

document.addEventListener("DOMContentLoaded", function(){

    printCategories();


    const categoryForm = document.getElementById("category");
    const submitButton = document.getElementById("cat-submit");

    document.getElementById("category").addEventListener("submit", function(event) {
        event.preventDefault();

        const categoryName = document.getElementById("cat-name");
        const categoryColor = document.getElementById("cat-color");

        const categoryItem = new Category();

        categoryItem.name = categoryName.value;
        categoryItem.color = categoryColor.value;

        categoryName.value = '';
        categoryColor.value = '#000000';

        console.log(categoryItem);
        saveCategory(categoryItem.toObject());
        printCategories();
    })

})