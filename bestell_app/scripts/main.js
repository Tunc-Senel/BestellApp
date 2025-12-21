// DOM ELEMENT CONSTANTS
const SELECTED_ITEMS = document.querySelector(".selected-items");
const ORDER_COSTS_SECTION = document.querySelector(".order-costs");
const BUY_NOW_BUTTON = document.querySelector(".buy-now-btn");
const EMPTY_BASKET = document.getElementById("empty-basket");
const FILLED_BASKET = document.getElementById("filled-basket");
const DIALOG_DESKTOP = document.getElementById("dialog-desktop");
const DIALOG_MOBILE = document.getElementById("dialog-mobile");
const CLOSE_DIALOG_BUTTON_DESKTOP = document.getElementById("close-dialog-desktop");
const CLOSE_DIALOG_BUTTON_MOBILE = document.getElementById("close-dialog-mobile");
const NAV_BAR_BUTTONS = document.querySelectorAll("footer nav ul li button");
const CLOSE_EMPTY_BASKET = document.getElementById("close-empty-basket");
const CLOSE_FILLED_BASKET = document.getElementById("close-filled-basket");
const BACKDROP = document.querySelector(".backdrop");
const EMPTY_BASKET_BUTTON = document.querySelector(".basket-empty-btn");
const FILLED_BASKET_BUTTON = document.querySelector(".basket-filled-btn");
const BODY = document.querySelector("body");

// DOM ELEMENT TO ARRAYS
const LIST_OF_DISHES = Array.from(document.querySelectorAll("section.menu-section article"));
const NAV_BAR_BUTTONS_ARRAY = Array.from(document.querySelectorAll("footer nav ul li button"));

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

// Active button image sources for nav bar buttons
 const activeButtonSources = [
    "./src/img/favicons/home_active_nav.png",
    "./src/img/favicons/person_active_nav.png",
    "./src/img/favicons/takeout_dining_active_nav.png",
    "./src/img/favicons/shopping_cart_active_nav.png",
    "./src/img/favicons/shopping-cart-active_nav.png"
  ];

/**
 * Renders the dish descriptions into the article elements.
 * It iterates over each article element in the LIST_OF_DISHES array and sets its innerHTML.
 * 
 */ 
function renderDishes() {
    for (let listOfDishesIndex = 0; listOfDishesIndex < LIST_OF_DISHES.length; listOfDishesIndex++ ) {
        LIST_OF_DISHES[listOfDishesIndex].innerHTML = getDishDescriptionTemplate(listOfDishesIndex, "imageName", "name", "description", "price");
    }
}

/**
 * Adds an item to the basket and updates the button section.
 * @param {number} index - The index of the dish in the dishes array.
 * 
 */ 
function addItemToBasket(index) {
  addItemToItemsInBasket(index);
  toggleDnoneOnAddItem();

  let currentBasketIndex = itemsInBasket.titles.length - 1;

  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getAddedButtonSectionTemplate(index, itemsInBasket.amounts[currentBasketIndex], currentBasketIndex);
  SELECTED_ITEMS.insertAdjacentHTML("beforeend", getItemInBasketTemplate(index, itemsInBasket.titles[currentBasketIndex], itemsInBasket.amounts[currentBasketIndex], itemsInBasket.prices[currentBasketIndex], currentBasketIndex));
 
  basketFilledCountMobile();
  calculateOrderSum();
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

  ARTICLE_ITEM_IN_BASKET[itemIndex].innerHTML = getUpdateItemInBasketMinusButton(index, itemsInBasket.titles[itemIndex], itemsInBasket.amounts[itemIndex], itemsInBasket.prices[itemIndex], itemIndex);
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getAddedButtonSectionTemplate(index, itemsInBasket.amounts[itemIndex], itemIndex);
  calculateOrderSum();
  basketFilledCountMobile();
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
      ARTICLE_ITEM_IN_BASKET[itemIndex].innerHTML = getDefaultButtonSetupInBasket(index, itemsInBasket.titles[itemIndex], itemsInBasket.amounts[itemIndex], itemsInBasket.prices[itemIndex], itemIndex);
  } else {
      ARTICLE_ITEM_IN_BASKET[itemIndex].innerHTML = getUpdateItemInBasketMinusButton(index, itemsInBasket.titles[itemIndex], itemsInBasket.amounts[itemIndex], itemsInBasket.prices[itemIndex], itemIndex);
  }
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getAddedButtonSectionTemplate(index, itemsInBasket.amounts[itemIndex], itemIndex);
  calculateOrderSum();
  basketFilledCountMobile();
}

/**
* Removes an item from the basket and updates the button section.
* @param {number} index - The index of the dish in the dishes array.
* @param {number} itemIndex - The index of the item in the basket arrays.
*
*/ 
function removeItemFromBasket(index, itemIndex) {
  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));
  itemsInBasket.titles.splice(itemIndex, 1);
  itemsInBasket.prices.splice(itemIndex, 1);
  itemsInBasket.amounts.splice(itemIndex, 1);
  LIST_OF_ADD_ITEM_TO_BASKET_SECTION[index].innerHTML = getDefaultButtonSetupInMenu(index);
  updateBasket();
  calculateOrderSum();
  toggleDnoneOnRemoveItem();
  basketFilledCountMobile();
}

//Updates the basket display based on the current items in the basket.
function updateBasket() {
  SELECTED_ITEMS.innerHTML = "";
  
  const LIST_OF_ADD_ITEM_TO_BASKET_SECTION = Array.from(document.querySelectorAll(".add-item-to-basket-section"));

  for (let currentBasketIndex = 0; currentBasketIndex < itemsInBasket.titles.length; currentBasketIndex++) {
    let currentDishIndex = dishNames.findIndex( dishName => dishName === itemsInBasket.titles[currentBasketIndex]);
    if (itemsInBasket.amounts[currentBasketIndex] == 1) {
        LIST_OF_ADD_ITEM_TO_BASKET_SECTION[currentDishIndex].innerHTML = getAddedButtonSectionTemplate(currentDishIndex, itemsInBasket.amounts[currentBasketIndex], currentBasketIndex);
        SELECTED_ITEMS.insertAdjacentHTML("beforeend", getItemInBasketTemplate(currentDishIndex, itemsInBasket.titles[currentBasketIndex], itemsInBasket.amounts[currentBasketIndex], itemsInBasket.prices[currentBasketIndex], currentBasketIndex));
    } else {
        LIST_OF_ADD_ITEM_TO_BASKET_SECTION[currentDishIndex].innerHTML = getAddedButtonSectionTemplate(currentDishIndex, itemsInBasket.amounts[currentBasketIndex], currentBasketIndex);
        SELECTED_ITEMS.insertAdjacentHTML("beforeend", getUpdateItemInBasketMinusButtonInArticle(currentDishIndex, itemsInBasket.titles[currentBasketIndex], itemsInBasket.amounts[currentBasketIndex], itemsInBasket.prices[currentBasketIndex], currentBasketIndex));
    }
  }
}

// Calculates the order sum including delivery fee and updates the order costs section and buy now button.
function calculateOrderSum() {
  ORDER_COSTS_SECTION.innerHTML = "";
  BUY_NOW_BUTTON.innerHTML = "";

  const deliveryFee = 4.99;
  let subTotal = 0;
  let sumOrder = 0;

  for (let currentBasketIndex = 0; currentBasketIndex < itemsInBasket.titles.length; currentBasketIndex++) {
    subTotal += itemsInBasket.prices[currentBasketIndex] * itemsInBasket.amounts[currentBasketIndex];
    sumOrder += subTotal + deliveryFee;
  }

  ORDER_COSTS_SECTION.innerHTML = getOrderCostsTemplate(subTotal, deliveryFee, sumOrder);
  BUY_NOW_BUTTON.innerHTML = getBuyNowContentTemplate(sumOrder);
}



// HELPER FUNCTIONS
// Adds an item to the itemsInBasket object arrays.
function addItemToItemsInBasket(itemIndex) {
  itemsInBasket.titles.push(dishes[itemIndex].name);
  itemsInBasket.prices.push(dishes[itemIndex].price);
  itemsInBasket.amounts.push(1);
}

// Calculates the total item amount in the basket.
function totalItemAmountinBasket() {
  let totalItemAmount = 0;
   for (let itemIndex = 0; itemIndex < itemsInBasket.titles.length; itemIndex++) {
     totalItemAmount += itemsInBasket.amounts[itemIndex];
  }
  return totalItemAmount;
}

// Updates the filled basket button count on mobile setup.
function basketFilledCountMobile() {
  FILLED_BASKET_BUTTON.innerHTML = getUpdateBasketCountMobile(totalItemAmountinBasket());
}

// Resets the itemsInBasket object arrays.
function resetItemsInBasketObject() {
  itemsInBasket.titles.length = 0;
  itemsInBasket.prices.length = 0;
  itemsInBasket.amounts.length = 0;
}

// Opens the appropriate dialog(desktop or mobile) based on the screen width.
function openDialogOnBuyNow() {
  if(innerWidth > 1024) {
    DIALOG_DESKTOP.showModal();
    DIALOG_MOBILE.close();
  } else {
    DIALOG_DESKTOP.close();
    DIALOG_MOBILE.showModal();
  }
}



// TOGGLE DNONE FUNCTIONS
//adds and removes the empty-, filled-basket, button variety on mobile setup and dialog sections when an item is added. 
function toggleDnoneOnAddItem() {
  if(itemsInBasket.titles.length == 1) {
    FILLED_BASKET.classList.remove("dNone", "dNone-mobile");
    EMPTY_BASKET.classList.add("dNone", "dNone-mobile");
    EMPTY_BASKET_BUTTON.classList.add("dNone");
    FILLED_BASKET_BUTTON.classList.remove("dNone");
    DIALOG_DESKTOP.classList.remove("dNone");
    DIALOG_MOBILE .classList.remove("dNone");
  } else {
    ""
  }
}

//adds and removes the empty-, filled-basket, button variety on mobile setup when an item is removed. 
function toggleDnoneOnRemoveItem(){
  if(itemsInBasket.titles.length == 0) {
    EMPTY_BASKET.classList.remove("dNone", "dNone-mobile");
    FILLED_BASKET.classList.add("dNone", "dNone-mobile");
    EMPTY_BASKET.classList.add("active-basket");
    FILLED_BASKET.classList.remove("active-basket");
    EMPTY_BASKET_BUTTON.classList.remove("dNone");
    FILLED_BASKET_BUTTON.classList.add("dNone");
  } else {
    ""
  }
}



// ADDEVENTLISTENERS AND INIT FUNCTION
// addEventListeners for nav bar buttons to change images on focus and blur
NAV_BAR_BUTTONS.forEach((button, index) => {
  const img = button.querySelector("img");
  if (!img) return;

  const originalSource = img.src;
  
  button.addEventListener("focus", () => {
    img.src = activeButtonSources[index];
    button.style.backgroundColor = "#fff";
    button.style.borderRadius = "4px";
  });

  button.addEventListener("blur", () => {
    img.src = originalSource;
    button.style.backgroundColor = "transparent";
    button.style.borderRadius = "";
  });
});

// addEventListeners for basket buttons to open empty or filled basket
NAV_BAR_BUTTONS_ARRAY[3 || 4].addEventListener("click", () => {
  if (itemsInBasket.titles.length == 0) {
    EMPTY_BASKET.classList.remove("dNone");
    EMPTY_BASKET.classList.add("active-basket");
    BACKDROP.classList.add("active");;
    BODY.classList.add("no-scroll");
    } else {
      FILLED_BASKET.classList.add("active-basket");
      FILLED_BASKET.focus();
      BACKDROP.classList.add("active");
      BODY.classList.add("no-scroll");
    }
});

// addEventListeners for close button in empty basket
CLOSE_EMPTY_BASKET.addEventListener("click", () => {
  EMPTY_BASKET.classList.add("dNone-mobile");
  EMPTY_BASKET.classList.remove("active-basket");
  BACKDROP.classList.remove("active");
  BODY.classList.remove("no-scroll");
});

// addEventListeners for close button in filled basket
CLOSE_FILLED_BASKET.addEventListener("click", () => {
  FILLED_BASKET.classList.remove("active-basket");
  BACKDROP.classList.remove("active");
  BODY.classList.remove("no-scroll");
});

// addEventListeners for close button in dialog desktop-setup
CLOSE_DIALOG_BUTTON_DESKTOP.addEventListener("click", () => {
    DIALOG_DESKTOP.close();
    DIALOG_DESKTOP.classList.add("dNone");
    DIALOG_DESKTOP.classList.remove("open");
    BACKDROP.classList.remove("active");
    BODY.classList.remove("no-scroll");
  });

// addEventListeners for close button in dialog mobile-setup
  CLOSE_DIALOG_BUTTON_MOBILE.addEventListener("click", () => {
    DIALOG_MOBILE.close();
    DIALOG_MOBILE.classList.add("dNone");
    DIALOG_MOBILE.classList.remove("open");
    BACKDROP.classList.remove("active");
    BODY.classList.remove("no-scroll");
  });


/* render all articles with data from dishes.js
*  reset basket and open dialog on buy now button click
*  set timeout to close dialog 3 seconds after it was opened
*/
function init() {
  renderDishes();
  BUY_NOW_BUTTON.addEventListener("click", () =>{
    resetItemsInBasketObject()
    updateBasket();
    renderDishes();
    openDialogOnBuyNow()
    DIALOG_DESKTOP.focus();
    DIALOG_MOBILE.focus();
    FILLED_BASKET.classList.add("dNone", "dNone-mobile");
    EMPTY_BASKET.classList.add("dNone", "dNone-mobile");
    FILLED_BASKET_BUTTON.classList.add("dNone");
    BACKDROP.classList.add("active");
    FILLED_BASKET.classList.remove("active-basket");
    EMPTY_BASKET_BUTTON.classList.remove("dNone");
    BODY.classList.add("no-scroll");
    // setTimeout(() => {
    //   DIALOG_DESKTOP.close();
    //   DIALOG_MOBILE.close();
    //   DIALOG_DESKTOP.classList.add("dNone");
    //   DIALOG_MOBILE.classList.add("dNone");
    //   DIALOG_DESKTOP.classList.remove("open");
    //   DIALOG_MOBILE.classList.remove("open");
    //   BACKDROP.classList.remove("active");
    //   BODY.classList.remove("no-scroll");
    // }, 3000);
  });
}

// Initialize the application init() when the window loads
window.onload = init;

//Ensure that dialog and filld basket mobile-setup are focusable
DIALOG_MOBILE.tabIndex = -1;
FILLED_BASKET.tabIndex = -1; 