import * as express from 'express';
import { ProductInactive } from '../data/models/product-inactive'

export class ProductInactiveController {

    /* Properties */
    private _id: number;

    /* Constructor */
    public constructor(request: express.Request) {
        this._id = request.body.id;
    }

    /* Methods */
    /**
     * Checks if the product exists in the database.
     * @param {express.Response} response The response to the request. 
     * @author Jacky Schoen
     */
    public async checkIfProductExists(response: express.Response): Promise<void> {
        let productInactive: ProductInactive = new ProductInactive();

        (await productInactive.checkIfProductExists(this._id) === 1 ? this.checkProductActiveStatus(response, productInactive) : response.status(404).json('Dit product bestaat niet.'));
    }

    /**
     * Checks the products active status and sets the response status accordingly. 
     * @param {express.Response} response The response to the request. 
     * @param {ProductInactive} productInactive Current instance of the ProductInactive class.
     * @author Jacky Schoen
     */
    private async checkProductActiveStatus(response: express.Response, productInactive: ProductInactive): Promise<void> {
        if (await productInactive.checkIfProductIsActive(this._id) === 0) {
            response.status(422).json('Dit product is al inactief.');
        } else if (await productInactive.updateProductActiveStatus(this._id, 0)) {
            response.status(200).json('De active status is succesvol gewijzigd.');
        } else {
            response.status(400).json('Er is helaas iets fout gegaan.');
        }
    }

}