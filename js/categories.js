import { printProjects } from "./index.js";
import { Category } from "./models.js";
import { getCategories, saveCategory } from "./storage.js";

document.addEventListener("DOMContentLoaded", function () {

    const categoryForm = document.getElementById("category");

    printCategories();
    printProjects();

    if (categoryForm == null) {
        return;
    }

    categoryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const existingCategories = getCategories();
        const categoryName = document.getElementById("cat-name");
        const categoryColor = document.getElementById("cat-color");

        if (existingCategories.some(existingCategory => existingCategory.name === categoryName.value)) {
            return;
        }

        const categoryItem = new Category(categoryName.value.trim(), categoryColor.value);

        categoryName.value = '';
        categoryColor.value = '#1e3a5f';

        saveCategory(categoryItem.toObject());
        printCategories();
    })
})

export function printCategories() {
    const categories = getCategories();

    const container = document.getElementById('cat-list');
    if (!container) {
        return;
    }

    container.innerHTML = '';

    categories.forEach(cat => {
        const category = new Category(cat.name, cat.color);
        category.printCategory();
    })
}