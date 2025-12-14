/**
 * Generates the HTML template for a dish description.
 * @param {number} dishIndex - The index of the dish in the dishes array.
 * @param {string} img - The value of imageName from the dishes array.
 * @param {string} name - The value of name from the dishes array.
 * @param {string} desc - The value of description from the dishes array.
 * @param {string} price - The value of price from the dishes array.
 * @returns {string} The HTML template string for each dish description.
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
                <button class="add-item-to-basket-btn">Add to basket</button>
            </div>
           `
}