import { RowDataPacket } from 'mysql2';
import { pool } from "../../Util/database";

export class ContactFormSubmission {

    /* Constructor */
    public constructor() { }

    /* Methods */
    /**
     * Inserts a contact form submission into the database.  
     * @param {string} email The submitted emailadress.
     * @param {string} subject The submitted subject.
     * @param {string} message The submitted message. 
     * @returns {Promise<boolean>} True if query was successful, false if not. 
     * @author Jacky Schoen
     */
    public async addContactMessage(email: string, subject: string, message: string): Promise<boolean> {
        let isQuerySuccessful: boolean = false;

        try {
            await pool.promise().execute(this.giveQuery(), this.giveParameters(email, subject, message));
            isQuerySuccessful = true;
        } catch (error) {
            console.log(error);
        }

        return isQuerySuccessful;
    }

    /**
     * Gives a query to be executed in the addContactMessage method. 
     * @returns {string} The query to be executed.
     * @author Jacky Schoen
     */
    private giveQuery(): string {
        return 'INSERT INTO contact (email, subject, message) VALUES (?, ?, ?)';
    }

    /**
     * Gives the query's paramters.
     * @param {string} email The submitted emailadress.
     * @param {string} subject The submitted subject.
     * @param {string} message The submitted message. 
     * @returns {string[]} A string array containing the parameters.
     * @author Jacky Schoen
     */
    private giveParameters(email: string, subject: string, message: string): string[] {
        return [email, subject, message];
    }

}