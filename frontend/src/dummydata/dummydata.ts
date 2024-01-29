/**
 * @description This program creates an html page that makes some dummy data in our storage.
 * @author Thijs van Rixoort
 */

/**
 * Initializes the HTML page.
 */
function initDummyDataPage(): void {
    let dummyDataSection: HTMLElement = document.createElement("section");

    dummyDataSection.appendChild(createDummyUsersButton());
    dummyDataSection.appendChild(createDummyProductsButton());
    dummyDataSection.appendChild(createDummyPromotionCodesButton());

    document.body.appendChild(dummyDataSection);
}

/**
 * Creates a user dummydata button.
 * @returns the created button.
 */
function createDummyUsersButton(): HTMLButtonElement {
    let returnButton: HTMLButtonElement = document.createElement("button");

    returnButton.innerText = "Genereer Users";
    returnButton.addEventListener("click", createDummyUsers);

    return returnButton;
}

/**
 * Creates a user dummy dataset and adds it to our storage. 
 */
function createDummyUsers(): void {
    let storageHandler: StoreUserInLocalStorage = new StoreUserInLocalStorage();

    for (let i: number = 0; i < 25; i++) {
        storageHandler.serialize(new User(generateDummyUserEmail(), createRandomlyGeneratedPassword(), []));
    }
}

/**
 * Generates a random emailaddress and checks if it's not in the storage yet.
 * @returns the generated email if it's not found in storage.
 */
function generateDummyUserEmail(): string {
    let userEmail: string = "";
    let mailServices: string[] = ["gmail", "outlook", "hotmail"];

    while (!isEmailValid(userEmail)) {
        userEmail = `user${Math.floor((Math.random() * 100) * (Math.random() * 100))}@${mailServices[Math.floor(Math.random() * mailServices.length)]}.com`;
    }

    return userEmail;
}

/**
 * Creates a randomly generated password.
 * @returns the generated password as a string.
 */
function createRandomlyGeneratedPassword(): string {
    let password: string = "";

    for (let i: number = 0; i < 10; i++) {
        password += `${String.fromCharCode(33 + Math.floor(Math.random() * 93))}`;
    }

    password += `${Math.floor(Math.random() * 10)}`;
    password += 'a';
    password += 'Z';

    return password;
}

/**
 * Creates a product dummydata button.
 * @returns the created button.
 */
function createDummyProductsButton(): HTMLButtonElement {
    let returnButton: HTMLButtonElement = document.createElement("button");

    returnButton.innerText = "Genereer Producten";
    returnButton.addEventListener("click", createDummyProducts);

    return returnButton;
}

/**
 * Creates a product dummy dataset and adds it to our storage. 
 */
async function createDummyProducts(): Promise<void> {
    let storageHandler: StoreProductInDatabase = new StoreProductInDatabase();
    let filamentTypes: string[] = ["eSUN PLA+", "Inland PLA+", "Hatchbox PLA", "Eryone PLA", "Prusament PLA", "Overture PLA", "Amolen PLA"];
    let fileTypes: string[] = ["STL", "OBJ", "3DS", "VRML", "SCAD", "3MF", "GCODE", "FBX"];

    for (let i: number = 0; i < 25; i++) {
        let response: Response = await storageHandler.serialize(new Product(
            `Product ${Math.ceil(Math.random() * 1000)}`,
            Math.ceil(Math.random() * 99) + 0.99,
            [
                generateRandomImagePath(),
                generateRandomImagePath(),
                generateRandomImagePath()
            ],
            [
                Math.ceil(Math.random() * 100),
                Math.ceil(Math.random() * 100),
                Math.ceil(Math.random() * 100)
            ],
            filamentTypes[i % filamentTypes.length],
            fileTypes[i % fileTypes.length],
            "seller_1",
            "Dit is een random gegenereerd product wat niet echt te koop is, sorry voor het ongemak."
        )
        );
        console.log(response);
    }
}

/**
 * Gets the path of one of the placeholder images in the assets/images folder.
 * @returns the generated image path.
 */
function generateRandomImagePath(): string {
    return `../assets/images/placeholder_${Math.ceil(Math.random() * 20)}.png`;
}

/**
 * Creates a promotion code dummydata button.
 * @returns the created button.
 */
function createDummyPromotionCodesButton(): HTMLButtonElement {
    let returnButton: HTMLButtonElement = document.createElement("button");

    returnButton.innerText = "Genereer Promotion Codes";
    returnButton.addEventListener("click", createDummyPromotionCodes);

    return returnButton;
}

/**
 * Creates a Promotion code dummy dataset and adds it to our storage. 
 */
function createDummyPromotionCodes(): void {
    let storageHandler: StorePromotionCodeInLocalStorage = new StorePromotionCodeInLocalStorage();
    let typesOfCode: string[] = ["discount_", "sale_", "holiday_"];

    for (let i: number = 0; i < 5; i++) {
        storageHandler.serialize(`${typesOfCode[Math.floor(Math.random() * typesOfCode.length)]}${Math.ceil(Math.random() * 100)}`);
    }
}

/**
 * Creates a user dummydata button.
 * @returns the created button.
 */
function createDummyFiletypesAndFilamentButton(): HTMLButtonElement {
    let returnButton: HTMLButtonElement = document.createElement("button");

    returnButton.innerText = "Genereer Filetypes & Filaments";
    returnButton.addEventListener("click", createDummyFiletypesAndFilament);

    return returnButton;
}

/**
 * Stores a few filaments and filetypes in the database.
 */
function createDummyFiletypesAndFilament(): void {
    storeDummyFilaments();
    storeDummyFiletypes();
}

/**
 * Stores a few filaments in the database.
 */
function storeDummyFilaments(): void {
    let filamentTypes: string[] = ["eSUN PLA+", "Inland PLA+", "Hatchbox PLA", "Eryone PLA", "Prusament PLA", "Overture PLA", "Amolen PLA"];
    let storageHandler: StoreFilamentInDatabase = new StoreFilamentInDatabase();

    filamentTypes.forEach(filament => {
        storageHandler.serialize(filament);
    });
}

/**
 * Stores a few filetypes in the database.
 */
function storeDummyFiletypes(): void {
    let fileTypes: string[] = ["STL", "OBJ", "3DS", "VRML", "SCAD", "3MF", "GCODE", "FBX"];
    let storageHandler: StoreFiletypeInDatabase = new StoreFiletypeInDatabase();

    fileTypes.forEach(filetype => {
        storageHandler.serialize(filetype);
    });
}

initDummyDataPage();

