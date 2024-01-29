import * as express from 'express';
import { MailingListEntry } from '../data/models/mailing-list'

export class MailingListController {

    /* Properties */
    private _email: string;

    /* Constructor */
    public constructor(request: express.Request) {
        this._email = request.body.email;
    }

    /* Methods */
    /**
     * Checks the result length and depending on the length:
     * < 1: Goes to the method checkForStatusCode201. 
     * >= 1: Sets the response status and creates a response message (in this case, the emailadress already exists in the database).
     * Else: Sets the response status and creates a response message (in this case, something went wrong).
     * @param {express.Response} response The response to the request. 
     * @author Jacky Schoen
     */
    public async checkResultLength(response: express.Response): Promise<void> {
        let mailingListEntry: MailingListEntry = new MailingListEntry();

        if (await this.giveResultLength(mailingListEntry) < 1) {
            this.checkForStatusCode201(mailingListEntry, response);
        } else if (await this.giveResultLength(mailingListEntry) >= 1) {
            response.status(422).json('Dit e-mailadres bestaat al.');
        } else {
            response.status(500).json('Er is iets fout gegaan.');
        }
    }

    /**
     * Gives the length of the result array (RowDataPacket[]) from the query. 
     * @param {MailingListEntry} mailingListEntry The current instance of the MailingListEntry class. 
     * @returns {Promise<number>} The length of the query result.
     * @author Jacky Schoen
     */
    private async giveResultLength(mailingListEntry: MailingListEntry): Promise<number> {
        let resultLength: number = await mailingListEntry.checkIfEmailExists(this._email);

        return resultLength;
    }

    /**
     * Checks if the response status code of the insert query is 201. 
     * @param {MailingListEntry} mailingListEntry The current instance of the MailingListEntry class. 
     * @param {express.Response} response The response to the request. 
     * @author Jacky Schoen
     */
    private async checkForStatusCode201(mailingListEntry: MailingListEntry, response: express.Response): Promise<void> {
        if (await mailingListEntry.insertEmailIntoDatabase(this._email)) {
            response.status(201).json('Het e-mailadres is succesvol toegevoegd.');
        }
    }
}