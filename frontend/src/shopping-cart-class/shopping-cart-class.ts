/**
 * @author Jacky Schoen
 * @description This file contain the shopping cart class.
 */

interface ShoppingCartMethods {
    removeRowFromShoppingCart(userId: number, productId: number): Promise<void>
    giveHeaders(): Headers
    checkResponseStatus(response: Response): void
    getShoppingCart(): Promise<CurrentShoppingCart[]>
}

class CurrentShoppingCart {

    /* Properties */
    private _userId: number;
    private _productId: number;

    /* Constructor */
    public constructor(userId: number, productId: number) {
        this._userId = userId;
        this._productId = productId;
    }

    /* Methods */
    /**
     * Removes the current product from the shopping cart table in the database.
     * @author Jacky Schoen
     */
    public async removeRowFromShoppingCart(): Promise<void> {
        const shoppingCartRequest: Request = new Request('http://localhost:4001/removeFromShoppingCart');
        const headers: Headers = this.giveHeaders();
        const content: string = JSON.stringify({ userId: this._userId, productId: this._productId });
        console.log(content);
        const response: Response = await fetch(shoppingCartRequest, { method: "DELETE", headers, body: content, mode: 'cors' });
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
     * Checks response status and gives message.
     * @param {Response} response The response to the request.
     * @author Jacky Schoen
     */
    private checkResponseStatus(response: Response): void {
        if (response.status === 200) {
            createSuccesNotification('Product is succesvol verwijderd.');
        } else {
            createErrorNotification('Er is iets misgegaan.');
        }
    }

}