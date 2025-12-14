// DOM element constants
const LIST_OF_DISHES = Array.from(document.querySelectorAll("section.menu-section article"));



/**
 * Renders the dish descriptions into the article elements.
 * It iterates over each article element in the LIST_OF_DISHES array and sets its innerHTML.
 */ 
function renderDishes() {
    for (let listOfDishesIndex = 0; listOfDishesIndex < LIST_OF_DISHES.length; listOfDishesIndex++ ) {
        LIST_OF_DISHES[listOfDishesIndex].innerHTML = getDishDescriptionTemplate(listOfDishesIndex, "imageName", "name", "description", "price")
    }
}



// render all articles with dish-data on init 
function init() {
    renderDishes();
}

// Initialize the application init() when the window loads
window.onload = init;