// DOM element constants
const LIST_OF_DISHES = Array.from(document.querySelectorAll("section.menu-section article"));
const SELECTED_ITEMS = document.querySelector(".selected-items")
const ORDER_COSTS_SECTION = document.querySelector(".order-costs")
const BUY_NOW_BUTTON = document.querySelector(".buy-now-btn")
const EMPTY_BASKET = document.getElementById("empty-basket")
const FILLED_BASKET = document.getElementById("filled-basket")
const DIALOG = document.querySelector("main dialog")
const CLOSE_DIALOG_BUTTON = document.getElementById("close-dialog")

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

  toggleDnoneOnAddItem()
  let currentBasketIndex = itemsInBasket.titles.length - 1 

  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getAddedButtonSectionTemplate(index, itemsInBasket.amounts[currentBasketIndex], currentBasketIndex);
  SELECTED_ITEMS.insertAdjacentHTML("beforeend", getItemInBasketTemplate(index, itemsInBasket.titles[currentBasketIndex], itemsInBasket.amounts[currentBasketIndex], itemsInBasket.prices[currentBasketIndex], currentBasketIndex));
  console.table(itemsInBasket);
  calculateOrderSum()
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
  calculateOrderSum()
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
  calculateOrderSum()
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
    calculateOrderSum()
    toggleDnoneOnRemoveItem()
}

/**
 * Updates the basket display based on the current items in the basket.
 *
 */
function updateBasket() {
  SELECTED_ITEMS.innerHTML = "";
  
  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));

  for (let currentBasketIndex = 0; currentBasketIndex < itemsInBasket.titles.length; currentBasketIndex++) {
    let currentDishIndex = dishNames.findIndex( dishName => dishName === itemsInBasket.titles[currentBasketIndex] )
    if (itemsInBasket.amounts[currentBasketIndex] == 1) {
        LIST_OF_ADD_ITEM_TO_BASKET_SECTION[currentDishIndex].innerHTML = getAddedButtonSectionTemplate(currentDishIndex, itemsInBasket.amounts[currentBasketIndex], currentBasketIndex);
        SELECTED_ITEMS.insertAdjacentHTML("beforeend", getItemInBasketTemplate(currentDishIndex, itemsInBasket.titles[currentBasketIndex], itemsInBasket.amounts[currentBasketIndex], itemsInBasket.prices[currentBasketIndex], currentBasketIndex));
    } else {
        LIST_OF_ADD_ITEM_TO_BASKET_SECTION[currentDishIndex].innerHTML = getAddedButtonSectionTemplate(currentDishIndex, itemsInBasket.amounts[currentBasketIndex], currentBasketIndex);
        SELECTED_ITEMS.insertAdjacentHTML("beforeend", getUpdateItemInBasketMinusButtonUpdate(currentDishIndex, itemsInBasket.titles[currentBasketIndex], itemsInBasket.amounts[currentBasketIndex], itemsInBasket.prices[currentBasketIndex], currentBasketIndex));
    }
  }
}

/**
 * Calculates the order sum including delivery fee and updates the order costs section and buy now button.
 *
 */
function calculateOrderSum() {
  ORDER_COSTS_SECTION.innerHTML = "";
  BUY_NOW_BUTTON.innerHTML = "";

  const deliveryFee = 4.99;
  let subTotal = 0;
  let sumOrder = 0;

  for (let currentBasketIndex = 0; currentBasketIndex < itemsInBasket.titles.length; currentBasketIndex++) {
    subTotal += itemsInBasket.prices[currentBasketIndex] * itemsInBasket.amounts[currentBasketIndex]
    sumOrder += subTotal + deliveryFee
  }

  ORDER_COSTS_SECTION.innerHTML = getOrderCostsTemplate(subTotal, deliveryFee, sumOrder)
  BUY_NOW_BUTTON.innerHTML = getBuyNowContentTemplate(sumOrder)
}

/**
 * Toggles the visibility of the empty and filled basket sections when an item is added.
 */
function toggleDnoneOnAddItem() {
  if(itemsInBasket.titles.length == 1) {
    EMPTY_BASKET.classList.toggle("dNone")
    FILLED_BASKET.classList.toggle("dNone")
  } else {
    ""
  }
}

/**
 * Toggles the visibility of the empty and filled basket sections when an item is removed.
 */
function toggleDnoneOnRemoveItem(){
  if(itemsInBasket.titles.length == 0) {
    EMPTY_BASKET.classList.toggle("dNone")
    FILLED_BASKET.classList.toggle("dNone")
  } else {
    ""
  }
}



/* render all articles with dish-data on init
*  reset basket on buy now button click
*  open dialog on buy now button click
*  close dialog on close button click
*/
function init() {
  renderDishes();
  BUY_NOW_BUTTON.addEventListener("click", () =>{
    itemsInBasket.titles.length = 0;
    itemsInBasket.prices.length = 0;
    itemsInBasket.amounts.length = 0;
    updateBasket();
    renderDishes();
    DIALOG.showModal()
    DIALOG.classList.toggle("dNone")
    FILLED_BASKET.classList.toggle("dNone")
  });
  CLOSE_DIALOG_BUTTON.addEventListener("click", () => {
    DIALOG.close();
    DIALOG.classList.toggle("dNone")
  });

}

// Initialize the application init() when the window loads
window.onload = init;