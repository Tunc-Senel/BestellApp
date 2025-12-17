// DOM element constants
const LIST_OF_DISHES = Array.from(document.querySelectorAll("section.menu-section article"));
const SELECTED_ITEMS = document.querySelector(".selected-items")



// Object that holds the arrays for items in the basket
const itemsInBasket = {
  "titles": [],
  "prices":[],
  "amounts": [],
}

// Array of dish names for finding indices that match the json dishes name property
const dishNames = [
  "Veggie mushroom black burger",
  "All meat burger",
  "Beef red burger",
  "Big chicken burger",
  "Pizza Margherita",
  "Pizza Chorizo",
  "Funghi",
  "Quattro Formaggi with Chicken ",
  "Warm beef arugula salad",
  "Mini green Salad",
  "Green Salad with sea food",
  "Vegan green salad with tofu"
]



/**
 * Renders the dish descriptions into the article elements.
 * It iterates over each article element in the LIST_OF_DISHES array and sets its innerHTML.
 * 
 */ 
function renderDishes() {
    for (let listOfDishesIndex = 0; listOfDishesIndex < LIST_OF_DISHES.length; listOfDishesIndex++ ) {
        LIST_OF_DISHES[listOfDishesIndex].innerHTML = getDishDescriptionTemplate(listOfDishesIndex, "imageName", "name", "description", "price")
    }
}

/**
 * Adds an item to the basket and updates the button section.
 * @param {number} index - The index of the dish in the dishes array.
 * 
 */ 
function addItemToBasket(index) {
  itemsInBasket.titles.push(dishes[index].name)
  itemsInBasket.prices.push(dishes[index].price)
  itemsInBasket.amounts.push(1)

  let currenBasketIndex = itemsInBasket.titles.length - 1 

  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getAddedButtonSectionTemplate(index, itemsInBasket.amounts[currenBasketIndex], currenBasketIndex);
  SELECTED_ITEMS.insertAdjacentHTML("beforeend", getItemInBasketTemplate(index, itemsInBasket.titles[currenBasketIndex], itemsInBasket.amounts[currenBasketIndex], itemsInBasket.prices[currenBasketIndex], currenBasketIndex));
  console.table(itemsInBasket);
}

/**
 * Adds one more item to the basket and updates the button section.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {number} itemIndex - The index of the item in the basket arrays.
 *
 */
function increaseItemAmount(index, itemIndex) {

  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));
  const ARTICLE_ITEM_IN_BASKET = Array.from(document.querySelectorAll(".selected-items article"));

  itemsInBasket.amounts[itemIndex]++;

  ARTICLE_ITEM_IN_BASKET[itemIndex].innerHTML = getUpdateItemInBasketMinusButton(index, itemsInBasket.titles[itemIndex], itemsInBasket.amounts[itemIndex], itemsInBasket.prices[itemIndex], itemIndex)
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getAddedButtonSectionTemplate(index, itemsInBasket.amounts[itemIndex], itemIndex);
  console.table(itemsInBasket);
}

/**
 * Decreases the item amount in the basket and updates the button section.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {number} itemIndex - The index of the item in the basket arrays.
 *
 */
function decreaseItemAmount(index, itemIndex) {
  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));
  const ARTICLE_ITEM_IN_BASKET = Array.from(document.querySelectorAll(".selected-items article"));

  itemsInBasket.amounts[itemIndex]--;

  if (itemsInBasket.amounts[itemIndex] == 1) {
      ARTICLE_ITEM_IN_BASKET[itemIndex].innerHTML = getDefaultButtonSetupInBasket(index, itemsInBasket.titles[itemIndex], itemsInBasket.amounts[itemIndex], itemsInBasket.prices[itemIndex], itemIndex)
  } else {
      ARTICLE_ITEM_IN_BASKET[itemIndex].innerHTML = getUpdateItemInBasketMinusButton(index, itemsInBasket.titles[itemIndex], itemsInBasket.amounts[itemIndex], itemsInBasket.prices[itemIndex], itemIndex)

  }
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getAddedButtonSectionTemplate(index, itemsInBasket.amounts[itemIndex], itemIndex);
  console.table(itemsInBasket);
}

/**
* Removes an item from the basket and updates the button section.
* @param {number} index - The index of the dish in the dishes array.
* @param {number} itemIndex - The index of the item in the basket arrays.
*
*/ 
function removeItemFromBasket(index, itemIndex) {
   const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"))
    itemsInBasket.titles.splice(itemIndex, 1)
    itemsInBasket.prices.splice(itemIndex, 1)
    itemsInBasket.amounts.splice(itemIndex, 1)
    LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getDefaultButtonSetupInMenu(index)
    updateBasket();
    console.table(itemsInBasket);
}

/**
 * Updates the basket display based on the current items in the basket.
 *
 */
function updateBasket() {
  document.querySelector(".selected-items").innerHTML = "";
  
  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));

  for (let currenBasketIndex = 0; currenBasketIndex < itemsInBasket.titles.length; currenBasketIndex++) {
    let currentDishIndex = dishNames.findIndex( dishName => dishName === itemsInBasket.titles[currenBasketIndex] )
    if (itemsInBasket.amounts[currenBasketIndex] == 1) {
        LIST_OF_ADD_ITEM_TO_BASKET_SECTION[currentDishIndex].innerHTML = getAddedButtonSectionTemplate(currentDishIndex, itemsInBasket.amounts[currenBasketIndex], currenBasketIndex);
        SELECTED_ITEMS.insertAdjacentHTML("beforeend", getItemInBasketTemplate(currentDishIndex, itemsInBasket.titles[currenBasketIndex], itemsInBasket.amounts[currenBasketIndex], itemsInBasket.prices[currenBasketIndex], currenBasketIndex));
    } else {
        LIST_OF_ADD_ITEM_TO_BASKET_SECTION[currentDishIndex].innerHTML = getAddedButtonSectionTemplate(currentDishIndex, itemsInBasket.amounts[currenBasketIndex], currenBasketIndex);
        SELECTED_ITEMS.insertAdjacentHTML("beforeend", getUpdateItemInBasketMinusButtonUpdate(currentDishIndex, itemsInBasket.titles[currenBasketIndex], itemsInBasket.amounts[currenBasketIndex], itemsInBasket.prices[currenBasketIndex], currenBasketIndex));
    }
  }
}



// render all articles with dish-data on init 
function init() {
    renderDishes();
}

// Initialize the application init() when the window loads
window.onload = init;