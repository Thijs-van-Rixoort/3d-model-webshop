/**
 * @author Ömer Aynaci
 * @description adding products to the cart when adding product to cart you get an pop-up that the added product
 * is added to the cart when adding product you see the name and the price of the added product
 */

/**
 * here creates table for the buttons and it adds order button , promo code apply button , promo code input field and
 * delete all products from shopping cart button
 */
function createShoppingCartButtonsInput() {
    addingTables();
    deleteButton();
    applyPromoButton();
    orderButton();
    promoApplyInput();
}
createShoppingCartButtonsInput();

/**
 * here creates a table for the product thats been added to the shopping cart table and when adding product to shopping cart
 * you get a popup that the product is been added
 * @author Ömer Aynaci
 */
function createShoppingCartProductData(): void {
    cartItemTable();
    addProductDummy();
    displayPopup();
    displayInLocalStorage();
    tableRowForProductDetails();
    addToCart();
}
createShoppingCartProductData();

/**
 * here displays that the added product is displaying in the localStorage
 * @author Ömer Aynaci
 */
function displayProductDetailsAndLocalStorage(): void {
    displayNameOfProduct();
    displayPriceOfProduct();
    priceProductDetail();
}
displayProductDetailsAndLocalStorage();

/**
 * here creates shopping cart the name detail of the product that's been added to the shopping cart
 * @author Ömer Aynaci
 */
function createShoppingCartNameDetail(): void {
    nameProductDetail();
}
createShoppingCartNameDetail();

/**
 * creates table and td for the buttons like the order button, promo apply button
 * @author Ömer Aynaci
 */
function addingTables() {
    let table = document.createElement("table")! as HTMLTableElement;
    let tableData = document.createElement("td")!;
    document.getElementById("shoppingCart")?.appendChild(table);
    table.appendChild(tableData);
    tableData.id = "tableData";
    table.id = "tableButtons";
}

/**
 * here creates the deletebutton and append to the table 
 * @author Ömer Aynaci
 */
function deleteButton() {
    let delButton = document.createElement("button")! as HTMLButtonElement;
    let txtNode = document.createTextNode("Verwijder alles");
    let tableData = document.getElementById("tableData");
    tableData?.appendChild(delButton);
    delButton.appendChild(txtNode);
    delButton.setAttribute("type", "button");
    delButton.id = "deleteButton";
    delButton.className = "buttonSmall";
}

/**
 * here creates the apply promo code button and append to the table
 * @author Ömer Aynaci
 */
function applyPromoButton() {
    let promoButton = document.createElement("button")! as HTMLButtonElement;
    let promoTxtNode = document.createTextNode("Toepassen")!;
    let tableData = document.getElementById("tableData")!;
    tableData.appendChild(promoButton);
    promoButton.appendChild(promoTxtNode);
    promoButton.id = "promoButton";
    promoButton.setAttribute("type", "button");
    promoButton.className = "buttonSmall";
}

/**
 * here creates the orderbutton and it's being appended to the table
 * @author Ömer Aynaci
 */
function orderButton() {
    let orderButton = document.createElement("button")! as HTMLButtonElement;
    let orderTxtNode = document.createTextNode("Bestellen")!
    let tableData = document.getElementById("tableData")!;
    tableData.appendChild(orderButton);
    orderButton.appendChild(orderTxtNode);
    orderButton.id = "orderButton";
    orderButton.setAttribute("type", "button");
    orderButton.className = "buttonSmall";
}

/**
 * here creates the promo apply input field then being appended to the table
 * @author Ömer Aynaci
 */
function promoApplyInput(): HTMLElement {
    let promoInput = document.createElement("input")! as HTMLInputElement;
    let tableData = document.getElementById("tableData")!;
    tableData.appendChild(promoInput);
    promoInput.id = "promoInput";
    promoInput.setAttribute("placeholder", "kortingscode");
    return tableData;
}

/**
 * here creates a table for the added products to the shopping cart
 * @author Ömer Aynaci
 */
function cartItemTable(): void {
    let cartTable = document.createElement("table")! as HTMLTableElement;
    let cartHeader = document.createElement("h2")! as HTMLHeadingElement;
    let cartTxtNode = document.createTextNode("Winkelwagen")!;
    document.getElementById("shoppingCart")!.appendChild(cartTable);
    document.getElementById("shoppingCart")!.appendChild(cartHeader);
    cartHeader.appendChild(cartTxtNode);
    cartTable.id = "cartItemTable";
    cartHeader.id = "cartHeader";
}

/**
 * here creates a dummy product to add to the shopping cart and that's being added to the cartItemTable
 * @author Ömer Aynaci
 */
function addProductDummy(): void {
    let dummyProduct = createElement("img", "imgProduct");
    let section = document.createElement("section")!;
    let addToCartButton = document.createElement("button")! as HTMLButtonElement;
    let productName = document.createTextNode("product 1");
    dummyProduct.appendChild(productName);
    document.getElementById("shoppingCart")!.appendChild(section);
    section.appendChild(dummyProduct);
    section.appendChild(addToCartButton);
    addToCartButton.id = "addToCart";
}

/**
 * here happens that the dummy product is being added to the shoppingcart
 * @author Ömer Aynaci
 */
function addToCart(): void {
    let addToCartButton: HTMLButtonElement = document.getElementById("addToCart")! as HTMLButtonElement;
    let addtoTable: HTMLTableElement = document.getElementById("cartItemTable")! as HTMLTableElement;
    let txtNode = document.createTextNode("voeg toe aan winkelwagen")!
    let dummyProduct: HTMLImageElement = document.querySelector("img")! as HTMLImageElement;
    addToCartButton.appendChild(txtNode);
    addToCartButton.className = "buttonSmall";
    addToCartButton.addEventListener("click", () => {
        addtoTable.appendChild(dummyProduct);
    });
    dummyProduct.src = "../../public/assets/images/product-card.png";
}

/**
 * here displays a popup when adding product to the shoppingcart
 * @author Ömer Aynacis
 */
function displayPopup(): HTMLElement {
    let orderPopupBtn: HTMLButtonElement = document.getElementById("addToCart")! as HTMLButtonElement;
    orderPopupBtn.addEventListener("click", () => {
        createSuccesNotification("Het product is toegevoegd aan de winkelwagen", 2000);
    });
    return orderPopupBtn;
}

/**
 * here creates an object and that is being displayed to the localstorage so when adding product to the shopping cart
 * you can see the product name price etc in the localstorage
 * @returns the object so the class
 * @author Ömer Aynaci
 */
function displayInLocalStorage(): Product {
    let orderPopupBtn: HTMLButtonElement = document.getElementById("addToCart")! as HTMLButtonElement;
    orderPopupBtn.addEventListener("click", displayInLocalStorage);
    let oldData = localStorage.getItem("Product");
    let newProduct: Product = new Product("Product", 4.99, ['/public/assets/images/placeholder_1.png'], [1, 2, 3], "obj", "gb", "John doe", "this is a 3D product", "13-05-2022", 10);
    if (oldData == null) {
        localStorage.setItem("Product", JSON.stringify([newProduct]));
    } else {
        let parsedData = JSON.parse(oldData);
        parsedData.push(newProduct);
        let newData = parsedData;
        localStorage.setItem("Product", JSON.stringify(newData));
    }
    return newProduct;
}

/**
 * here creates a tr and td for the title productdetails en these tr and td is being appended to the table where
 * the product is being added to
 * @author Ömer Aynaci
 */
function tableRowForProductDetails(): void {
    let table: HTMLTableElement = document.getElementById("cartItemTable")! as HTMLTableElement;
    let tableRow: HTMLTableRowElement = document.createElement("tr")! as HTMLTableRowElement;
    let tableData = document.createElement("td")!;
    table.appendChild(tableRow);
    tableRow.appendChild(tableData);
    tableRow.className = "row1";
    tableData.className = "tableData1";
    tableData.id = "tableDataId";
}

/**
 * here creates the price text so when adding product to shopping cart you see the price of the added product
 * @author Ömer Aynaci
 */
function priceProductDetail(): void {
    let tableRow: HTMLTableRowElement = document.querySelector(".tableData1")! as HTMLTableRowElement;
    let tableRowTxt = document.createTextNode("Product details");
    let productPriceSection = document.createElement("section")!;
    let txtNode = document.createTextNode("Prijs")!;
    tableRow.appendChild(tableRowTxt);
    tableRow.appendChild(productPriceSection);
    productPriceSection.appendChild(txtNode);
    productPriceSection.className = "sectionPrice";
}

/**
 * here creates the name text so when adding product to shopping cart you see the name of the added product
 * @author Ömer Aynac
 */
function nameProductDetail(): void {
    let tableRow: HTMLTableRowElement = document.querySelector(".tableData1")! as HTMLTableRowElement;
    let tableRowTxt = document.createTextNode("Naam");
    let productNameSection = document.createElement("section")!;
    tableRow.appendChild(productNameSection);
    productNameSection.appendChild(tableRowTxt);
    productNameSection.id = "productName";
}

/**
 * here displays the name of the product thats being added to the shopping cart
 * @author Ömer Aynaci
 */
function displayNameOfProduct(): void {
    let addToCartBtn: HTMLButtonElement = document.getElementById("addToCart")! as HTMLButtonElement;
    let productName = new Product("product", 4.99, ["/public/assets/images"], [1, 2, 3], "gb", "dd", "John doe", "This is a 3D product", "13-05-2022", 10).name;
    let displayName = document.createElement("h2")! as HTMLHeadingElement;
    let tableCart = document.getElementById("cartItemTable")! as HTMLTableElement;
    tableCart.appendChild(displayName);
    addToCartBtn.addEventListener("click", () => {
        displayName.innerText = productName;
    })
}

/**
 * here displays the price of the product thats being added to the shopping cart
 * @author Ömer Aynaci
 */
function displayPriceOfProduct(): void {
    let addToCartBtn: HTMLButtonElement = document.getElementById("addToCart")! as HTMLButtonElement;
    let productPrice = new Product("product", 4.99, [" / public / assets / images"], [1, 2, 3], "ts", "gb", "John doe", "This is a 3D product", "13-05-2022", 10).price;
    let displayPrice = document.createElement("h2")! as HTMLHeadingElement;
    let tableCart = document.getElementById("cartItemTable")! as HTMLTableElement;
    tableCart.appendChild(displayPrice);
    addToCartBtn.addEventListener("click", () => {
        displayPrice.innerText = productPrice.toString();
    });
    displayPrice.id = "priceHeader";
}