/**
 * @author Jacky Schoen
 * @description This file contains the contact page class.
 */

class ContactFormSubmission {

    /* Properties */
    private _email: string;
    private _subject: string;
    private _message: string;

    /* Constructor */
    public constructor(email: string, subject: string, message: string, private _id?: number) {
        this._email = email;
        this._subject = subject;
        this._message = message;
    }

    /* Get & Set */
    // email
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    // subject
    public get subject(): string {
        return this._subject;
    }
    public set subject(value: string) {
        this._subject = value;
    }

    // message
    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }

    /* Methods */
    /**
     * Gets all the user inputs and pushes the inputs into an array.
     * @returns {string[]} An array with the users input. 
     * @author Jacky Schoen
     */
    public giveUserInputArray(): string[] {
        let allUserInputValues: string[] = [];
        allUserInputValues.push(this._email, this._subject, this._message);

        return allUserInputValues;
    }

    /**
     * Sends a POST request, headers and contact message content to the backend.
     * @param {string[]} allUserInputValues An array with all the user input (e-mail, subject and message).
     * @author Jacky Schoen
     */
    public async sendUserInputToBackend(allUserInputValues: string[]): Promise<void> {
        const contactRequest: Request = new Request('http://localhost:4001/addContactMessage');
        const headers: Headers = this.giveHeaders();
        const content: string = JSON.stringify({ email: allUserInputValues[0], subject: allUserInputValues[1], message: allUserInputValues[2] });
        const response: Response = await fetch(contactRequest, { method: 'POST', headers, body: content, mode: 'cors' });
        this.checkResponseStatus(response);
    }
    
    /**
     * Creates the headers and appends values. 
     * @returns {Headers} The headers with appended values. 
     * @author Jacky Schoen
     */
    private giveHeaders(): Headers {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return headers;
    }

    /**
     * Checks if the response status is 200. 
     * @param {Response} response The response to the request.
     * @author Jacky Schoen
     */
    private checkResponseStatus(response: Response): void {
        if (response.status === 200) {
            createSuccesNotification('Het bericht is succesvol verzonden!');
            this.emptyInputFields();
        } else {
            createErrorNotification('Er is helaas iets fout gegaan.')
        }
    }

    /**
     * Empties the input fields after the message has been succesfully sent to the database. 
     * @author Jacky Schoen
     */
    private emptyInputFields(): void {
        let emailInputField: HTMLInputElement = document.getElementById('emailInput') as HTMLInputElement;
        let subjectInputField: HTMLInputElement = document.getElementById('subjectInput') as HTMLInputElement;
        let messageInputField: HTMLInputElement = document.getElementById('messageInput') as HTMLInputElement;

        emailInputField.value = '';
        subjectInputField.value = '';
        messageInputField.value = '';
    }
}