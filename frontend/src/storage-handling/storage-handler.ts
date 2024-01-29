/**
 * @description These are the classes that are responsible for storing and retrieving data.
 * @author Thijs van Rixoort
 */

// USERS //
// LOCALSTORAGE //
interface UserLocalStorageHandler {
    serialize(user: User): boolean
    deserialize(): User[]
}

class StoreUserInLocalStorage implements UserLocalStorageHandler {

    /**
     * Saves a User object in local storage.
     * @param user the User object you want to save.
     * @returns true if the user was succesfully added, false if it wasn't.
     * @author Thijs van Rixoort
     */
    public serialize(user: User): boolean {
        let storedData: User[] = this.deserialize();

        try {
            storedData.push(user);
            localStorage.setItem("users", JSON.stringify(storedData));
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Loads all users from local storage.
     * @returns an array of all saved User objects.
     * @author Thijs van Rixoort
     */
    public deserialize(): User[] {
        let returnArray: User[] = [];
        let rawData: string | null = localStorage.getItem("users");

        if (rawData) {
            JSON.parse(rawData).forEach((user: any) => {
                returnArray.push(new User(user._emailAddress, user._password));
            });
        }

        return returnArray;
    }
}

// DATABASE //
interface UserStorageHandler {
    serialize(user: User): Promise<Response>
    deserializeUser(userId: number): Promise<User>
    deserializeAllUsers(): Promise<User[]>
    retrievelogin(email: string, password: string): Promise<Response>
    verifySession(coolest: string): Promise<Response>
}

class StoreUserInDatabase implements UserStorageHandler {

    /**
     * Saves a User object in the database.
     * @param user the User object you want to save.
     * @returns a response object from the backend.
     * @author Thijs van Rixoort
     */
    public async serialize(user: User): Promise<Response> {

        const myRequest: Request = new Request("http://localhost:4001/addUser");

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "POST", headers, body: JSON.stringify(user), mode: 'cors' });

        return response;
    };




    /**
     * 
     * aaaa
     * aaaa
     * 
     */

    public async retrievelogin(email: string, password: string): Promise<Response> {

        const myRequest: Request = new Request(`http://localhost:4001/loginUser?email=${email}&password=${password}`)
        console.log(myRequest)
        console.log("return of login")



        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, {method: "GET", headers, mode: "cors"});
        let returnArray: any = this.deserialize(await response.json());
        console.log(returnArray)


        return returnArray
    };





    



    public async verifySession(coolest: string): Promise<Response> {

        const myRequest: any = new Request(`http://localhost:4001/verifyUser?sessionid=${coolest}`);


        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        let response: Response = await fetch(myRequest, { method: "GET", headers, mode: "cors"});

        console.log(response)

        // let response: any = await resolveAfter2S(fetch(myRequest, {method: "GET", headers,  body: content, mode: "cors"}));
        let returnUsername: any = this.deserialize(await response.json());


        // let cool = JSON.stringify(returnUsername);
        // let data = JSON.parse(cool);
      
        console.log(returnUsername);



        

        // console.log(await myRequest)
        // console.log(await response)
        // console.log(await returnUsername)
        // console.log("^ returns (might not be stored under username) ^")



        return returnUsername
    };






    /**
     * Loads a single user from the database.
     * @returns a User object.
     * @author Thijs van Rixoort
     */
    public async deserializeUser(userId: number): Promise<User> {
        const myRequest: Request = new Request("http://localhost:4001/getSingleUser");

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "POST", headers, body: JSON.stringify({ id: userId }), mode: 'cors' });
        let user: User[] = await this.deserialize(await response.json());
        return user[0];
    }

    /**
     * Loads all users from the database.
     * @returns an array of all saved User objects.
     * @author Thijs van Rixoort
     */
    public async deserializeAllUsers(): Promise<User[]> {
        const myRequest: Request = new Request("http://localhost:4001/getAllUsers");

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "GET", headers, mode: "cors" });
        let returnArray: User[] = await this.deserialize(await response.json());

        return returnArray;
    }

    /**
     * Deserializes an array of raw data into an array of User objects.
     * @param data The raw data that is read from the backend.
     * @returns the data converted into users.
     * @author Thijs van Rixoort
     */
    private async deserialize(data: { users: object[] }): Promise<User[]> {
        let returnArray: User[] = [];
        let allProducts: Product[] = await new StoreProductInDatabase().deserializeAllProducts();

        data.users.forEach((user: any) => {
            let sellerProducts: Product[] = this.createProductArray(allProducts, user.id);
            returnArray.push(new User(user.emailAddress, user.password, sellerProducts, user.id))
        });

        return returnArray;
    }

    /**
     * Creates an array of all the products that have the same seller_id as the user they are bound to.
     * @param products All the products stored in the database.
     * @param userId The ID of the user that you want the products of.
     * @returns the array of all the products with the same seller_id as the userId parameter.
     * @author Thijs van Rixoort
     */
    private createProductArray(products: Product[], userId: number): Product[] {
        let returnArray: Product[] = [];

        products.forEach((product: any) => {
            if (product.seller_id === userId) {
                returnArray.push(product);
            }
        });

        return returnArray;
    }
}



// PRODUCTS //
// LOCALSTORAGE //
interface ProductLocalStorageHandler {
    serialize(product: Product): boolean
    deserialize(): Product[]
}

class StoreProductInLocalStorage implements ProductLocalStorageHandler {

    /**
     * Saves a Product object in local storage.
     * @param product the Product object you want to save.
     * @returns true if the product was succesfully added, false if it wasn't.
     * @author Thijs van Rixoort
     */
    public serialize(product: Product): boolean {
        let storedData: Product[] = this.deserialize();

        try {
            storedData.push(product);
            localStorage.setItem("products", JSON.stringify(storedData));
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Loads all users from local storage.
     * @returns an array of all saved Product objects.
     * @author Thijs van Rixoort
     */
    public deserialize(): Product[] {
        let returnArray: Product[] = [];
        let rawData: string | null = localStorage.getItem("products");

        if (rawData) {
            JSON.parse(rawData).forEach((product: any) => {
                returnArray.push(new Product(product._name, product._price, product._images, product._sizes, product._filament, product._filetype, ""));
            });
        }

        return returnArray;
    }
}

// DATABASE //
interface ProductStorageHandler {
    serialize(product: Product): Promise<Response>
    deserializeProduct(productId: number): Promise<Product>
    deserializeAllProducts(): Promise<Product[]>
}

class StoreProductInDatabase implements ProductStorageHandler {

    /**
     * Saves a Product object in the database.
     * @param product the Product object you want to save.
     * @returns a response object from the backend.
     * @author Thijs van Rixoort
     */
    public async serialize(product: Product): Promise<Response> {
        const myRequest: Request = new Request("http://localhost:4001/addProduct");

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "POST", headers, body: JSON.stringify(product), mode: 'cors' });

        return response;
    }

    /**
     * Loads a single product from the database.
     * @returns a Product object.
     * @author Thijs van Rixoort
     */
    public async deserializeProduct(productId: number): Promise<Product> {
        const myRequest: Request = new Request(`http://localhost:4001/getSingleProduct/${productId}`);

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "GET", headers, mode: 'cors' });

        return await response.json();
    }

    /**
     * Loads all products from the database.
     * @returns an array of all saved Product objects.
     * @author Thijs van Rixoort
     */
    public async deserializeAllProducts(): Promise<Product[]> {
        const myRequest: Request = new Request("http://localhost:4001/getAllProducts");

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "GET", headers, mode: "cors" });

        return await response.json();
    }
}



// FILAMENT //
interface FilamentStorageHandler {
    serialize(filament: string): Promise<Response>
    deserializeFilament(filamentId: number): Promise<string>
    deserializeAllFilaments(): Promise<string[]>
}

class StoreFilamentInDatabase implements FilamentStorageHandler {
    /**
     * Saves a filament name in the database.
     * @param filament the name of the filament you want to save.
     * @returns a response object from the backend.
     * @author Thijs van Rixoort
     */
    public async serialize(filament: string): Promise<Response> {

        const myRequest: Request = new Request("http://localhost:4001/addFilament");

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "POST", headers, body: JSON.stringify(filament), mode: 'cors' });

        return response;
    }

    /**
     * Loads a single filament name from the database.
     * @returns the name of the filament.
     * @author Thijs van Rixoort
     */
    public async deserializeFilament(filamentId: number): Promise<string> {
        const myRequest: Request = new Request("http://localhost:4001/getSingleFilament");

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "POST", headers, body: JSON.stringify({ id: filamentId }), mode: 'cors' });
        let data: { filaments: string } = await response.json();

        return data.filaments;
    }

    /**
     * Loads all filaments from the database.
     * @returns an array of all saved filaments.
     * @author Thijs van Rixoort
     */
    public async deserializeAllFilaments(): Promise<string[]> {
        const myRequest: Request = new Request("http://localhost:4001/getAllFilaments");

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "GET", headers, mode: "cors" });
        let data: { filaments: string[] } = await response.json();

        return data.filaments;
    }
}



// FILETYPES //
interface FiletypeStorageHandler {
    serialize(filetype: string): Promise<Response>
    deserializeFiletype(filetypeId: number): Promise<string>
    deserializeAllFiletypes(): Promise<string[]>
}

class StoreFiletypeInDatabase implements FiletypeStorageHandler {
    /**
     * Saves a filetype name in the database.
     * @param filetype the name of the filetype you want to save.
     * @returns a response object from the backend.
     * @author Thijs van Rixoort
     */
    public async serialize(filetype: string): Promise<Response> {

        const myRequest: Request = new Request("http://localhost:4001/addFiletype");

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "POST", headers, body: JSON.stringify(filetype), mode: 'cors' });

        return response;
    }

    /**
     * Loads a single filetype name from the database.
     * @param filetypeId The id of the filetype.
     * @returns the name of the filetype.
     * @author Thijs van Rixoort
     */
    public async deserializeFiletype(filetypeId: number): Promise<string> {
        const myRequest: Request = new Request("http://localhost:4001/getSingleFiletype");

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "POST", headers, body: JSON.stringify({ id: filetypeId }), mode: 'cors' });
        let data: { filetype: string } = await response.json();

        return data.filetype;
    }

    /**
     * Loads all filetypes from the database.
     * @returns an array of all saved filetypes.
     * @author Thijs van Rixoort
     */
    public async deserializeAllFiletypes(): Promise<string[]> {
        const myRequest: Request = new Request("http://localhost:4001/getAllFiletypes");

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');

        let response: Response = await fetch(myRequest, { method: "GET", headers, mode: "cors" });
        let data: { filetypes: string[] } = await response.json();

        return data.filetypes;
    }
}



// PROMOCODES //
interface PromoCodeStorageHandler {
    serialize(promoCode: string): boolean
    deserialize(): string[]
}

class StorePromotionCodeInLocalStorage implements PromoCodeStorageHandler {

    /**
     * Saves a promo code in local storage.
     * @param promoCode the promo code you want to save.
     * @returns true if the promo code was succesfully added, false if it wasn't.
     * @author Thijs van Rixoort
     */
    public serialize(promoCode: string): boolean {
        let storedData: string[] = this.deserialize();

        try {
            storedData.push(promoCode);
            localStorage.setItem("promotionCodes", JSON.stringify(storedData));
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Loads all promo codes from local storage.
     * @returns an array of all saved promo codes.
     * @author Thijs van Rixoort
     */
    public deserialize(): string[] {
        let returnArray: string[] = [];
        let rawData: string | null = localStorage.getItem("promotionCodes");

        if (rawData) {
            returnArray = JSON.parse(rawData);
        }

        return returnArray;
    }
}