/**
 * Generates the HTML template for a dish description.
 * @param {number} dishIndex - The index of the dish in the dishes array.
 * @param {string} img - The property name for the imageName in the dishes array.
 * @param {string} name - The property name for the name in the dishes array.
 * @param {string} desc - The property name for the description in the dishes array.
 * @param {string} price - The property name for the price in the dishes array.
 * @returns {string} The HTML template for the dish description.
 */ 
function getDishDescriptionTemplate(dishIndex, img, name, desc, price) {
    return `
            <img src="./src/img/${dishes[dishIndex][img]}.jpg" alt="">
            <div class="dish-desc">
                <header>
                    <h3>
                        ${dishes[dishIndex][name]}
                    </h3>
                </header>
                <p>
                    ${dishes[dishIndex][desc]}
                </p>
            </div>
            <div class="buy-info">
                <span class="price">${dishes[dishIndex][price].toFixed(2).replace(".", ",")}€</span>
                <div class="add-item-to-basket-section">
                    <button onclick="addItemToBasket(${dishIndex})" class="add-item-to-basket-btn">Add to basket</button>
                </div>
            </div>
           `
}

/**
 * Generates the HTML template for the added button section.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {number} amount - The amount of the specific item in the basket.
 * @param {number} itemIndex - The index of the item in the basket arrays.
 * @returns {string} The HTML template for the added button section.
 */
function getAddedButtonSectionTemplate(index, amount, itemIndex) {
    return `
            <button class="added-item-to-basket-btn">Added ${amount}</button>
            <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="item-added-increase">+</button>
           `
}

/**
 * Generates the HTML template for an item in the basket.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {string} name - The name of the dish.
 * @param {number} amount - The amount of the specific item in the basket.
 * @param {number} price - The price of the dish.
 * @param {number} itemIndex - The index of the item in the basket arrays.
 * @returns {string} The HTML template for an item in the basket.
 */
function getItemInBasketTemplate(index, name, amount, price, itemIndex) {
    return `
            <article>
                <div class="item-amount">
                    <span>${name}</span>
                    <div class="amount-control">
                        <button onclick="removeItemFromBasket(${index}, ${itemIndex})" class="cart-item-remove">
                            <img src="./src/img/favicons/delete.png" alt="">
                        </button>
                        <span id="itemAmountInBasket">
                            ${amount}
                        </span>
                        <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="item-price">
                    <span>${price.toFixed(2).replace(".", ",")}€</span>
                </div>
            </article>
           `
}

/**
 * Generates the HTML template for an item in the basket.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {string} name - The name of the dish.
 * @param {number} amount - The amount of the specific item in the basket.
 * @param {number} price - The price of the dish.
 * @param {number} itemIndex - The index of the item in the basket arrays.
 * @returns {string} The HTML template for an item in the basket.
 */
function getUpdateItemInBasketMinusButton(index, name, amount, price, itemIndex) {
    return `
                <div class="item-amount">
                    <span>${name}</span>
                    <div class="amount-control">
                        <button onclick="decreaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease">
                            <span>-</span>
                        </button>
                        <span id="itemAmountInBasket">
                            ${amount}
                        </span>
                        <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="item-price">
                    <span>${price.toFixed(2).replace(".", ",")}€</span>
                </div>
           `
}

/**
 * Generates the HTML template for an item in the basket.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {string} name - The name of the dish.
 * @param {number} amount - The amount of the specific item in the basket.
 * @param {number} price - The price of the dish.
 * @param {number} itemIndex - The index of the item in the basket arrays.
 * @returns {string} The HTML template for an item in the basket.
 */
function getUpdateItemInBasketMinusButtonUpdate(index, name, amount, price, itemIndex) {
    return `
            <article>
                <div class="item-amount">
                    <span>${name}</span>
                    <div class="amount-control">
                        <button onclick="decreaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease">
                            <span>-</span>
                        </button>
                        <span id="itemAmountInBasket">
                            ${amount}
                        </span>
                        <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="item-price">
                    <span>${price.toFixed(2).replace(".", ",")}€</span>
                </div>
            </article>
           `
}

/**
 * Generates the HTML template for an item in the basket.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {string} name - The name of the dish.
 * @param {number} amount - The amount of the specific item in the basket.
 * @param {number} price - The price of the dish.
 * @param {number} itemIndex - The index of the item in the basket arrays.
 * @returns {string} The HTML template for an item in the basket.
 */
function getDefaultButtonSetupInBasket(index, name, amount, price, itemIndex) {
    return `
                <div class="item-amount">
                    <span>${name}</span>
                    <div class="amount-control">
                        <button onclick="removeItemFromBasket(${index}, ${itemIndex})" class="cart-item-remove">
                            <img src="./src/img/favicons/delete.png" alt="">
                        </button>
                        <span id="itemAmountInBasket">
                            ${amount}
                        </span>
                        <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="item-price">
                    <span>${price.toFixed(2).replace(".", ",")}€</span>
                </div>
           `
}

/**
 * Generates the HTML template for the amount of the specific item in the basket.
 * @param {number} amount - The current amount of the dish in the basket.
 * @returns {string} The HTML template for updating the item amount in the basket.
 */
function getUpdateItemAmountInBasket(amount) {
    return `
            ${amount}
           `

}

/**
 * Generates the HTML template for the default button setup in the menu.
 * @param {number} index - The index of the dish in the dishes array.
 * @returns {string} The HTML template for the default button setup in the menu.
 */
function getDefaultButtonSetupInMenu(index) {
    return `
             <button onclick="addItemToBasket(${index})" class="add-item-to-basket-btn">Add to basket</button>
           `
}