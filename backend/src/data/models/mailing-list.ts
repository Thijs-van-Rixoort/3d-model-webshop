import { FieldPacket, RowDataPacket } from 'mysql2';
import { pool } from "../../Util/database";

export class MailingListEntry {

    /* Constructor */
    public constructor() { }

    /* Methods */
    /**
     * Checks if the submitted emailadress already exists in the database. 
     * @param {string} email The submitted emailadress.
     * @returns {Promise<number>} The length of the result from the query. 
     * @author Jacky Schoen
     */
    public async checkIfEmailExists(email: string): Promise<number> {
        let resultLength: number = 0;

        try {
            const [results, _field]: [RowDataPacket[], FieldPacket[]] = await pool.promise().execute(this.giveQuery('select'), this.giveParameters(email));
            resultLength = results.length;
        } catch (error) {
            console.log(error);
        }

        return resultLength;
    }

    /**
     * Inserts the new emailadress into the database. 
     * @param {string} email The submitted emailadress.
     * @returns {Promise<boolean>} True if query was successful, false if not. 
     * @author Jacky Schoen
    */
    public async insertEmailIntoDatabase(email: string): Promise<boolean> {
        let isQuerySuccessful: boolean = false;

        try {
            await pool.promise().execute(this.giveQuery('insert'), this.giveParameters(email));
            isQuerySuccessful = true;
        } catch (error) {
            console.log(error);
        }

        return isQuerySuccessful;
    }

    /**
     * Gives a query to be executed in the addContactMessage method. 
     * @param {string} queryType The type of query you want to execute.
     * @returns {string} The query to be executed.
     * @author Jacky Schoen
     */
    private giveQuery(queryType: string): string {
        return (queryType === 'select' ? 'SELECT email FROM mailing_list WHERE email = ?' : 'INSERT INTO mailing_list (email) VALUES (?)');
    }

    /**
     * Gives the query's paramters.
     * @param {string} email The submitted emailadress.
     * @returns {string[]} A string array containing the parameters.
     * @author Jacky Schoen
     */
    private giveParameters(email: string): string[] {
        return [email];
    }

}