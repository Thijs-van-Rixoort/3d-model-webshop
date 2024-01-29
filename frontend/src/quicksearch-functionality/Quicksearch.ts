//MOVED TO SITEWIDE FUNCTIONS, DEFUNCT.

/**
 * @author Marcus Kaagman
 * @description This script generates HTML elements for a search bar, as well as goes through a JSON file to retrieve and display results.
 */

/**
 * Creates a Section meant to contain the newly generating elements. This is under the @id searchSection
 * @author Marcus Kaagman
 */
const searchSectionQS = () => {
    let searchingSection: HTMLElement = document.createElement("form");
    searchingSection.setAttribute(`id`, `searchSection`);
    searchingSection.setAttribute(`action`, `javascript:void(0);`);
    document.body.appendChild(searchingSection)
};

// /**
//  * Creates a SearchBox to be appended to the generated @tag <Section id='searchSection'>
//  * @author Marcus Kaagman
//  */
const generateSearchBoxQS = () => {
    let searchBox: HTMLInputElement = document.createElement("input");
    searchBox.type = `text`;
    searchBox.id = `searchField`;
    searchBox.autocomplete = "off";
    (document.getElementById("searchSection") as HTMLElement).appendChild(searchBox)
};

/**
 * Creates a SearchButton to be appended to the @tag <Section id='searchSection'> as well
 * @author Marcus Kaagman
 */
const generateSearchButtonQS = () => {
    let searchButton: HTMLElement = document.createElement("button");
    searchButton.setAttribute(`type`, `submit`);
    searchButton.setAttribute(`id`, `searchButton`);
    searchButton.innerHTML = "Search";
    (document.getElementById("searchSection") as HTMLElement).appendChild(searchButton)
};


const output = () => {
    let searchButton: HTMLElement = document.createElement("section");
    searchButton.setAttribute(`id`, `resultContainment`);
    (document.getElementById("searchSection") as HTMLElement).appendChild(searchButton)
};





//Reference to the advanced search dedicated webpage, specifically for the Search button
const advancedSearchReference = () => {
    window.location.href = `../html/advanced-search-page.html?searchquery=${(document.getElementById('searchField') as HTMLInputElement).value}`;
};



/**
 * Pulls in JSON data, takes the names out of it into an array and looks for matches to succeed or fail on.
 * @author Marcus Kaagman
 */
const searchFunctionQS = async () => {
    let userInput: string = String((document.getElementById('searchField') as HTMLInputElement).value).toLowerCase();
    let data: Storage = (JSON.parse(localStorage.getItem('Product') as string));

    if (document.getElementsByClassName("resultSection") !== null) {
        let listClearerQS = document.getElementsByClassName('resultSection') as HTMLCollection;

        for (; listClearerQS.length > 0;) {
            listClearerQS[0].remove()
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
            successQS(data, detector)
        } catch (error) {
        };

        //End of the loop.
        if (detector != -1) { nameList.splice(detector, 1, "replaced") }
    };
    failureQS()
};

/**
 * Generates and Deploys information from a successful loop into a tab of the product visible for the user.
 * Called upon by @function searchFunction when successful.
 * @param inputName is the product name requested by the user.
 * @param data is the JSON file itself.
 * @param detector is which object it should take from the array if corresponding one has been found.
 * @author Marcus Kaagman
 */
const successQS = (data: Storage, detector: number) => {  //might need to have this be called upon in the mother function instead

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
const failureQS = () => {  //might need to have this be called upon in the mother function instead
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
const motherFunctionQS = () => {
    searchSectionQS();
    generateSearchBoxQS();
    generateSearchButtonQS();
    output();

    let typeDetect = (document.getElementById('searchField') as HTMLInputElement);
    typeDetect.addEventListener("input", searchFunctionQS, false)

    let calculateButton = document.getElementById('searchButton') as HTMLButtonElement | null;
    if (calculateButton != null) {
        calculateButton.addEventListener('click', advancedSearchReference, false)
    }
};
motherFunctionQS()