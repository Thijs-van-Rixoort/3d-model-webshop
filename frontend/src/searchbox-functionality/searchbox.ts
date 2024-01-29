//
/**
 * @title Advanced Search Module
 * @author Marcus Kaagman
 * @description This script generates HTML elements for a search bar, as well as goes through a JSON file to retrieve and display results.
 */
//

/**
 * ================================================
 *  | HTML Generative functions: Static Elements |
 * ================================================
 */

/**
 * Appends the dropdown itself to the body which allows the user to limit displayed result on page
 * @author Marcus Kaagman
 */
const displayAmountSection = () => {
  let displaySection: HTMLElement = document.createElement("section");
  displaySection.setAttribute(`id`, `displaySection`);
  document.body.appendChild(displaySection);
};

/**
 * Runs a loop to create interaction based upon the preferred displaylength & amount of buttons to give to the end user.
 * It runs the @function displayContainedTextButton to create these buttons
 * It runs the @function createDisplayLimit to generate the options into localstorage
 * @param displayIncrement is how many items you'd like to display
 * @param amountOfOptions is how many buttons you'd like to give.
 * @author Marcus Kaagman
 */
const displayGenerator = () => {
  let displayIncrement = 20; //How much elements should be displayed. If amountOfOptions >= 1; The new options is the increment x number of button. Ex. Button 2 = 20 x 2 = 40.
  let amountOfOptions = 3; //Amount of buttons under the displayAmount dropdown.

  for (let index = 0; index < amountOfOptions; index++) {
    let buttonValueCalc = displayIncrement * (index + 1);
    displayContainedTextButton(buttonValueCalc, index); //Generates the buttons
    createDisplayLimit(buttonValueCalc, index); //Generates the SessionStorage.
  }
};

/**
 * Creates an Anchor element which acts as the display length buttons to be appended to the dropdown
 * @param buttonValueCalc is used here to display which option said button is
 * @param index gets used here to generate the ID to work in tandem with the sessionstorage.
 * @author Marcus Kaagman
 */
const displayContainedTextButton = (buttonValueCalc: number, index: number) => {
  let displayPickerButton: HTMLAnchorElement = document.createElement("a");
  displayPickerButton.setAttribute(`id`, `displayCount:${index + 1}`);
  displayPickerButton.setAttribute(`class`, `dropElement`);
  displayPickerButton.href = "";
  displayPickerButton.innerText = `${buttonValueCalc} Items`;
  (document.getElementById("dropdown") as HTMLElement).appendChild(
    displayPickerButton
  );
};

/**
 * Generates a div to hold the loose display length buttons within
 * @author Marcus Kaagman
 */
const displayContainedText = () => {
  let displayPicker: HTMLElement = document.createElement("div");
  displayPicker.setAttribute(`id`, `dropdown`);
  displayPicker.setAttribute(`class`, `dropdownClass`);
  (document.getElementById("displaySection") as HTMLElement).appendChild(
    displayPicker
  );
};

/**
 * Appends a dropdown button to the section under @id ="displaySection" which allows the user to change the amount of item's shown
 * @param displayLength retrieves the value from Motherfunction > HTMLGeneration > This. It shows the value it's set to to the end user.
 * @author Marcus Kaagman
 */
const dropdownDisplayAmount = () => {
  let displayAmount: HTMLElement = document.createElement("button");
  displayAmount.setAttribute(`class`, `dropdown`);
  displayAmount.id = "displayAmountDropdown";
  let displayLength = sessionStorage.getItem("displayMode");
  displayAmount.innerText = `${displayLength} Items`;

  displayAmount.addEventListener(
    "click",
    function () {
      (document.getElementById("dropdown") as HTMLElement).classList.toggle(
        "show"
      );
    },
    false
  );

  (document.getElementById("displaySection") as HTMLElement).appendChild(
    displayAmount
  );
};

/**
 * Akin to the displayGenerator but for sorting methodes
 * @author Marcus Kaagman
 */
const sortingGenerator = (optionArray: string[]) => {
  for (let index = 0; index < optionArray.length; index++) {
    sortingSectionInnerStuffButtons(optionArray, index);
    createSortElements(index); ////
  }
};

/**
 * Appends a section to the body which allows the user to change the sorting method
 * @author Marcus Kaagman
 */
const sortingSection = () => {
  let sortingSection: HTMLElement = document.createElement("section");
  sortingSection.setAttribute(`id`, `sortSection`);
  document.body.appendChild(sortingSection);
};

/**
 * Creates a div to hold the sorting buttons within.
 * @author Marcus Kaagman
 */
const sortingSectionInnerStuff = () => {
  let mainSortingButton: HTMLElement = document.createElement("div");
  mainSortingButton.setAttribute(`id`, `dropdownSort`);
  mainSortingButton.setAttribute(`class`, `dropdownClass`);
  (document.getElementById("sortingAmountDropdown") as HTMLElement).appendChild(
    mainSortingButton
  );
};

/**
 * Buttons used for sorting the list
 * @author Marcus Kaagman
 */
const sortingSectionInnerStuffButtons = (
  optionArray: string[],
  index: number
) => {
  let sortingButtons: HTMLAnchorElement = document.createElement("a");
  sortingButtons.setAttribute(`id`, `sortMethod:${index + 1}`);
  sortingButtons.setAttribute(`class`, `dropElement`);
  sortingButtons.innerText = `${optionArray[index]}`;

  sortingButtons.href = "";
  (document.getElementById("dropdownSort") as HTMLElement).appendChild(
    sortingButtons
  );
};

/**
 * Appends a dropdown button to the section under @id ="sortSection" which allows the user to change the sorting method.
 * @author Marcus Kaagman
 */
const sortingDisplayAmount = (optionArray: string[]) => {
  let sortingAmount: HTMLElement = document.createElement("button");
  sortingAmount.setAttribute(`class`, `dropdown`);
  sortingAmount.id = "sortingAmountDropdown";

  let thecurrentstoredvalue = Number(
    sessionStorage.getItem("sortMode") as string
  );
  sortingAmount.innerText = `${optionArray[thecurrentstoredvalue - 1]}`;

  sortingAmount.addEventListener(
    "click",
    function () {
      (document.getElementById("dropdownSort") as HTMLElement).classList.toggle(
        "show"
      );
    },
    false
  );

  (document.getElementById("sortSection") as HTMLElement).appendChild(
    sortingAmount
  );
};

/**
 * Appends an interactible which clears the searchfield. On reload this is undone and needs to be fixed (just like the rest needs a speedup) though it's past 1 AM.
 * @author Marcus Kaagman
 */
const clearSearch = () => {
  // let searchCleares: HTMLElement = document.createElement("a");
  // searchCleares.id = "searchClear";
  // searchCleares.innerText = `x`;
  // searchCleares.setAttribute(
  //   `onClick`,
  //   `document.getElementById('searchFieldAdvanced').value = ""; searchFunction()`
  // );
  // (document.getElementById("searchSectionAdvanced") as HTMLElement).appendChild(
  //   searchCleares
  // );
};

/**
 * Creates a Section meant to contain the newly generating elements to do with the searchfield itself. (I need to make one for the modifiers as well) This is under the @id searchSectionAdvanced
 * @author Marcus Kaagman
 */
const searchSectionAdvanced = () => {
  // let searchingSection: HTMLElement = document.createElement("form");
  // searchingSection.setAttribute(`id`, `searchSectionAdvanced`);
  // searchingSection.setAttribute(`action`, `javascript:void(0);`);
  // document.body.appendChild(searchingSection);
};

/**
 * Generates a section to contain all the products to be displayed within.
 * @author Marcus Kaagman
 */
const generatedSearchList = () => {
  // let searchListSection: HTMLElement = document.createElement("section");
  // searchListSection.setAttribute(`id`, `SearchlistSection`);
  // (document.getElementById("searchSectionAdvanced") as HTMLElement).appendChild(
  //   searchListSection
  // );
};

/**
 * Creates a SearchBox to be appended to the generated @tag <Section id='searchSectionAdvanced'>
 * @author Marcus Kaagman
 */
const generateSearchBox = () => {
  // let searchBox: HTMLInputElement = document.createElement("input");
  // searchBox.type = `text`;
  // searchBox.id = `searchFieldAdvanced`;
  // (document.getElementById("searchSectionAdvanced") as HTMLElement).appendChild(
  //   searchBox
  // );
};

/**
 * Creates a SearchButtonAdvanced to be appended to the @tag <Section id='searchSectionAdvanced'> as well
 * @author Marcus Kaagman
 */
const generateSearchButtonAdvanced = () => {
  // let searchButtonAdvanced: HTMLElement = document.createElement("button");
  // searchButtonAdvanced.setAttribute(`type`, `submit`);
  // searchButtonAdvanced.setAttribute(`id`, `searchButtonAdvanced`);
  // searchButtonAdvanced.innerHTML = "Search";
  // (document.getElementById("searchSectionAdvanced") as HTMLElement).appendChild(
  //   searchButtonAdvanced
  // );
};

//===//

/**
 * ==============================================
 *  | HTML Generative functions: Hot Swappable |
 * ==============================================
 */

/**
 * Creates a section which contains one of the items (Why isn't this done with a list?) on a successful search
 * @author Marcus Kaagman
 */
const createMainSectionSuccess = () => {
  let resultContainer = document.createElement("section");
  resultContainer.setAttribute(`class`, `resultSectionAdvanced`); //The class with ID is a weird combo, but it works for now.
  resultContainer.setAttribute(`id`, `resultSectionAdvanced`);

  return resultContainer;
};

/**
 * Creates a subsection (Why did I have subsections again?) which contains all the singular elements of an item on a successful search
 * @author Marcus Kaagman
 */
const createSubSectionSuccess = () => {
  let resultSubContainer = document.createElement("section");
  resultSubContainer.setAttribute(`class`, `searchResult`);
  resultSubContainer.setAttribute(`id`, `searchResult`);

  return resultSubContainer;
};

/**
 * Creates an Anchor element which redirects the user to the product page on click
 * @param data is used here to grab the product array
 * @param detector is used to locate the correct name out of the array (why isnt this just grabbed up higher?) as the product page is not integrated with this for now
 * @author Marcus Kaagman
 */
const createHREFSuccess = (data: Storage, detector: number) => {
  let resultLinkAbility = document.createElement("a");
  resultLinkAbility.setAttribute(`class`, `productPageLink`);
  resultLinkAbility.setAttribute(`id`, `productPageLink`);
  resultLinkAbility.setAttribute(`href`, `${data[detector]._name}`);

  return resultLinkAbility;
};

/**
 * Creates an image element to display the product image in the section
 * @param data is used to grab the product array
 * @param detector locates the correct image of the array. The [0] just grabs it's first image as display image.
 * @author Marcus Kaagman
 */
const createTheImageSuccess = (data: Storage, detector: number) => {
  let resultImage = document.createElement("img");
  resultImage.setAttribute(`id`, `searchImage`);
  resultImage.setAttribute(`width`, `64`);
  resultImage.setAttribute(`height`, `64`);
  resultImage.setAttribute(`src`, `${data[detector]._images[0]}`);

  return resultImage;
};

/**
 * Creates the product title to show in the section
 * @param data is used to grab the product array
 * @param detector grabs the right title out of that array.
 * @author Marcus Kaagman
 */
const createTitleSuccess = (data: Storage, detector: number) => {
  let resultName = document.createElement("span");
  resultName.setAttribute(`id`, `searchTitle`);
  resultName.innerText = `${data[detector]._name}`;

  return resultName;
};

/**
 * Creates a span containing the product information
 * @param data is used to grab the product array
 * @param detector grabs the right product to get the information from
 * @author Marcus Kaagman
 */
const createDescriptionSuccess = (data: Storage, detector: number) => {
  let resultInformation = document.createElement("span");
  resultInformation.setAttribute(`id`, `searchDescription`);
  resultInformation.innerText = `Filament: ${data[detector]._filament} || Filetype: ${data[detector]._filetype} || Price: €${data[detector]._price},- ||`;

  return resultInformation;
};

//-//

/**
 * Creates a section which contains the message of a failure on a bad search
 * @author Marcus Kaagman
 */
const createMainSectionFailure = () => {
  //Head Section - Could be generalized with the same generator
  let failedContainer = document.createElement("section");
  failedContainer.setAttribute(`class`, `resultSectionAdvanced`); //The class with ID is a weird combo, but it works for now.
  failedContainer.setAttribute(`id`, `resultSectionAdvanced`);

  return failedContainer;
};

/**
 * Creates a subsection which contains the singular element of a bad search
 * @author Marcus Kaagman
 */
const createSubSectionFailure = () => {
  //Sub section - Could be generalized with the same generator
  let failureSubContainer = document.createElement("section");
  failureSubContainer.setAttribute(`class`, `searchFailed`);
  failureSubContainer.setAttribute(`id`, `searchFailed`);

  return failureSubContainer;
};

/**
 * Creates a div containing the message of executing a bad results
 * @author Marcus Kaagman
 */
const reportFailure = () => {
  let resultInformation = document.createElement("div");
  resultInformation.setAttribute(`id`, `searchFailMessage`);
  resultInformation.innerText = `Failed to find any results (204)`;

  return resultInformation;
};

//-//

/**
 * At the end of a (currently any) successful search, it will create another element which is intended for navigation though results.
 * Called upon by @function searchFunction when successful.
 * @param displayedItems shows how many item's have been found through the search..
 * @author Marcus Kaagman
 */
const moreResults = (displayedItems: number) => {
  //might need to have this be called upon in the mother function instead

  if (
    document.getElementsByClassName("resultSectionAdvanced") !== null &&
    (document.getElementsByClassName("resultSectionAdvanced") as HTMLCollection)
      .length > 2
  ) {
    let nextResultPage = document.createElement("section");
    nextResultPage.setAttribute(`class`, `resultSectionAdvanced`);
    nextResultPage.setAttribute(`category`, `pageflicker`);
    nextResultPage.innerHTML = `
    <section id="pageBar">
    <a id="pageBarContent" href="../html/advanced-search-page.html?searchquery=${
      (document.getElementById("searchFieldAdvanced") as HTMLInputElement).value
    }">
    << < (1) 2 3 > >> ||| 1-49 / ${displayedItems as number}
    </a>
    </section>`;

    (document.getElementById("SearchlistSection") as HTMLElement).appendChild(
      nextResultPage
    );
  }
}; ///Mostly a mockup html section, deliberatily not cleaned up.

//===//

/**
 * =====================
 *  | Other functions |
 * =====================
 */

/**
 * Generates and Deploys information from a successful loop into a tab of the product visible for the user.
 * Called upon by @function searchFunction when successful.
 * @param data is the JSON file itself.
 * @param detector is which object it should take from the array if corresponding one has been found.
 * @author Marcus Kaagman
 */
const successExecutor = (data: Storage, detector: number) => {
  let resultContainer = createMainSectionSuccess();
  let resultSubContainer = createSubSectionSuccess();
  let resultLinkAbility = createHREFSuccess(data, detector);
  let resultImage = createTheImageSuccess(data, detector);
  let resultName = createTitleSuccess(data, detector);
  let resultInformation = createDescriptionSuccess(data, detector);

  resultLinkAbility.appendChild(resultImage);
  resultLinkAbility.appendChild(resultName);
  resultLinkAbility.appendChild(resultInformation);

  resultSubContainer.appendChild(resultLinkAbility);
  resultContainer.appendChild(resultSubContainer);
  (document.getElementById("SearchlistSection") as HTMLElement).appendChild(
    resultContainer
  );
};

/**
 * Generates and Deploys information from an unsuccessful loop into a tab showing the user that no results could be found.
 * Called upon by @function searchFunction when unsuccessful.
 * @author Marcus Kaagman
 */
const failureExecutor = () => {
  let failedContainer = createMainSectionSuccess();
  let failureSubContainer = createSubSectionSuccess();
  let resultInformation = reportFailure();

  failureSubContainer.appendChild(resultInformation);
  failedContainer.appendChild(failureSubContainer);

  (document.getElementById("SearchlistSection") as HTMLElement).appendChild(
    failedContainer
  );
};

/**
 * Generates eventlisteners for each displaylength button
 * @author Marcus Kaagman
 */
const createDisplayLimit = (buttonValueCalc: number, index: number) => {
  (
    document.getElementById(`displayCount:${index + 1}`) as HTMLButtonElement
  ).addEventListener(
    "click",
    function () {
      sessionStorage.removeItem("displayMode");
      sessionStorage.setItem("displayMode", `${buttonValueCalc}`);
    },
    false
  );
};

/**
 * Generates eventlisteners for each sorting method button
 * @author Marcus Kaagman
 */
const createSortElements = (index: number) => {
  (
    document.getElementById(`sortMethod:${index + 1}`) as HTMLButtonElement
  ).addEventListener(
    "click",
    function () {
      sessionStorage.removeItem("sortMode");
      sessionStorage.setItem("sortMode", `${index + 1}`);
    },
    false
  );
};

/**
 * Everything to do with generating the HTML elements is called upon here
 * @param optionArray is the information of what sorting methode to use.
 * @author Marcus Kaagman
 */
const HTMLGeneration = (optionArray: string[]) => {
  //do each section need it's own umbrella function?
  searchSectionAdvanced(); //section for generated elements
  generateSearchBox(); //searchinput element
  generateSearchButtonAdvanced(); //searchbutton element

  displayAmountSection(); //dropdown to change viewlength
  displayContainedText(); //the div holding the dropdown content
  displayGenerator(); //creates each button for viewlenght based upon the session storage parameters

  sortingSection(); //section for the dropdown button to be contained in
  sortingDisplayAmount(optionArray); //the main dropdown button
  sortingSectionInnerStuff(); // the div holding the dropdown content
  sortingGenerator(optionArray); //Similar to displayGenerator, but for sorting and takes from a set array of options.

  dropdownDisplayAmount(); //button to change viewlength
  clearSearch(); //clearsearch element
  generatedSearchList(); //the section containing all product results
};

const changableVariables = () => {}; //Unfinished

//===//

/**
 * ==========================
 *  | Search functionality |
 * ==========================
 */

/**
 * Checks if a displayMode has been set in the sessionStorage, if not, default to a display length of 20
 * //changable fallback?
 * @author Marcus Kaagman
 */
const displayLengthResult = () => {
  //This gets sessionStorage data about how many elements to display. 20 is the default fallback
  if (sessionStorage.getItem("displayMode") !== null) {
    return Number(sessionStorage.getItem("displayMode"));
  } else {
    return 20;
  }
};

/**
 * Checks the session storage which sorting method should be used on the list (This one sucks maan, I need to seperate it and inject it instead.)
 * @author Marcus Kaagman
 */







// async function initProductOverview(): Promise<void> {
//   let productArray: Product[] = await (new StoreProductInDatabase()).deserializeAllProducts();
// console.log(productArray)
// };
// initProductOverview();


function resolveAfter2Seconds(x:any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 200);
  });
}





const sortMethodType = async function (): Promise<string> {
  const sqldata = await resolveAfter2Seconds((new StoreProductInDatabase()).deserializeAllProducts());


  let cool = JSON.stringify(sqldata);
  let data = JSON.parse(cool)


  if (sessionStorage.getItem("sortMode") == "1") {
    return data.sort((a: Storage, b: Storage) =>
      a._name.localeCompare(b._name)
    );
  } else if (sessionStorage.getItem("sortMode") == "2") {
    return data.sort(
      (a: Storage, b: Storage) =>
        Number(JSON.stringify(a._price)) - Number(JSON.stringify(b._price))
    );
  } else if (sessionStorage.getItem("sortMode") == "3") {
    return data;
  } else if (sessionStorage.getItem("sortMode") == "4") {
    return data.sort((a: Storage, b: Storage) =>
      a.filetype.localeCompare(b._filetype)
    );
  } else if (sessionStorage.getItem("sortMode") == "5") {
    return data.sort((a: Storage, b: Storage) =>
      a.filament.localeCompare(b._filament)
    );
  } else {
    return data;
  }
};

/**
 * Puts all the individual names of the products in an array to check for namematching in particular.
 * @author Marcus Kaagman
 */
const searchNameList = async (dataSortwing: Storage, nameList: String[]) => {
  //creates an array of product names
  const dataSorting:any = await resolveAfter2Seconds((new StoreProductInDatabase()).deserializeAllProducts());

  await dataSorting.forEach(function (arrayItem: { _name: String }) {
    let seperateName = arrayItem._name;
    nameList.push(seperateName.toLowerCase());
  });
};

/**
 * Generates a list of items to be displayed based upon the whole list.
 * @author Marcus Kaagman
 */
const fullListResult = async (

  nameList: String[],
  displayLength: number,
  //dataSorting: Storage

  ) => {
    const dataSorting:any = await resolveAfter2Seconds((new StoreProductInDatabase()).deserializeAllProducts());

  let detectorlength: number;
  if (nameList.length > displayLength) {
    detectorlength = displayLength - 1;
  } else {
    detectorlength = nameList.length;
  }

  displayedItems(detectorlength, dataSorting, nameList);
  moreResults(displayedItems(detectorlength, dataSorting, nameList));
};

/**
 * A child of FullListResult, It's a subsitute for the searchfunctionality within searchListResult.
 * It shows the entire array instead of what is searched. (I need to merge these into one and split it out of here. Stalling until I'm converting it to the backend)
 * @author Marcus Kaagman
 */
const displayedItems = (
  detectorlength: number,
  dataSorting: Storage,
  nameList: String[]
) => {
  for (let index = 0, detector = 0; detector !== detectorlength; index++) {
    detector = index;

    try {
      successExecutor(dataSorting, detector);
    } catch (error) {
      failureExecutor();
    }
  }
  return nameList.length as number; ///fix later (What was broken about this? I forgot)
};

/**
 * Generates a list of items to be displayed based upon the searched keyword.
 * @author Marcus Kaagman
 */
//This else Loops through the array for names corresponding to the given input to execute Success. If none are found, it runs Failure instead.







  const searchListResult = async (
  nameList: String[],
  userInput: string,
  ) => {
    const dataSorting:any = await resolveAfter2Seconds((new StoreProductInDatabase()).deserializeAllProducts());
  for (let index = 0, detector = 0; detector !== -1; index++) {
    detector = nameList.findIndex((element) => element.includes(userInput));
    try {
      successExecutor(dataSorting, detector);
    } catch (error) {
      failureExecutor();
    }
    if (detector != -1) {
      nameList.splice(detector, 1, "replaced");
    }
    if (detector == -1) {
      moreResults(index);
    }
  }
};

/**
 * Pulls in JSON data, takes the names out of it into an array and looks for matches to succeed or fail on.
 * Uncomfortably long, need to work on that.
 * @author Marcus Kaagman
 */
const searchFunction = () => {
  let listClearer = document.getElementById("SearchlistSection") as HTMLElement;
  if (listClearer.innerHTML !== null) {
    listClearer.innerHTML = "";
  }

  let userInput: string = String(
    (document.getElementById("searchFieldAdvanced") as HTMLInputElement).value
  ).toLowerCase();
  let nameList: Array<String> = [];
  let displayLength: number = displayLengthResult();
  let dataSorting: any = sortMethodType();


  searchNameList(dataSorting, nameList);

  if (userInput.length == 0) {
    fullListResult(nameList, displayLength);
  } else {
    searchListResult(nameList, userInput);
  }
};

//===//

/**
 * =====================
 *  | Mother Function |
 * =====================
 */

/**
 * Kickstarts the other functions
 * First 3 functions generates the HTML elements, last function generates the functionality (likely needs to be more split).
 * Gets called upon by the end of the file.
 * Currently too long, need to work on that.
 * @author Marcus Kaagman
 */



  const motherFunction = async () => {
    const dataSorting:any = await resolveAfter2Seconds((new StoreProductInDatabase()).deserializeAllProducts());



  if (sessionStorage.sortMode == null) {
    sessionStorage.setItem("displayMode", "20");
  } //Length to display
  let displayLength = Number(sessionStorage.getItem("displayMode")); //I... currently forgot how I implemented this, I just know I need it.
  if (sessionStorage.sortMode == null) {
    sessionStorage.setItem("sortMode", "sortDate");
  } //Default sort setting
  let optionArray = [
    "sortAlpha",
    "sortPrice",
    "sortDate",
    "sortFileType",
    "sortFilament",
  ]; //Amount of buttons under the displayAmount dropdown.

  HTMLGeneration(optionArray);

  let calculateButton = document.getElementById(
    "searchButtonAdvanced"
  ) as HTMLButtonElement | null;
  if (calculateButton != null) {
    calculateButton.addEventListener(
      "click",
      function () {
        location.href = `../html/advanced-search-page.html?searchquery=${
          (document.getElementById("searchFieldAdvanced") as HTMLInputElement)
            .value
        }`;
      },
      false
    );
  }
  let enterDetect = document.getElementById(
    "searchFieldAdvanced"
  ) as HTMLInputElement;
  enterDetect.addEventListener(
    "submit",
    function () {
      location.href = `../html/advanced-search-page.html?searchquery=${
        (document.getElementById("searchFieldAdvanced") as HTMLInputElement)
          .value
      }`;
    },
    false
  );

  //if coming from Quicksearch, search such input.
  let definitelyUnsafeURLData = document.location.href;
  if (definitelyUnsafeURLData.split("?searchquery=")[1] != undefined) {
    let urlInput = definitelyUnsafeURLData
      .split("?searchquery=")[1]
      .replace("%", ` `);
    (document.getElementById("searchFieldAdvanced") as HTMLInputElement).value =
      urlInput;
  }

  searchFunction(); //preloads it!
};
motherFunction();

//===//

/**
 * Random Notes:
 */

//Making the functions of searchbox.ts more independent would be great, and some features would be nice:

///Turn the main search function into its own thing that can be used
//by multiple systems, which would be handy but not currently crucial.
/// /\ I'm very anticipated for making it into that, but currently thats not the main priority.
///Type search: Set a timeout delay so if within a certain amount of time of keystrokes, it won't send a request to the server until like a second has passed to save resources

//3 things I'd love: all things showing up in the LIST gets generated by the same generator
//A function containing all changable variables
//Making the array searcher a standalone API.


