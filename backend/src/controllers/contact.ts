import * as express from 'express';
import { ContactFormSubmission } from "../data/models/contact"

export class ContactController {

    /* Properties */
    private _email: string;
    private _subject: string;
    private _message: string;

    /* Constructor */
    public constructor(request: express.Request) {
        this._email = request.body.email;
        this._subject = request.body.subject;
        this._message = request.body.message;
    }

    /* Methods */
    /**
     * Inserts a contact form submission into the database.  
     * @param {express.Response} response The response to the request.
     * @author Jacky Schoen
     */
    public async addContactMessage(response: express.Response): Promise<void> {
        let contactFormSubmission: ContactFormSubmission = new ContactFormSubmission();

        if (await contactFormSubmission.addContactMessage(this._email, this._subject, this._message)) {
            response.status(200).json('Contact form submission saved.');
        } else {
            response.status(400).json('Something went wrong.');
        }
    }

}