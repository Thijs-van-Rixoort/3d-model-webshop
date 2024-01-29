/**
 * @author Jacky Schoen
 * @description This file generates the product overview for the webshop.
 */

/**
 * Calls functions and stores return values.
 * @author Jacky Schoen
 */
async function initProductOverview(): Promise<void> {
    let productArray: Product[] = await (new StoreProductInDatabase()).deserializeAllProducts();
    let productCount: number = productArray.length;

    let selectSection: HTMLElement = createElement('section', 'selectSection');
    let productSection: HTMLElement = createElement('section', 'productSection');
    let productSectionHardcoded: HTMLElement = document.getElementById('products') as HTMLElement;

    productSectionHardcoded.appendChild(selectSection).appendChild(createSelectLabel()).appendChild(createSelectElement(productArray, productSection, productCount));
    (document.getElementById('showMoreButton') as HTMLElement).appendChild(createShowMoreButton(productArray, productSection, productCount));
    displayProducts(productArray, productSection, productCount);
}

/**
 * Creates a section element for the select element.
 * @returns {HTMLElement} The section element for the select element.
 * @author Jacky Schoen
 */
function createSelectLabel(): HTMLElement {
    let selectLabel: HTMLElement = createElement('label', 'selectLabel');
    selectLabel.setAttribute('for', 'selectProductAmount');
    selectLabel.innerText = 'Aantal producten: ';

    return selectLabel;
}

/**
 * Creates a select element with options, attributes and an event listener.
 * @param {Product[]} productArray The array of created products.
 * @param {HTMLElement} productSection The section all the product cards will be appended to.
 * @param {number} productCount The total amount of products from storage. 
 * @returns {HTMLElement} The select element with options, attributes and an event listener.
 * @author Jacky Schoen
 */
function createSelectElement(productArray: Product[], productSection: HTMLElement, productCount: number): HTMLElement {
    let selectElement: HTMLElement = createElement('select', 'selectProductAmount', 'selectElement');
    selectElement = createOptions(selectElement);
    selectElement.addEventListener('change', () => {
        productSection.innerText = '';
        displayProducts(productArray, productSection, productCount);
    });

    return selectElement;
}

/**
 * Creates option elements and appends them to the select element.
 * @param {HTMLElement} selectProductAmount The select element containing option elements for the amount of products being displayed.
 * @returns {HTMLElement} The select element containing option elements for the amount of products being displayed.
 * @author Jacky Schoen
 */
function createOptions(selectProductAmount: HTMLElement): HTMLElement {
    let optionsArray: number[] = [20, 40, 60, 80, 100];

    optionsArray.forEach(key => {
        let option: HTMLElement = new Option(key.toString());
        selectProductAmount.appendChild(option);
    });

    return selectProductAmount;
}

/**
 * Creates the 'show more' button with attributes and an event listener. 
 * @param {Product[]} productArray The array of created products.
 * @param {HTMLElement} productSection The section all the product cards will be appended to.
 * @param {number} productCount The total amount of products from storage. 
 * @returns {HTMLElement} The 'show more' button with attributes and an event listener. 
 * @author Jacky Schoen
 */
function createShowMoreButton(productArray: Product[], productSection: HTMLElement, productCount: number): HTMLElement {
    let showMoreButton: HTMLElement = createElement('button', 'moreProductsButton', 'buttonSmall');
    showMoreButton.innerText = 'Toon meer';
    showMoreButton.addEventListener('click', () => {
        displayProducts(productArray, productSection, productCount);
    });

    return showMoreButton;
}

/**
 * Creates the product cards and displays them on the page.
 * @param {Product[]} productArray The array of created products.
 * @param {HTMLElement} productSection The section all the product cards will be appended to.
 * @param {number} productCount The total amount of products from storage. 
 * @author Jacky Schoen 
 */
function displayProducts(productArray: Product[], productSection: HTMLElement, productCount: number): void {
    let productAmount: number = Number((document.getElementById('selectProductAmount') as HTMLInputElement).value);
    let renderedProducts: number = productSection.children.length;

    for (let iteration: number = renderedProducts; iteration < productAmount + renderedProducts && iteration < productCount; iteration++) {
        let imageSection: HTMLElement = createElement('section', 'imageSection');
        let infoSection: HTMLElement = createElement('section', 'infoSection');
        let productCard: HTMLFormElement = (createElement('form', 'productCard')) as HTMLFormElement;
        appendChildrenToProductCard(imageSection, infoSection, productSection, productCard, productArray, iteration);
    }
}

/**
 * Appends children to sections.
 * @param {HTMLElement} imageSection The section containing the product images.
 * @param {HTMLElement} infoSection The section containing the product title (name and price).
 * @param {HTMLElement} productSection The section all the product cards will be appended to.
 * @param {HTMLElement} productCard The section containing all the product information (title, price & image).
 * @param {Product[]} productArray The array of created products.
 * @param {number} iteration The amount of iterations of the for-loop in displayProducts().
 * @author Jacky Schoen
 */
function appendChildrenToProductCard(imageSection: HTMLElement, infoSection: HTMLElement, productSection: HTMLElement, productCard: HTMLFormElement, productArray: Product[], iteration: number): void {
    imageSection.appendChild(createImage(productArray[iteration]));
    infoSection.appendChild(document.createTextNode(`${productArray[iteration].name} - €${(productArray[iteration].price).toFixed(2)}`));

    let input: HTMLInputElement = createInputElementWithAttributes(productArray, iteration);
    productCard = giveProductCardAttributes(productCard);
    productCard.appendChild(input);

    productSection.appendChild(productCard).appendChild(infoSection).appendChild(imageSection);
    (document.getElementById('products') as HTMLElement).appendChild(productSection);
}

/**
 * Creates an input element with attributes.
 * @param {Product[]} productArray The array of created products.
 * @param {number} iteration The amount of iterations of the for-loop in displayProducts().
 * @returns {HTMLInputElement} The input element with attributes.
 * @author Jacky Schoen
 */
function createInputElementWithAttributes(productArray: Product[], iteration: number): HTMLInputElement {
    let inputElement: HTMLInputElement = document.createElement('input');
    inputElement.className = 'inputProductCard';
    inputElement.name = 'productId';
    inputElement.setAttribute('value', (productArray[iteration].id)!.toString());

    return inputElement;
}

/**
 * Gives attributes to the productCard element.
 * @param {HTMLFormElement} productCard The productCard element.
 * @returns {HTMLFormElement} The productCard element with attributes.
 * @author Jacky Schoen
 */
function giveProductCardAttributes(productCard: HTMLFormElement): HTMLFormElement {
    productCard.action = './product-detail-page.html';
    productCard.method = 'get';
    productCard.addEventListener('click', () => {
        productCard.requestSubmit();
    });

    return productCard;
}

/**
 * Creates the image for the current product in the productArray. 
 * @param {Product} product The current product in the productArray. 
 * @returns {HTMLImageElement} An image element with the current products source. 
 * @author Jacky Schoen
 */
function createImage(product: Product): HTMLImageElement {
    let productImage: HTMLImageElement = document.createElement('img');
    productImage.src = product.images[0];

    return productImage;
}

initProductOverview();