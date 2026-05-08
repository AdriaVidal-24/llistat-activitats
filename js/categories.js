import { Category } from "./models.js";
import { getCategories, saveCategory } from "./storage.js";

export function printCategories() {
    const categories = getCategories();

    const container = document.getElementById('cat-list');
    if(!container) {
        return;
    }

    container.innerHTML = '';
    
    categories.forEach(cat => {
        const category = new Category(cat.name, cat.color);
        category.printCategory();
    })
}

document.addEventListener("DOMContentLoaded", function(){

    printCategories();

    const categoryForm = document.getElementById("category");

    if(categoryForm == null || submitButton == null) {
        return;
    }

    categoryForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const existingCategories = getCategories();
        const categoryName = document.getElementById("cat-name");
        const categoryColor = document.getElementById("cat-color");

        if(existingCategories.some(existingCategory => existingCategory.name === categoryName.value)) {
            return;
        }

        const categoryItem = new Category();

        categoryItem.name = categoryName.value;
        categoryItem.color = categoryColor.value;

        categoryName.value = '';
        categoryColor.value = '#1e3a5f';

        saveCategory(categoryItem.toObject());
        printCategories();
    })

})