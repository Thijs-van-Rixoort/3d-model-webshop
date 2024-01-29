/**
 * @author Jacky Schoen
 * @description This file creates the layout for the product detail page. 
 */

/**
 * Initializes the building of the product detail page.
 * @author Jacky Schoen
 */
function initProductDetailPage2(): void {
    let productName: string = 'Warrior Model';

    let returnToProductOverviewButton: HTMLAnchorElement = createReturnToProductOverviewButton();
    let productSection: HTMLElement = createProductSectionWithChildSections(productName);

    document.head.appendChild(createHeadTitle(productName));
    document.body.appendChild(returnToProductOverviewButton);
    document.body.appendChild(productSection);
}

/**
 * Creates the productSection together with its child sections. 
 * @param {string} productName The name of the current product.
 * @returns {HTMLElement} The productSection with its child sections. 
 * @author Jacky Schoen
 */
function createProductSectionWithChildSections(productName: string): HTMLElement {
    let productSection: HTMLElement = createElement('section', 'productSection');
    let productImageSection: HTMLElement = createElement('section', 'productImageSection');
    let productInfoSection: HTMLElement = createElement('section', 'productInfoSection');

    productSection = appendAllToProductSection(productSection, productImageSection, productInfoSection, productName);

    return productSection;
}

/**
 * Creates the title element of the page. 
 * @param {string} titleInnerText The text that will be displayed as the page title. 
 * @returns {HTMLTitleElement} The title element with an innerText. 
 * @author Jacky Schoen
 */
function createHeadTitle(titleInnerText: string): HTMLTitleElement {
    let titleElement: HTMLTitleElement = document.createElement('title');
    titleElement.innerText = titleInnerText;

    return titleElement;
}

/**
 * Appends all the child elements to product section. 
 * @param {HTMLElement} productSection The section containing both the image and the text related to the product.
 * @param {HTMLElement} productImageSection The section containing the image of the product. 
 * @param {HTMLElement} productInfoSection The section containing the information about the product. 
 * @param {string} productName The name of the product. 
 * @returns {HTMLElement} The product section with all its child elements. 
 * @author Jacky Schoen
 */
function appendAllToProductSection(productSection: HTMLElement, productImageSection: HTMLElement, productInfoSection: HTMLElement, productName: string): HTMLElement {
    let productDimensionsSection: HTMLElement = createElement('section', 'productInformationSection');
    productInfoSection = appendToProductInfoSection(productInfoSection, productName, productDimensionsSection);
    productInfoSection = appendMoreToProductInfoSection(productInfoSection);

    productSection.appendChild(productImageSection.appendChild(createProductImage('image', '../../public/assets/images/placeholder_20.png')));
    productSection.appendChild(productInfoSection);

    return productSection;
}

/**
 * Appends children to the product info section. 
 * @param {HTMLElement} productInfoSection The section containing the information about the product.  
 * @param {string} productName The name of the product.  
 * @param {HTMLElement} productDimensionsSection The section containing all the product dimensions. 
 * @returns {HTMLElement} The product info section with all its child elements. 
 * @author Jacky Schoen
 */
function appendToProductInfoSection(productInfoSection: HTMLElement, productName: string, productDimensionsSection: HTMLElement): HTMLElement {
    productInfoSection.appendChild(createSectionWithInnerText('nameSection', productName));
    productInfoSection.appendChild(createSectionWithInnerText('descriptionSection', 'Dit is een 3D model van een warrior.'));
    productInfoSection.appendChild(createProductDimensionsSection(5, 10, 2, productDimensionsSection));
    productInfoSection.appendChild(createSectionWithInnerText('filamentSection', `Beste filament: fil001`));
    productInfoSection.appendChild(createSectionWithInnerText('filetypeSection', `Bestandstype: .obj`));

    return productInfoSection;
}

/**
 * Appends children to the product info section. 
 * @param productInfoSection The section containing the information about the product.  
 * @returns {HTMLElement} The product info section with all its child elements. 
 * @author Jacky Schoen
 */
function appendMoreToProductInfoSection(productInfoSection: HTMLElement): HTMLElement {
    productInfoSection.appendChild(createSectionWithInnerText('sellerSection', `Verkocht door: John Doe`));
    productInfoSection.appendChild(createSectionWithInnerText('priceSection', `Prijs: €${5.99.toString()}`));
    productInfoSection.appendChild(createCartAndWishlistButton('addToCartButton', 'Voeg toe aan winkelwagen'));
    productInfoSection.appendChild(createCartAndWishlistButton('addToWishlistButton', 'Voeg toe aan verlanglijst'));

    return productInfoSection;
}

/**
 * Creates an image element with an id and source. 
 * @param {string} imageId The id for the image element. 
 * @param {string} imageSrc The source for the image element. 
 * @returns {HTMLImageElement} The image element with an id and source. 
 * @author Jacky Schoen
 */
function createProductImage(imageId: string, imageSrc: string): HTMLImageElement {
    let productImage: HTMLImageElement = document.createElement('img');
    productImage.id = imageId;
    productImage.src = imageSrc;

    return productImage;
}

/**
 * Creates a section element with an id and innerText.
 * @param sectionId The id of the section element.
 * @param sectionInnerText The innerText of the section element.
 * @returns {HTMLElement} The section element with an id and innerText.
 * @author Jacky Schoen
 */
function createSectionWithInnerText(sectionId: string, sectionInnerText: string): HTMLElement {
    let sectionElement: HTMLElement = createElement('section', sectionId);
    sectionElement.innerText = sectionInnerText;

    return sectionElement;
}

/**
 * Creates the product dimensions section with all its child elements. 
 * @param {number} xLength The length of the model.
 * @param {number} yLength The height of the model.
 * @param {number} zLength The depth of the model. 
 * @param {HTMLElement} productDimensionsSection The section containing all the product dimensions. 
 * @returns {HTMLElement} The product dimensions section with all the dimension sections. 
 * @author Jacky Schoen
 */
function createProductDimensionsSection(xLength: number, yLength: number, zLength: number, productDimensionsSection: HTMLElement): HTMLElement {
    let lengthSection: HTMLElement = createElement('section', 'lengthSection');
    let heightSection: HTMLElement = createElement('section', 'heightSection');
    let widthSection: HTMLElement = createElement('section', 'widthSection');

    lengthSection.innerText = `Lengte: ${xLength}mm`;
    heightSection.innerText = `Hoogte: ${yLength}mm`;
    widthSection.innerText = `Diepte: ${zLength}mm`;

    productDimensionsSection.appendChild(lengthSection).appendChild(heightSection).appendChild(widthSection);

    return productDimensionsSection;
}

/**
 * Creates a button element with an id and innerText.
 * @param {string} buttonId The id of the button.
 * @param {string} buttonInnerText The innerText of the button. 
 * @returns {HTMLButtonElement} The button element with an id and innerText.
 * @author Jacky Schoen
 */
function createCartAndWishlistButton(buttonId: string, buttonInnerText: string): HTMLButtonElement {
    let buttonElement: HTMLButtonElement = document.createElement('button');
    buttonElement.id = buttonId;
    buttonElement.innerText = buttonInnerText;

    return buttonElement;
}

/**
 * Creates an anchor- and button element that returns to the product overview. 
 * @returns {HTMLAnchorElement} The anchor element with an href and button appended to it. 
 * @author Jacky Schoen
 */
function createReturnToProductOverviewButton(): HTMLAnchorElement {
    let anchorElement: HTMLAnchorElement = document.createElement('a');
    let returnToProductOverviewButton: HTMLButtonElement = document.createElement('button');

    returnToProductOverviewButton.id = 'returnToProductOverviewButton';
    returnToProductOverviewButton.className = 'buttonSmall';
    returnToProductOverviewButton.innerText = 'Naar product overzicht';

    anchorElement.href = '../../public/html/product-overview.html';
    anchorElement.appendChild(returnToProductOverviewButton);

    return anchorElement;
}

// initProductDetailPage2();