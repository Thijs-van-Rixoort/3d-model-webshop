import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { businessmodel } from '../../business/models/product';
import { pool } from "../../Util/database";

/**
 * This Product class handles all the businessrules anything database related in this case, normally you would enforce the businessrules in a servicelayer. 
 * I couldn't implement a servicelayer in time, so I kept the businessrules here.
 */
export class Product {
    /**
     * Executes an SQL query.
     * @param query The query string that you want to execute.
     * @param values An array of values that you want to use in the query.
     * @returns the RowDataPacket[] that results from the query.
     * @author Thijs van Rixoort
     */
    private async executeSQLQuery(query: string, values: any[] = []): Promise<RowDataPacket[] | null> {
        try {
            const results: [RowDataPacket[], FieldPacket[]] = await pool.promise().execute(query, values);
            return results[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * Gets the id that is bound to specific piece of data. If the data exists in the database, it just gets the id.
     * If the data does not exist in the database, it adds the data to the database and then gets the id.
     * @param data Some data as a string.
     * @param selectQuery A select query that gets one item from a table in the database.
     * @param insertQuery A insert query that inserts one item in a table in the database.
     * @returns the id of the data if it exists in the database, null if the filetype does not exist in the database.
     * @author Thijs van Rixoort
     */
    private async getDataId(data: string, selectQuery: string, insertQuery: string): Promise<number | null> {
        let filetypeId: number;
        let queryResult: RowDataPacket[] | null = await this.executeSQLQuery(selectQuery, [data]);

        if (queryResult !== null && queryResult[0] !== undefined) {
            filetypeId = queryResult[0].id;
            return filetypeId;
        } else {
            return await this.addDataToDatabase(data, insertQuery) ? this.getDataId(data, selectQuery, insertQuery) : null;
        }
    }

    /**
     * Adds a piece of data to the database.
     * @param data The data that is added to the database.
     * @param addQuery The query string that is executed.
     * @returns true if the data was succesfully added to the database, else false.
     * @author Thijs van Rixoort
     */
    private async addDataToDatabase(data: string, addQuery: string): Promise<boolean> {
        let returnBoolean: boolean = false;

        if (await this.executeSQLQuery(addQuery, [data]) !== null) {
            returnBoolean = true;
        }

        return returnBoolean;
    }

    /**
     * Gets the id that is bound to a specific user.
     * @param seller the string that represents the user.
     * @returns the id of the user.
     * @author Thijs van Rixoort
     */
    private async getSellerId(seller: string): Promise<number | null> {
        let returnValue: number | null = null;
        let queryResult: RowDataPacket[] | null = (await this.executeSQLQuery('SELECT id FROM user WHERE username = ?', [seller]))!;

        if (queryResult !== null && queryResult[0] !== undefined) {
            returnValue = queryResult[0].id;
        }

        return returnValue;
    }

    /**
     * Inserts the product and images into the product and image table in the database.
     * @param product The productdata.
     * @param filetypeId The id of the filetype of the product
     * @param sellerId The id of the seller of the product
     * @param filamentId The id of the filament of the product
     * @returns true if the product was added succesfully, else false.
     */
    private async insertProduct(product: any, filetypeId: number, sellerId: number, filamentId: number): Promise<true | false> {
        let queryData: [ResultSetHeader, FieldPacket[]] = await pool.promise().execute<ResultSetHeader>(
            'INSERT INTO product (name, price, description, x_length, y_length, z_length, filetype_id, seller_id, filament_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [product._name, product._price, product._description, product._dimensions[0], product._dimensions[1], product._dimensions[2], filetypeId, sellerId, filamentId]
        );

        product._images.forEach(async (image: string) => {
            await this.executeSQLQuery('INSERT INTO image (product_image_id, path) VALUES(?, ?)', [queryData[0].insertId, image]);
        });

        return queryData[0] !== undefined && queryData !== null;
    }

    /**
     * This method adds a product to the database.
     * @param product The product object that is added to the database.
     * @returns true if the product was added succesfully, false if it wasn't.
     * @author Thijs van Rixoort
     */
    public async addProduct(product: any): Promise<boolean> {
        let insertQuery: boolean = false;

        let filetypeId: number = (await this.getDataId(product._filetype, 'SELECT id FROM filetype WHERE extension = ?', 'INSERT INTO filetype (extension) VALUES(?);'))!;
        let sellerId: number = (await this.getSellerId(product._seller))!;
        let filamentId: number = (await this.getDataId(product._filament, 'SELECT id FROM filament WHERE name = ?', 'INSERT INTO filament (name) VALUES(?);'))!;

        insertQuery = await this.insertProduct(product, filetypeId, sellerId,filamentId);

        return insertQuery;
    }

    /**
     * Gets the results from a select query that contains data from the image table and formats it so that the imagepaths are put into a string[].
     * @param images The query result.
     * @returns a string[] that contains all the imagepaths from the qury result.
     */
    private formatImages(images: RowDataPacket[]): string[] {
        let formattedArray: string[] = [];

        images.forEach(image => {
            formattedArray.push(image.imagePath);
        });

        return formattedArray
    }

    /**
     * Gets productdata that has been retreived from the database and puts it into a Product object.
     * @param productData A single RowDataPacket that is retreived from the product table.
     * @param images An array of imagePaths.
     * @returns a Product object containing
     */
    private formatProduct(productData: RowDataPacket, images: string[]): businessmodel.Product {
        return new businessmodel.Product(
            productData.name,
            productData.price,
            images,
            [productData.x_length, productData.y_length, productData.z_length],
            productData.filament,
            productData.filetype,
            productData.seller,
            productData.description,
            productData.created_on,
            productData.id,
            productData.active
        );
    }

    /**
     * Gets a specific active product by using the product id.
     * @param productId The id of the product you want to retreive.
     * @returns a product object containing the data that is stored with the product id or null if no (active) product with the requested product id was found.
     */
    public async getProduct(productId: number): Promise<businessmodel.Product | null> {
        let returnValue: businessmodel.Product | null = null;

        let product: RowDataPacket[] | null = await this.executeSQLQuery(
            `SELECT 
                product.id, 
                product.name, 
                product.price, 
                product.description, 
                product.x_length, 
                product.y_length, 
                product.z_length, 
                product.created_on, 
                product.active, 
                filetype.extension AS filetype, 
                user.username AS seller, 
                filament.name AS filament
            FROM Product
            INNER JOIN feag.filetype ON product.filetype_id = filetype.id
            INNER JOIN feag.user ON product.seller_id = user.id
            LEFT JOIN feag.filament ON product.filament_id = filament.id
            WHERE product.id = ? AND active;`,
            [productId]
        );
        let images: RowDataPacket[] | null = await this.executeSQLQuery(
            `SELECT image.product_image_id AS productId, image.path as imagePath FROM image WHERE product_image_id = ?;`,
            [productId],
        );
        let imageArray: string[] = images !== null ? this.formatImages(images) : [];

        if (product !== null && product[0] !== undefined) {
            returnValue = (this.formatProduct(product[0], imageArray));
        }

        return returnValue;
    }

    /**
     * Gets all the active products that are stored in the database.
     * @returns a product[] containing all the products that are stored and active or null if there are no (active) products stored.
     */
    public async getProducts(): Promise<businessmodel.Product[] | null> {
        let returnValue: businessmodel.Product[] | null = null;

        let products: RowDataPacket[] | null = await this.executeSQLQuery(
            `SELECT
                product.id,
                product.name,
                product.price,
                product.description,
                product.x_length,
                product.y_length,
                product.z_length,
                product.created_on,
                product.active,
                filetype.extension AS filetype,
                user.username AS seller,
                filament.name AS filament
            FROM Product
            INNER JOIN feag.filetype ON product.filetype_id = filetype.id
            INNER JOIN feag.user ON product.seller_id = user.id
            LEFT JOIN feag.filament ON product.filament_id = filament.id
            WHERE active;`,
        );
        let images: RowDataPacket[] | null = await this.executeSQLQuery(
            `SELECT image.product_image_id AS productId, image.path AS imagePath FROM image;`
        );
        let productImages: string[];

        if (products !== null && products[0] !== undefined && images !== null && images[0] !== undefined) {
            returnValue = [];
            products.forEach(product => {
                productImages = [];
                images!.forEach((image: RowDataPacket) => { if (image.productId === product.id) { productImages.push(image.imagePath) } });
                returnValue!.push(this.formatProduct(product, productImages));
            });
        }

        return returnValue;
    }
}