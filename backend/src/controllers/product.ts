import * as express from 'express';
import { businessmodel } from '../business/models/product';
import { ProductService } from '../business/service/product_service';

export class ProductController {
    /**
     * Gets a request, sents the Product object from the request body to the database and sends a response back to the frontend.
     * @param request A request object that has been sent from the frontend. It contains a "Product" object.
     * @param response A response object that receives statuscode 201 if the product was created in the database succesfully, 
     * 409 if there was a conflict while adding the product
     * @author Thijs van Rixoort
     */
    public async addProduct(request: express.Request, response: express.Response): Promise<void> {
        let product: any = request.body;

        let isSuccesfullyAdded: boolean = await new ProductService().addProduct(product);

        if (isSuccesfullyAdded) {
            response.status(201).json({ succesfullyAddedProduct: isSuccesfullyAdded });
        } else {
            response.status(400).json({ succesfullyAddedProduct: isSuccesfullyAdded });
        }
    }

    /**
     * Gets a request and takes the "id" property out of the body. The id is sent to the database model for Product and the Product with the 
     * corresponding id is retreived from the database if it exists.
     * @param request A request object that has been sent from the frontend. It contains an "id".
     * @param response A response object that receives statuscode 200 and the Product object as json if the product was found in the database succesfully, 
     * statuscode 404 if the product was not found.
     * @author Thijs van Rixoort
     */
    public async getProduct(request: express.Request, response: express.Response): Promise<void> {
        let productId: number = +request.params.id;
        let result: businessmodel.Product | null = await new ProductService().getProduct(productId);

        if (result === null) {
            response.status(404);
        } else {
            response.status(200).json(result);
        }
    }

    /**
     * Gets all the active products that are stored in the database and returns them in a response object as a Product[].
     * @param response A response object that gets statuscode 404 if no products were found, statuscode 200 and the Product[] if the database contains products.
     * @author Thijs van Rixoort
     */
    public async getProducts(response: express.Response): Promise<void> {
        let result: businessmodel.Product[] | null = await new ProductService().getProducts();

        if (result === null) {
            response.status(404);
        } else {
            response.status(200).json(result);
        }
    };

}
