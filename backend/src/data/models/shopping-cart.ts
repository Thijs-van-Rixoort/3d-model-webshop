import { FieldPacket, RowDataPacket } from 'mysql2';
import { pool } from "../../Util/database";

export class ShoppingCart {

    /* Constructor */
    public constructor() { }

    /* Methods */
    /**
     * Checks if the product exists in the shopping cart. 
     * @param {number} userId The id of the user. 
     * @param {number} productId The id of the product. 
     * @returns {Promise<number>} 0 if the product doesn't exist, 1 if it does. 
     * @author Jacky Schoen
     */
    public async checkIfProductExists(userId: number, productId: number): Promise<number> {
        let resultLength: number = 0;

        try {
            const [results, _field]: [RowDataPacket[], FieldPacket[]] = await pool.promise().execute<RowDataPacket[]>('SELECT COUNT(prod_id) as `count` FROM cart_test WHERE usr_id = ? AND prod_id = ?', [userId, productId]);
            resultLength = results[0].count;
        } catch (error) {
            console.log(error);
        }

        return resultLength;
    }

    /**
     * Removes a product from the users shopping cart. 
     * @param {number} userId The id of the user. 
     * @param {number} productId The id of the product. 
     * @returns {Promise<boolean>} True if the query is successful, false if it is not. 
     * @author Jacky Schoen
     */
    public async removeProduct(userId: number, productId: number): Promise<boolean> {
        let isQuerySuccessful: boolean = false;

        try {
            await pool.promise().execute<RowDataPacket[]>('DELETE FROM cart_test WHERE usr_id = ? AND prod_id = ?', [userId, productId]);
            isQuerySuccessful = true;
        } catch (error) {
            console.log(error);
        }

        return isQuerySuccessful;
    }

}