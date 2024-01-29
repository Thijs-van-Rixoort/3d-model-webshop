import * as express from 'express';
import { ShoppingCart } from '../data/models/shopping-cart';

export class ShoppingCartController {

    /* Properties */
    private _userId: number;
    private _productId: number;

    /* Constructor */
    public constructor(request: express.Request) {
        this._userId = request.body.userId;
        this._productId = request.body.productId;
    }

    /* Methods */
    /**
     * Checks if the product exists in the shopping cart. 
     * @param {express.Response} response The response to the request.
     * @author Jacky Schoen
     */
    public async checkIfProductExist(response: express.Response): Promise<void> {
        let shoppingCart: ShoppingCart = new ShoppingCart();

        if (await shoppingCart.checkIfProductExists(this._userId, this._productId) === 1) {
            this.removeFromCart(response, shoppingCart);
        } else {
            response.status(400).json('Product doesn\'t exist in cart.');
        }
    }

    /**
     * Removes the product from the shopping cart. 
     * @param {express.Response} response The response to the request. 
     * @param {ShoppingCart} shoppingCart The current instance of the ShoppingCart class.
     * @author Jacky Schoen
     */
    private async removeFromCart(response: express.Response, shoppingCart: ShoppingCart): Promise<void> {
        if (await shoppingCart.removeProduct(this._userId, this._productId)) {
            this.checkIfProductIsRemoved(response, shoppingCart);
        } else {
            response.status(400).json('Something went wrong.');
        }
    }

    /**
     * Checks if the product is actually removed from the shopping cart. 
     * @param {express.Response} response The response to the request. 
     * @param {ShoppingCart} shoppingCart The current instance of the ShoppingCart class.
     * @author Jacky Schoen
     */
    private async checkIfProductIsRemoved(response: express.Response, shoppingCart: ShoppingCart): Promise<void> {
        if (await shoppingCart.checkIfProductExists(this._userId, this._productId) === 0) {
            response.status(200).json('Product removed from shopping cart.');
        } else {
            response.status(400).json('Something went wrong.');
        }
    }

}