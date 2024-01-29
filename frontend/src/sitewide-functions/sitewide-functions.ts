/**
 * @author Jacky Schoen, Thijs van Rixoort
 * @description This file contains functions we use all over the website.
 */

/* -------------- GENERAL SECTION -------------- */
/**
 * Creates an HTML element and gives the element an id. 
 * @param {string} tagname The tagname of the HTML element we want to create.
 * @param {string} elementId The id of the HTML element we want to create.
 * @returns {HTMLElement} The created HTML element with an id.
 * @author Jacky Schoen
 */
function createElement(tagname: string, elementId: string, elementClass: string = ''): HTMLElement {
    let element: HTMLElement = document.createElement(tagname);
    element.id = elementId;
    element.className = elementClass;

    return element;
}

/* -------------- NAVIGATION BAR SECTION -------------- */
/**
 * Calls functions and stores return values.
 * @author Jacky Schoen
 */
function initNavigationBar(): void {
    let headerElement: HTMLElement = createElement('header', 'headerNavigationBar');
    let navElement: HTMLElement = createElement('nav', 'navNavigationBar');
    let undorderdListElement: HTMLElement = createElement('ul', 'ulNavigationBar');
    let searchbar: HTMLInputElement = createSearchbar();
    let searchButton: HTMLButtonElement = createSearchButton();


    // let searchSection: HTMLElement = createContainer();



    createNavigationBarButtons(undorderdListElement);
    (document.getElementById('navBarSection') as HTMLElement).appendChild(appendChildrenToHeader(headerElement, navElement, undorderdListElement, searchbar, searchButton));
}

/**
 * Creates the searchbar with an id and placeholder text.
 * @returns {HTMLInputElement} The searchbar with an id and placeholder text.
 * @author Jacky Schoen
 */
function createSearchbar(): HTMLInputElement {
    let searchbar: HTMLInputElement = document.createElement('input');
    searchbar.id = 'searchbar';
    searchbar.placeholder = 'zoeken...';

    return searchbar;
}

/**
 * Creates the searchbutton with an id, class, innerText and event listener.
 * @returns {HTMLButtonElement} The searchbutton with an id, class, innerText and event listener.
 * @author Jacky Schoen
 */
function createSearchButton(): HTMLButtonElement {
    let searchButton: HTMLButtonElement = document.createElement('button');
    searchButton.id = 'confirmButton';
    searchButton.className = 'navButton';
    searchButton.innerText = 'Zoek';
    searchButton.addEventListener('click', () => { (document.getElementById('searchbar') as HTMLInputElement).value = '' });

    return searchButton;
}



// function createContainer(): HTMLButtonElement {
//     let container: any = document.createElement("section");
//     container.id = `resultContainment`;
//     // (document.getElementById("searchSection") as HTMLElement).appendChild(searchButton)

//     return container;
// }




/**
 * Creates the list of buttons in the navigation bar.
 * @param {HTMLElement} undorderdListElement The unordered list element.
 * @author Jacky Schoen
 */
function createNavigationBarButtons(undorderdListElement: HTMLElement): void {
    let listItems: string[] = ['../../public/html/product-overview.html', '../../public/html/winkelwagen.html', '../../public/html/register-user.html', '../../public/html/contact-page.html', '../../public/html/upload-product.html'];
    let listItemNames: string[] = ['Producten', 'Winkelwagen', 'Registreren', 'Contact', 'Product Uploaden'];

    for (let i: number = 0; i < listItemNames.length; i++) {
        let anchorElement: HTMLElement = createElement('a', 'anchorNavigationBar', 'navButton');
        anchorElement.innerText = listItemNames[i];
        anchorElement.setAttribute('href', listItems[i]);
        undorderdListElement.appendChild(anchorElement);
    }
}

/**
 * Appends child elements to the header element.
 * @param {HTMLElement} headerElement The header element.
 * @param {HTMLElement} navElement The nav element.
 * @param {HTMLElement} undorderdListElement The ul element.
 * @param {HTMLElement} searchbar The searchbar (input element). 
 * @param {HTMLButtonElement} searchButton The button that activates the search function.
 * @returns {HTMLElement} The header element with its child elements.
 * @author Jacky Schoen
 */
function appendChildrenToHeader(headerElement: HTMLElement, navElement: HTMLElement, undorderdListElement: HTMLElement, searchbar: HTMLInputElement, searchButton: HTMLButtonElement): HTMLElement {
    undorderdListElement.appendChild(searchbar);
    undorderdListElement.appendChild(searchButton);
    navElement.appendChild(undorderdListElement);
    headerElement.appendChild(navElement);

    return headerElement;
}

initNavigationBar();

/* -------------- FOOTER SECTION -------------- */
/**
 * Calls functions and stores return values.
 * @author Jacky Schoen
 */
function initFooter(): void {
    let footerSection: HTMLElement | null = document.getElementById('footerSection') as HTMLElement;
    let listItems: string[] = ['../../public/html/terms-and-conditions.html', '../../public/html/mailing-list.html'];
    let listItemNames: string[] = ['Algemene Voorwaarden', 'Aanmelden Nieuwsbrief'];
    let unorderListElement: HTMLUListElement = createElement('ul', 'ulFooter') as HTMLUListElement;
    let footer: HTMLElement = document.createElement('footer');
    footer.id = 'footer';

    footer.appendChild(createFooterLinks(listItems, listItemNames, unorderListElement));
    (footerSection !== null ? footerSection.appendChild(footer) : console.error('footerSection ontbreekt'));
}

/**
 * Creates the URL's in the footer (anchor elements with href's.).
 * @param {string[]} listItems An array of URL's. 
 * @param {string[]} listItemNames An array with names corralating with the URL's in listItems.  
 * @param {HTMLUListElement} unorderListElement The unordered list element.
 * @returns {HTMLUListElement} The unordered list element with anchor elements. 
 * @author Jacky Schoen
 */
function createFooterLinks(listItems: string[], listItemNames: string[], unorderListElement: HTMLUListElement): HTMLUListElement {
    for (let i: number = 0; i < listItemNames.length; i++) {
        let anchorElement: HTMLAnchorElement = document.createElement('a');
        anchorElement.id = 'footerAnchor';
        anchorElement.innerText = listItemNames[i];
        anchorElement.setAttribute('href', listItems[i]);
        unorderListElement.appendChild(anchorElement);
    }

    return unorderListElement;
}

initFooter();



// NOTIFICATIONS SECTION //
/**
 * Creates an html element with the notification and hiddenNotification class and 
 * id "notification".
 * @param notificationText The text that is put into the notification.
 * @returns the created notification element.
 * @author Thijs van Rixoort
 */
function createNeutralNotification(notificationText: string): HTMLElement | null {
    let returnValue: HTMLElement | null = null;

    if (!isNotificationPresent()) {
        returnValue = document.createElement("section");

        returnValue.innerText = notificationText;
        returnValue.id = "notification";
        returnValue.classList.add("notification", "hiddenNotification");
    }

    return returnValue;
}

/**
 * Creates an error notification and appends it to the document.body.
 * @param notificationText The text that is put into the notification.
 * @author Thijs van Rixoort
 */
function createErrorNotification(notificationText: string): void {
    let notificationElement: HTMLElement | null = createNeutralNotification(notificationText);

    if (notificationElement) {
        notificationElement.classList.add("errorNotification");

        document.addEventListener("click", removeErrorNotificationEventListener);
        document.addEventListener("keydown", removeErrorNotificationEventListener);

        document.body.appendChild(notificationElement);

        setTimeout(() => { notificationElement!.classList.remove("hiddenNotification") }, 1);
    }
}

/**
 * Creates a succes notification and appends it to the document.body.
 * @param notificationText The text that is put into the notification.
 * @param notificationDurationInMilliSeconds The time the notification is shown in milliseconds.
 * @author Thijs van Rixoort
 */
function createSuccesNotification(notificationText: string, notificationDurationInMilliSeconds: number = 3000): void {
    let notificationElement: HTMLElement | null = createNeutralNotification(notificationText);

    if (notificationElement) {
        notificationElement.classList.add("succesNotification");

        document.body.appendChild(notificationElement);

        setTimeout(() => { notificationElement!.classList.remove("hiddenNotification") }, 1);
        setTimeout(hideAndDeleteNotification, notificationDurationInMilliSeconds);
    }
}

/**
 * Hides the notification and  deletes the notification after it is hidden.
 * @author Thijs van Rixoort
 */
function hideAndDeleteNotification(): void {
    let notification: HTMLElement = document.getElementById("notification")!;

    notification.classList.add("hiddenNotification");

    setTimeout(() => { document.body.removeChild(notification) }, 150);
}

/**
 * Removes the eventlistener that was added to the document when an errornotification was made.
 * @author Thijs van Rixoort
 */
function removeErrorNotificationEventListener(): void {
    hideAndDeleteNotification();
    document.removeEventListener("click", removeErrorNotificationEventListener);
    document.removeEventListener("keydown", removeErrorNotificationEventListener);
}

/**
 * Checks if there is an element with id "notification" present on the document.
 * @returns true if there is a notification present, false if there is not notification present.
 * @author Thijs van Rixoort
 */
function isNotificationPresent(): boolean {
    let returnBoolean: boolean = false;

    if (document.getElementById("notification")) {
        returnBoolean = true;
    }

    return returnBoolean;
}



//
/*
*
* Quicksearch Hotfix
*
*/
//

/**
 * @author Marcus Kaagman
 * @description This script generates HTML elements for a search bar, as well as goes through a JSON file to retrieve and display results.
 */


//Reference to the advanced search dedicated webpage, specifically for the Search button
const advancedSearchReferenceSearchbar = () => {
    window.location.href = `../html/advanced-search-page.html?searchquery=${(document.getElementById('searchbar') as HTMLInputElement).value}`;
};



/**
 * Pulls in JSON data, takes the names out of it into an array and looks for matches to succeed or fail on.
 * @author Marcus Kaagman
 */
const searchFunctionSearchbar = async () => {
    let userInput: string = String((document.getElementById('searchbar') as HTMLInputElement).value).toLowerCase();
    let data: Storage = (JSON.parse(localStorage.getItem('Product') as string));

    if (document.getElementsByClassName("resultSection") !== null) {
        let listClearerSearchbar = document.getElementsByClassName('resultSection') as HTMLCollection;

        for (; listClearerSearchbar.length > 0;) {
            listClearerSearchbar[0].remove()
        }
    };

    //pushes all the array productnames into its own array
    let nameList: Array<String> = [];
    data.forEach(function (arrayItem: { _name: String; }) {
        let seperateName = arrayItem._name;
        nameList.push(seperateName.toLowerCase())
    });

    //Loops through the array for a name corresponding to the given input to run Success. If none are found, run Failure instead.
    for (let index = -1, detector = 0; index !== 3; index++) { //@index !== 3 is how many rows to display. The standard of 3 will display 3 in a row.
        //detector = (nameList.indexOf(userInput));

        detector = (nameList.findIndex(element => element.includes(userInput)));

        try {
            successSearchbar(data, detector)
        } catch (error) {
        };

        //End of the loop.
        if (detector != -1) { nameList.splice(detector, 1, "replaced") }
    };
    failureSearchbar()
};

/**
 * Generates and Deploys information from a successful loop into a tab of the product visible for the user.
 * Called upon by @function searchFunction when successful.
 * @param inputName is the product name requested by the user.
 * @param data is the JSON file itself.
 * @param detector is which object it should take from the array if corresponding one has been found.
 * @author Marcus Kaagman
 */
const successSearchbar = (data: Storage, detector: number) => {  //might need to have this be called upon in the mother function instead

    if (detector !== 0 && (document.getElementsByClassName('resultSection') as HTMLCollection).length < 3) {
        let successfullSearch = document.createElement("section");
        successfullSearch.setAttribute(`class`, `resultSection`)
        successfullSearch.innerHTML = `
        <section class="searchResult">
        <a href="${data[detector]._name}" id="productPageLink">
        <img src="${data[detector]._images[0]}" id="searchImage" width="64" height="64">
        <span id="searchTitle">
        ${data[detector]._name}
        </span>
        <span id="searchDescription">
        ${data[detector]._filament}
        </span></a>
        </section>`;

        (document.getElementById("resultContainment") as HTMLElement).appendChild(successfullSearch)
    }
};

/**
 * Generates and Deploys information from an unsuccessful loop into a tab showing the user that no results could be found.
 * Called upon by @function searchFunction when unsuccessful.
 * @author Marcus Kaagman
 */
const failureSearchbar = () => {  //might need to have this be called upon in the mother function instead
    //not actual failure, just re-used and needing a rename.

    if (document.getElementsByClassName("resultSection") !== null && (document.getElementsByClassName('resultSection') as HTMLCollection).length > 2) {

        let failedSearch = document.createElement("section");
        failedSearch.setAttribute(`class`, `resultSection`)
        failedSearch.innerHTML = `
    <section id="searchFailed">
    <a id="searchFailMessage" href="../html/advanced-search-page.html?searchquery=${(document.getElementById('searchField') as HTMLInputElement).value}">
    Click here for more results
    </div>
    </section>`;

        (document.getElementById("resultContainment") as HTMLElement).appendChild(failedSearch)
    }
};

/**
 * Kickstarts the other functions
 * First 3 functions generates the HTML elements, last function generates the functionality (likely needs to be more split).
 * Gets called upon by the end of the file
 * @author Marcus Kaagman
 */
const motherFunctionSearchbar = () => {
    // searchSectionQS();
    // generateSearchBoxQS();
    // generateSearchButtonQS();

    let typeDetect = (document.getElementById('searchbar') as HTMLInputElement);
    typeDetect.addEventListener("input", searchFunctionSearchbar, false)

    let calculateButton = document.getElementById('confirmButton') as HTMLButtonElement;
    calculateButton.addEventListener('click', advancedSearchReferenceSearchbar);

};
motherFunctionSearchbar();


const output2 = () => {
    let searchButton: HTMLElement = document.createElement("span");
    searchButton.setAttribute(`id`, `resultContainment`);
    document.body.appendChild(searchButton)
};

output2();


///



function resolveAfter2MS(x: any) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(x);
        }, 10);
    });
}

const sessionIDVerify = async function (): Promise<string | null> {

    let obfuscation = sessionStorage.getItem("SessionKey");


    if (obfuscation != null) {

        const verify: any = await resolveAfter2MS((new StoreUserInDatabase()).verifySession(obfuscation));
        return verify[0].id;

    } else {
        return null;
    };
}

const verifyUser = async () => {

    coolnewbutton();

    if (sessionStorage.getItem("SessionKey") != null) {

        let loginVerified = await sessionIDVerify();
        if (loginVerified != null) {
            console.log(loginVerified);
            console.log((document.getElementsByClassName('navButton')[6] as HTMLElement).innerText);

            // (document.getElementsByClassName('navButton')[7]as HTMLElement).outerHTML = "";


            console.log("b")
        }
    } else {
        (document.getElementsByClassName('navButton')[6] as HTMLElement).outerHTML = "";
    }
    (document.getElementsByClassName('navButton')[6] as HTMLButtonElement).addEventListener("click", logout);
};

verifyUser();



const logout = () => {
    createSuccesNotification('Je bent succesvol uitgelogd!')

    window.setTimeout(function () {
        console.log("cool");
        sessionStorage.removeItem("SessionKey");
        window.location.href = "";
    }, 1200);


}





function coolnewbutton(): void {


    let anchorElement: HTMLElement = createElement('a', 'anchorNavigationBar', 'navButton');
    anchorElement.innerText = "Uitloggen";
    (document.getElementById("ulNavigationBar") as HTMLElement).appendChild(anchorElement);
}
