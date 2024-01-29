/**
 * @author Jacky Schoen
 * @description Shopping cart delete button test.
 */

/**
 * Calls functions and stores return values. 
 * @author Jacky Schoen
 */
function initShoppingCart(): void {
    let numberOfProducts: number = 5;
    let price: number = 4.99;
    let clickCount: number = 0;

    createProductsAndButtons(numberOfProducts, price, clickCount);

    document.getElementById('totalPrice')!.innerText = `Totaal: €${(numberOfProducts * price).toFixed(2)}`;
}

/**
 * Creates the products and delete buttons. 
 * @param {number} numberOfProducts The number of products. 
 * @param {number} price The price of the products. 
 * @param {number} clickCount The number of clicks. 
 * @author Jacky Schoen
 */
function createProductsAndButtons(numberOfProducts: number, price: number, clickCount: number): void {
    for (let iteration: number = 1; iteration <= numberOfProducts; iteration++) {
        let section: HTMLElement = createSectionWithAttributes(iteration, price);
        let button: HTMLButtonElement = createButtonWithAttributes();

        button.addEventListener('click', () => {
            clickCount++;
            createNewCurrentShoppingCart(iteration, section, numberOfProducts, clickCount);
        });

        section.appendChild(button);
        (document.getElementById('productSection') as HTMLElement).appendChild(section);
    }
}

/**
 * Creates a button element with an innerText.
 * @returns {HTMLButtonElement} The button element with an innerText.
 * @author Jacky Schoen
 */
function createButtonWithAttributes(): HTMLButtonElement {
    let button: HTMLButtonElement = document.createElement('button');
    button.innerText = 'Verwijder';

    return button;
}

/**
 * Creates a section element with an id and innerText.
 * @param {number} iteration The current iteration.
 * @param {number} price The price of the products. 
 * @returns {HTMLElement} The section element with an id and innerText.
 * @author Jacky Schoen
 */
function createSectionWithAttributes(iteration: number, price: number): HTMLElement {
    let section: HTMLElement = document.createElement('section');
    section.id = `${iteration}`;
    section.innerText = `Product ${iteration} - ${price} `;

    return section;
}

/**
 * Creates a new instance of the class CurrentShoppingCart.
 * @param {number} iteration The current iteration. 
 * @param {HTMLElement} section The section element. 
 * @param {number} numberOfProducts The number of products. 
 * @param {number} clickCount The number of clicks. 
 * @author Jacky Schoen
 */
function createNewCurrentShoppingCart(iteration: number, section: HTMLElement, numberOfProducts: number, clickCount: number): void {
    let userValue: number = 1;
    let productValue: number = iteration;
    let currentShoppingCart: CurrentShoppingCart = new CurrentShoppingCart(userValue, productValue);

    if (section.id === iteration.toString()) {
        removeFromShoppingCart(currentShoppingCart, userValue, productValue, section, numberOfProducts, clickCount);
    }
}

/**
 * Removes product from the current shoppingcart. 
 * @param {CurrentShoppingCart} currentShoppingCart The instance of the CurrentShoppingCart Class. 
 * @param {number} userValue The id of the user.
 * @param {number} productValue The id of the product. 
 * @param {HTMLElement} section The section element.
 * @param {number} numberOfProducts The number of products. 
 * @param {number} clickCount The number of clicks. 
 * @author Jacky Schoen
 */
function removeFromShoppingCart(currentShoppingCart: CurrentShoppingCart, userValue: number, productValue: number, section: HTMLElement, numberOfProducts: number, clickCount: number): void {
    currentShoppingCart.removeRowFromShoppingCart();
    section.innerText = '';
    numberOfProducts = numberOfProducts - clickCount;
    document.getElementById('totalPrice')!.innerText = `Totaal: €${(numberOfProducts * 4.99).toFixed(2)}`;
}

initShoppingCart();