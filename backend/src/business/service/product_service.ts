import { Product } from "../../data/models/product";
import { businessmodel } from "../models/product";

/**
 * The product service class.
 * @author Thijs van Rixoort
 */
export class ProductService {

    /**
     * Checks whether all the required productdata is present in the product that is about to be added to the database.
     * @param product The productdata that is sent from the frontend.
     * @returns true if all the required data is present, else false.
     * @author Thijs van Rixoort
     */
    private hasRequiredProductData(product: any): boolean {
        return product._name !== "" && product._price !== 0 && product._dimensions[0] !== 0 && product._dimensions[1] !== 0 && product._dimensions[2] !== 0 && product._filetype !== "" && product._seller !== "" && typeof product._price === "number" ? true : false;
    }

    /**
     * Runs product data through businessrules and adds it to the database if it qualifies.
     * @param productData A Product object containing product data.
     * @returns true if the product was added to the database succesfully, else false.
     * @author Thijs van Rixoort
     */
    public async addProduct(productData: any): Promise<boolean> {
        let returnBoolean: boolean = false;

        if (this.hasRequiredProductData(productData)) {
            returnBoolean = await new Product().addProduct(productData);
        }

        return returnBoolean;
    }

    /**
     * Gets a single product from the database if it exists.
     * @param productId The ID of the product you want to retreive from the database.
     * @returns the product if it exists and is active, else null.
     * @author Thijs van Rixoort
     */
    public getProduct(productId: number): Promise<businessmodel.Product | null> {
        return new Product().getProduct(productId);
    }

    /**
     * Gets all the products from the database if any are present and active.
     * @returns a product[] if there are any active products in the database.
     * @author Thijs van Rixoort
     */
    public getProducts(): Promise<businessmodel.Product[] | null> {
        return new Product().getProducts();
    }
}