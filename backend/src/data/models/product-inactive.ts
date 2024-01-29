import { FieldPacket, RowDataPacket } from 'mysql2';
import { pool } from "../../Util/database";

export class ProductInactive {

    /* Constructor */
    public constructor() { }

    /* Methods */
    /**
     * Checks if the product exists in the database. 
     * @param {number} id The id of the product.
     * @returns {Promise<number>} 0 if the product doesn't exist, 1 if it does. 
     * @author Jacky Schoen
     */
    public async checkIfProductExists(id: number): Promise<number> {
        let doesProductExist: number = 0;

        try {
            const [results, _field]: [RowDataPacket[], FieldPacket[]] = await pool.promise().execute<RowDataPacket[]>('SELECT COUNT(name) as `productCount` FROM product WHERE id = ?', [id]);
            (results[0].productCount === 0 ? doesProductExist = doesProductExist : doesProductExist = 1);
        } catch (error) {
            console.log(error);
        }

        return doesProductExist;
    }

    /**
     * Checks the products 'active' status in the database. 
     * @param {number} id The id of the product.
     * @returns {Promise<number>} 1 if the product is active, 0 if it's inactive. 
     * @author Jacky Schoen
     */
    public async checkIfProductIsActive(id: number): Promise<number> {
        let activeStatus: number = 1;

        try {
            const [results, _field]: [RowDataPacket[], FieldPacket[]] = await pool.promise().execute<RowDataPacket[]>('SELECT active FROM product WHERE id = ?', [id]);
            activeStatus = results[0].active;
        } catch (error) {
            console.log(error);
        }

        return activeStatus;
    }

    /**
     * Updates the 'active' status of a product in the database. 
     * @param {number} id The id of the product.
     * @param {number} active The 'active' status. 0 if the product should be inactive, 1 if it should be active (this is the default value in the database).
     * @returns {Promise<boolean>} True if the query is successful, false if it is not successful. 
     * @author Jacky Schoen
     */
    public async updateProductActiveStatus(id: number, active: number): Promise<boolean> {
        let isQuerySuccessful: boolean = false;

        try {
            await pool.promise().execute<RowDataPacket[]>('UPDATE product SET active = ? WHERE id = ?', [active, id]);
            isQuerySuccessful = true;
        } catch (error) {
            console.log(error);
        }

        return isQuerySuccessful;
    }

}