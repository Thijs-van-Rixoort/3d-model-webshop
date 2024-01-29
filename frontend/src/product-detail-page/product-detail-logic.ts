/**
 * @author Jacky Schoen
 * @description This program contains the logic behind the product detail page.
 */

/**
 * Calls functions and stores return values
 * @author Jacky Schoen
 */
async function initProductDetailPage(): Promise<void> {
    let product: Product = await new StoreProductInDatabase().deserializeProduct(getProductId());

    if (product) {
        appendChildrenToElements(product);
        displayProductInformation(product);
    } else {
        document.getElementById('mainSection')!.innerText = '';
        createErrorNotification('Er is geen infomatie over dit product gevonden.');
    }
}

/**
 * Gets the id of the current product.
 * @returns {number} The id of the current product.
 * @author Jacky Schoen
 */
function getProductId(): number {
    let queryString: string = window.location.search;
    let urlParams: URLSearchParams = new URLSearchParams(queryString);

    return +urlParams.get('productId')!;
}

/**
 * Appends children to parent elements. 
 * @param {Product} product The current product.
 * @author Jacky Schoen
 */
function appendChildrenToElements(product: Product): void {
    let productDimensionsSection: HTMLElement = (document.getElementById('productDimensionsSection') as HTMLElement);

    document.head.appendChild(createTitleElement(product.name));

    (document.getElementById('productImage') as HTMLElement).appendChild(createImageElement(product.images[0]));

    productDimensionsSection.appendChild(createSectionElement('length', `Lengte: ${product.dimensions[0]}mm`));
    productDimensionsSection.appendChild(createSectionElement('height', `Hoogte: ${product.dimensions[1]}mm`));
    productDimensionsSection.appendChild(createSectionElement('width', `Breedte: ${product.dimensions[2]}mm`));
}

/**
 * Creates a section element with an id and innerText.
 * @param {string} sectionId The id of the section. 
 * @param {string} sectionInnerText The innerText of the section. 
 * @returns {HTMLElement} The section element with an id and innerText.
 * @author Jacky Schoen
 */
function createSectionElement(sectionId: string, sectionInnerText: string): HTMLElement {
    let section: HTMLElement = document.createElement('section');
    section.id = sectionId;
    section.innerText = sectionInnerText;

    return section;
}

/**
 * Creates a title element with an innerText.
 * @param {string} titleInnerText The innerText (product name).
 * @returns {HTMLTitleElement} The title element with an innerText.
 * @author Jacky Schoen
 */
function createTitleElement(titleInnerText: string): HTMLTitleElement {
    let titleElement: HTMLTitleElement = document.createElement('title');
    titleElement.innerText = titleInnerText;

    return titleElement;
}

/**
 * Creates an image element with an id and src. 
 * @param {string} imageSrc The source of the image. 
 * @returns {HTMLImageElement} The image element with an id and src. 
 * @author Jacky Schoen
 */
function createImageElement(imageSrc: string): HTMLImageElement {
    let imageElement: HTMLImageElement = document.createElement('img');
    imageElement.id = 'productImage';
    imageElement.src = imageSrc;

    return imageElement;
}

/**
 * Displays the information of about the product. 
 * @param {Product} product The current product.
 * @author Jacky Schoen
 */
function displayProductInformation(product: Product): void {
    let descriptionSection: HTMLElement = (document.getElementById('descriptionSection') as HTMLElement);
    let filamentSection: HTMLElement = (document.getElementById('filamentSection') as HTMLElement);

    (product.description !== undefined ? descriptionSection.innerText = product.description : descriptionSection.innerText = 'Geen beschrijving beschikbaar.');
    (product.filament !== undefined ? filamentSection.innerText = product.filament : filamentSection.innerText = 'Geen filament beschikbaar.');

    (document.getElementById('nameSection') as HTMLElement).innerText = product.name;
    (document.getElementById('filetypeSection') as HTMLElement).innerText = product.filetype;
    (document.getElementById('sellerSection') as HTMLElement).innerText = `Verkocht door: ${product.seller}`;
    (document.getElementById('priceSection') as HTMLElement).innerText = `Prijs: €${(product.price).toFixed(2)}`;
}

/**
 * Adds and event listener to the 'Zet product op inactief' button.
 * @author Jacky Schoen
 */
function listenSetProductInactive(): void {
    let setProductInactiveButton: HTMLButtonElement = document.getElementById('productOnInactive') as HTMLButtonElement;
    setProductInactiveButton.addEventListener('click', initSetProductInactive);
}

/**
 * Sends a PUT request, headers and product id to the backend. 
 * @param {Event} event The Event object.
 * @author Jacky Schoen
 */
async function initSetProductInactive(event: Event): Promise<void> {
    event.preventDefault();

    let productId: number = getProductId();
    const request: Request = new Request('http://localhost:4001/setProductInactive');
    const headers: Headers = giveHeader();
    const content: string = JSON.stringify({ id: productId });
    const response: Response = await fetch(request, { method: "PUT", headers, body: content, mode: 'cors' });

    (response.status === 200 ? createSuccesNotification('Het product is succesvol op inactief gezet.') : checkErrorStatus(response));
}

/**
 * Creates headers and appends name/value pairs.
 * @returns {Headers} The headers with name/value pairs. 
 * @author Jacky Schoen
 */
function giveHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return headers;
}

/**
 * Checks error status codes and display an error notification accordingly. 
 * @param {Response} response The response to the request.
 * @author Jacky Schoen
 */
function checkErrorStatus(response: Response): void {
    if (response.status === 400) {
        createErrorNotification('Er is helaas iets fout gegaan.');
    } else if (response.status === 404) {
        createErrorNotification('Dit product bestaat niet.');
    } else {
        createErrorNotification('Dit product is al inactief.');
    }
}

initProductDetailPage();
listenSetProductInactive();