/**
 * @author Jacky Schoen
 * @description This file generates the contact page of the webshop.
 */

/**
 * Calls functions and stores return values.
 * @author Jacky Schoen
 */
function initContactPageOLD(): void {
    let formElement: HTMLFormElement = createFormElement();
    let emailSection: HTMLElement = createSectionWithInputField('emailSection', 'emailInput', 'email', 'e-mailadres', 'inputField');
    let subjectSection: HTMLElement = createSectionWithInputField('subjectSection', 'subjectInput', 'text', 'onderwerp', 'inputField');
    let messageSection: HTMLElement = createSectionWithInputField('messageSection', 'messageInput', 'text', 'bericht', 'inputField');
    let submitInputElement: HTMLInputElement = createButton();

    document.body.appendChild(createPageTitle());
    document.body.appendChild(appendChildrenToForm(formElement, emailSection, subjectSection, messageSection, submitInputElement));
}

/**
 * Creates a form element with an id. 
 * @returns {HTMLFormElement}
 */
function createFormElement(): HTMLFormElement {
    let formElement: HTMLFormElement = document.createElement("form");
    formElement.id = 'formSection';

    return formElement;
}

/**
 * Creates an H1 element with an id and innerHTML.
 * @returns {HTMLElement} The page title.
 * @author Jacky Schoen
 */
function createPageTitle(): HTMLElement {
    let h1Element: HTMLElement = document.createElement('h1');
    h1Element.setAttribute('class', 'pageTitle');
    h1Element.innerText = 'Contact';

    return h1Element;
}

/**
 * Creates section, input and label elements of the input fields.
 * @param {string} sectionId The id of the section element.
 * @param {string} inputId The id of the input element.
 * @param {string} elementType The input type for of the input element.
 * @param {string} elementPlaceholderText The placeholder text of the input element.
 * @param {string} elementClass The class for the input element.
 * @returns {HTMLElement} The section element containing the label and input elements.
 * @author Jacky Schoen
 */
function createSectionWithInputField(sectionId: string, inputId: string, elementType: string, elementPlaceholderText: string, elementClass: string = ''): HTMLElement {
    let sectionElement: HTMLElement = document.createElement('section');
    sectionElement.id = sectionId;

    let inputElement: HTMLTextAreaElement | HTMLInputElement = (sectionId === 'messageSection' ? createTextAreaElement(inputId, elementPlaceholderText, elementClass) : createInputElement(inputId, elementType, elementPlaceholderText, elementClass));

    sectionElement.appendChild(inputElement);

    return sectionElement;
}

/**
 * Creates an input element and sets attributes. 
 * @param {string} elementId The id of the input element.
 * @param {string} elementType The input type for of the input element.
 * @param {string} elementPlaceholderText The placeholder text of the input element.
 * @param {string} elementClass The class for the input element.
 * @returns {HTMLInputElement} The input element with an id and a anme.
 * @author Jacky Schoen
 */
function createInputElement(elementId: string, elementType: string, elementPlaceholderText: string, elementClass: string = ''): HTMLInputElement {
    let inputElement: HTMLInputElement = document.createElement('input');
    inputElement.setAttribute('id', elementId);
    inputElement.setAttribute('name', elementId);
    inputElement.setAttribute('type', elementType);
    inputElement.setAttribute('placeholder', elementPlaceholderText);
    inputElement.setAttribute('class', elementClass)
    inputElement.required = true;

    return inputElement;
}

/**
 * Creates a text area element with an id, name, placeholder, rows and class.
 * @param {string} elementId The id for the input element.
 * @param {string} elementPlaceholderText The placeholder text of the input element.
 * @param {string} elementClass The class for the input element.
 * @returns {HTMLTextAreaElement} The text area element with an id, name, placeholder, rows and class.
 * @author Jacky Schoen
 */
function createTextAreaElement(elementId: string, elementPlaceholderText: string, elementClass: string = ''): HTMLTextAreaElement {
    let textAreaElement: HTMLTextAreaElement = document.createElement('textarea');
    textAreaElement.setAttribute('id', elementId);
    textAreaElement.setAttribute('name', elementId);
    textAreaElement.setAttribute('placeholder', elementPlaceholderText);
    textAreaElement.setAttribute('class', elementClass);
    textAreaElement = setTextAreaAttributes(textAreaElement);

    return textAreaElement;
}

/**
 * Sets more attributes on the text area element. 
 * @param {HTMLTextAreaElement} textAreaElement The text area attributes. 
 * @returns {HTMLTextAreaElement} The text area with more attributes. 
 */
function setTextAreaAttributes(textAreaElement: HTMLTextAreaElement): HTMLTextAreaElement {
    textAreaElement.setAttribute('maxlength', '5000');
    textAreaElement.setAttribute('rows', '5');
    textAreaElement.required = true;

    return textAreaElement;
}

/**
 * Creates a button element with an id, class, innerHTML and Event Listener.
 * @returns {HTMLButtonElement} The button element with an id, class, innerHTML and Event Listener.
 * @author Jacky Schoen
 */
function createButton(): HTMLInputElement {
    let submitInputElement: HTMLInputElement = document.createElement('input');
    submitInputElement.setAttribute('type', 'submit');
    submitInputElement.setAttribute('id', 'confirmButton');
    submitInputElement.setAttribute('class', 'buttonSubmit');
    submitInputElement.setAttribute('value', 'Verstuur');

    return submitInputElement;
}

/**
 * Appends the input sections to the form element and appends the form section to the body element.
 * @param {HTMLElement} formElement The form element. 
 * @param {HTMLElement} emailSection The section containing the email input.
 * @param {HTMLElement} subjectSection The section containing the subject input.
 * @param {HTMLElement} messageSection The section containing the message input.
 * @param {HTMLButtonElement} submitInputElement The button used to send the message.
 * @author Jacky Schoen
 */
function appendChildrenToForm(formElement: HTMLElement, emailSection: HTMLElement, subjectSection: HTMLElement, messageSection: HTMLElement, submitInputElement: HTMLInputElement): HTMLElement {
    formElement.appendChild(emailSection);
    formElement.appendChild(subjectSection);
    formElement.appendChild(messageSection);
    formElement.appendChild(submitInputElement);
    formElement.addEventListener('submit', initSendMessage);

    return formElement;
}

/**
 * Calls functions and stores return values after the send button has been clicked on.
 * @param {Event} event The event object. 
 * @author Jacky Schoen
 */
async function initSendMessageOLD(event: Event): Promise<void> {
    event.preventDefault();

    let contactFormSubmission: ContactFormSubmission = createNewContactFormSubmission();
    let allUserInputValues: string[] = contactFormSubmission.giveUserInputArray();
    await contactFormSubmission.sendUserInputToBackend(allUserInputValues);

    allUserInputValues = [];
}

/**
 * Gets the user input from all the input fields and checks if the values are correct before putting them in an array.
 * @returns {string[]} The array with all the user input (e-mail, subject and message).
 * @author Jacky Schoen
 */
function createNewContactFormSubmissionOLD(): ContactFormSubmission {
    let emailValue: string = (document.getElementById('emailInput') as HTMLInputElement).value;
    let subjectValue: string = (document.getElementById('subjectInput') as HTMLInputElement).value;
    let messageValue: string = (document.getElementById('messageInput') as HTMLInputElement).value;

    let contactFormSubmission: ContactFormSubmission = new ContactFormSubmission(emailValue, subjectValue, messageValue);

    return contactFormSubmission;
}

initContactPageOLD();