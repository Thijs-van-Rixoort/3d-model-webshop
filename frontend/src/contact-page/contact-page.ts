/**
 * @author Jacky Schoen
 * @description This program contains the logic behind the Contact Page.
 */

/**
 * Calls functions and stores return values.
 * @author Jacky Schoen
 */
function initContactPage(): void {
    let formElement: HTMLFormElement = (document.getElementById('formSection') as HTMLFormElement);
    formElement.addEventListener('submit', initSendMessage);
}

/**
 * Calls functions and stores return values after the send button has been clicked on.
 * @param {Event} event The event object. 
 * @author Jacky Schoen
 */
async function initSendMessage(event: Event): Promise<void> {
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
function createNewContactFormSubmission(): ContactFormSubmission {
    let emailValue: string = (document.getElementById('emailInput') as HTMLInputElement).value;
    let subjectValue: string = (document.getElementById('subjectInput') as HTMLInputElement).value;
    let messageValue: string = (document.getElementById('messageInput') as HTMLInputElement).value;

    let contactFormSubmission: ContactFormSubmission = new ContactFormSubmission(emailValue, subjectValue, messageValue);

    return contactFormSubmission;
}

initContactPage();