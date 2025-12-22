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
            <img src="./assets/img/${dishes[dishIndex][img]}.jpg" alt="Bild von ${dishes[dishIndex][name]}">
            <div class="dish-desc" label="Beschreibung von ${dishes[dishIndex][name]}">
                <header>
                    <h3>
                        ${dishes[dishIndex][name]}
                    </h3>
                </header>
                <p aria-label="Beschreibung von ${dishes[dishIndex][name]}">
                    ${dishes[dishIndex][desc]}
                </p>
            </div>
            <div class="buy-info" aria-label="Kaufinformationen für ${dishes[dishIndex][name]}">
                <span class="price" aria-label="Preis: ${dishes[dishIndex][price].toFixed(2).replace('.', ',')} Euro">${dishes[dishIndex][price].toFixed(2).replace(".", ",")}€</span>
                <div class="add-item-to-basket-section">
                    <button onclick="addItemToBasket(${dishIndex})" class="add-item-to-basket-btn" aria-label="${dishes[dishIndex][name]} in den Warenkorb legen">Add to basket</button>
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
            <button class="added-item-to-basket-btn" aria-label="Anzahl Artikel: ${amount}">Added ${amount}</button>
            <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="item-added-increase" aria-label="Anzahl Artikel erhöhen">+</button>
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
            <article aria-label="Artikel im Warenkorb">
                <div class="item-amount" aria-label="Anzahl Artikel ${name} im Warenkorb steuern">
                    <span>${name}</span>
                    <div class="amount-control" aria-label="Artikelanzahl steuern">
                        <button onclick="removeItemFromBasket(${index}, ${itemIndex})" class="cart-item-remove" aria-label="Artikel ${name} aus dem Warenkorb entfernen">
                            <img src="./assets/img/favicons/delete.png" alt="Löschen Icon">
                        </button>
                        <span id="itemAmountInBasket" aria-label="Anzahl Artikel ${name} im Warenkorb">
                            ${amount}
                        </span>
                        <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease" aria-label="Artikelanzahl ${name} erhöhen">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="item-price" aria-label="Preis für ${name}">
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
                <div class="item-amount" aria-label="Anzahl Artikel ${name} im Warenkorb steuern">
                    <span>${name}</span>
                    <div class="amount-control" aria-label="Artikelanzahl steuern">
                        <button onclick="decreaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease" aria-label="Artikelanzahl ${name} verringern">
                            <span>-</span>
                        </button>
                        <span id="itemAmountInBasket" aria-label="Anzahl Artikel ${name} im Warenkorb">
                            ${amount}
                        </span>
                        <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease" aria-label="Artikelanzahl ${name} erhöhen">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="item-price" aria-label="Preis für ${name}">
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
function getUpdateItemInBasketMinusButtonInArticle(index, name, amount, price, itemIndex) {
    return `
            <article aria-label="Artikel im Warenkorb">
                <div class="item-amount" aria-label="Anzahl Artikel ${name} im Warenkorb steuern">
                    <span>${name}</span>
                    <div class="amount-control" aria-label="Artikelanzahl steuern">
                        <button onclick="decreaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease" aria-label="Artikelanzahl ${name} verringern">
                            <span>-</span>
                        </button>
                        <span id="itemAmountInBasket" aria-label="Anzahl Artikel ${name} im Warenkorb">
                            ${amount}
                        </span>
                        <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease" aria-label="Artikelanzahl ${name} erhöhen">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="item-price" aria-label="Preis für ${name}">
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
                <div class="item-amount" aria-label="Anzahl Artikel ${name} im Warenkorb steuern">
                    <span>${name}</span>
                    <div class="amount-control" aria-label="Artikelanzahl steuern">
                        <button onclick="removeItemFromBasket(${index}, ${itemIndex})" class="cart-item-remove" aria-label="Artikel ${name} aus dem Warenkorb entfernen">
                            <img src="./assets/img/favicons/delete.png" alt="">
                        </button>
                        <span id="itemAmountInBasket" aria-label="Anzahl Artikel ${name} im Warenkorb">
                            ${amount}
                        </span>
                        <button onclick="increaseItemAmount(${index}, ${itemIndex})" class="cart-item-increase-decrease" aria-label="Artikelanzahl ${name} erhöhen">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <div class="item-price" aria-label="Preis für ${name}">
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
             <button onclick="addItemToBasket(${index})" class="add-item-to-basket-btn" aria-label="${dishes[index][name]} in den Warenkorb legen">Add to basket</button>
           `
}

/**
 * Generates the HTML template for the order costs section.
 * @param {number} subTotal - The subtotal amount of the order.
 * @param {number} deliveryFee - The delivery fee amount of the order.
 * @param {number} sumOrder - The total amount of the order.
 * @returns {string} The HTML template for the order costs section.
 */
function getOrderCostsTemplate(subTotal, deliveryFee, sumOrder) {
    return `
            <tbody>
                <tr>
                    <td>Subtotal</td>
                    <td aria-label="Zwischensumme">${subTotal.toFixed(2).replace(".", ",")}€</td>
                </tr>
                <tr>
                    <td>Delivery fee</td>
                    <td aria-label="Liefergebühr">${deliveryFee.toFixed(2).replace(".", ",")}€</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td aria-label="Gesamtsumme">${sumOrder.toFixed(2).replace(".", ",")}€</td>
                </tr>
            </tfoot>
           `
}

/**
 * Generates the HTML template for the buy now button content.
 * @param {number} sumOrder - The total amount of the order.
 * @returns {string} The HTML template for the buy now button content.
 */
function getBuyNowContentTemplate(sumOrder) {
    return `
            <span>Buy now</span>
            <span>${sumOrder.toFixed(2).replace(".", ",")}€</span>
           `
}

/** Generates the HTML template for updating the basket count on mobile.
 * @param {number} itemsInBasket - The number of items in the basket.
 * @returns {string} The HTML template for updating the basket count on mobile.
 */
function getUpdateBasketCountMobile(itemsInBasket) {
    return `
            <img src="./assets/img/favicons/shopping_cart_filled.png" alt="Warenkorb Icon">
            <span class="basket-count">${itemsInBasket}</span>
            `
}