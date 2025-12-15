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
                    <button onclick="addItemToBasket(${dishIndex}, 'amount')" class="add-item-to-basket-btn">Add to basket</button>
                </div>
            </div>
           `
}

/**
 * Generates the HTML template for the added button section.
 * @param {number} index - The index of the dish in the dishes array.
 * @param {number} amount - The current amount of the dish in the basket.
 * @returns {string} The HTML template for the added button section.
 */
function getAddedButtonSectionTemplate(index, amount) {
    return `
            <button class="added-item-to-basket-btn">Added ${amount}</button>
            <button onclick="increaseItemAmount(${index}, 'amount')" class="item-added-increase">+</button>
           `
}