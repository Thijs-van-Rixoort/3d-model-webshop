/**
 * @author Jacky Schoen
 * @description This program checks for user input on the mailing list page and sends the input to the backend.
 */

/**
 * Waits for the user to submit their emailadress. 
 * @author Jacky Schoen
 */
function initMailingList(): void {
    let formSection: HTMLFormElement = (document.getElementById('formSection') as HTMLFormElement);
    formSection.addEventListener('submit', initSendToBackend);
}

/**
 * Initializes the process of sending the submitted emailadress to the backend. 
 * @param {Event} event The event object.
 * @author Jacky Schoen
 */
async function initSendToBackend(event: Event): Promise<void> {
    event.preventDefault();

    let inputValue: string = (document.getElementById('email') as HTMLInputElement).value;
    const request: Request = new Request('http://localhost:4001/addEmailToMailingList');
    const headers: Headers = giveHeaders();
    const content: string = JSON.stringify({ email: inputValue });
    const response: Response = await fetch(request, { method: 'POST', headers, body: content, mode: 'cors' });

    checkResponseStatus(response);
}

/**
 * Creates headers and appends values.
 * @returns {Headers} The headers with values. 
 * @author Jacky Schoen
 */
function giveHeaders(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return headers;
}

/**
 * Checks the response status of the request.
 * @param {Response} response The response to the request.
 * @author Jacky Schoen
 */
function checkResponseStatus(response: Response): void {
    if (response.status === 201) {
        createSuccesNotification('Succesvol aangemeld voor de nieuwsbrief!');
        clearInputField();
    } else {
        (response.status === 422 ? createErrorNotification('Dit e-mailadres bestaat al.') : createErrorNotification('Dit e-mailadress kan niet worden toegevoegd.'));
    }
}

/**
 * Clears the emailadress input field. 
 * @author Jacky Schoen
 */
function clearInputField(): void {
    let inputField: HTMLInputElement = (document.getElementById('email') as HTMLInputElement);
    inputField.value = '';
}

initMailingList();