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

/**
 * Adds an item to the basket and updates the button section.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {string} amount - The property name for the amount in the dishes array.
 */ 
function addItemToBasket(index, amount) {
  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));
  dishes[index][amount] += 1;
  let newAmount = dishes[index][amount];
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getAddedButtonSectionTemplate(index, newAmount);
}

/**
 * Adds one more item to the basket and updates the button section.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {string} amount - The property name for the amount in the dishes array.
 */ 
function increaseItemAmount(index, amount) {
  addItemToBasket(index, amount)
}

function decreaseItemAmount() {

}

function removeItemFromBasket() {

}



// render all articles with dish-data on init 
function init() {
    renderDishes();
}

// Initialize the application init() when the window loads
window.onload = init;