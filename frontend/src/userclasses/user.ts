/**
 * @description This is a data class that can store all the information of a user.
 * @author Thijs van Rixoort
 */

class User {

    // PROPERTIES //
    private _emailAddress: string;
    private _password: string;
    private _products?: Product[] | undefined;
    private _firstName?: string | undefined;
    private _lastName?: string | undefined;
    private _userName?: string | undefined;


    //  CONSTRUCTOR //
    constructor(emailAddress: string,
        password: string,
        _products?: Product[],
        private _id?: number,
        _firstName?: string,
        _lastName?: string,
        _userName?: string
    ) {
        this._emailAddress = emailAddress;
        this._password = password;
    }

    // METHODS //
    public get emailAddress(): string {
        return this._emailAddress;
    }
    public set emailAddress(value: string) {
        this._emailAddress = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get products(): Product[] | undefined {
        return this._products;
    }
    public set products(value: Product[] | undefined) {
        this._products = value;
    }

    public get id(): number | undefined {
        return this._id;
    }

    public get firstName(): string {
        if (!this._firstName) {
            this._firstName = "";
        }

        return this._firstName;
    }
    public set firstName(value: string | undefined) {
        this._firstName = value;
    }

    public get lastName(): string {
        if (!this._lastName) {
            this._lastName = "";
        }

        return this._lastName;
    }
    public set lastName(value: string | undefined) {
        this._lastName = value;
    }

    public get userName(): string {
        if (!this._userName) {
            this._userName = "";
        }

        return this._userName;
    }
    public set userName(value: string | undefined) {
        this._userName = value;
    }
    /**
     * here pushes the user inputs to an array
     * @author Ömer Aynaci
     * @returns alluserInputValues
     */
    public giveUserInputArray(): string[] {
        let allUserInputValues: string[] = [];
        allUserInputValues.push(this.emailAddress, this.password);
        return allUserInputValues;
    }
    /**
     * Sends a post request, headers and registration data to the backend.
     * the response of the request is shown in the console
     * the content is shown in the console
     * @author Ömer Aynaci
     * @param {string[]} allUserInputValues an array with all the user inputs (email, password);
     */
    public async sendRegistrationToBackend(allUserInputValues: string[]): Promise<void> {
        const registrationRequest: Request = new Request('http://localhost:4001/addUser');
        const headers: Headers = this.headers();
        const content: string = JSON.stringify({ email: allUserInputValues[0], password: allUserInputValues[1] });
        const response: Response = await fetch(registrationRequest, { method: 'POST', headers, body: content, mode: 'cors' });
        this.checkResponseStatus(response);
    }

    /**
     * here creating the headers and appending the values 
     * @author Ömer Aynaci
     * @returns {Headers} the headers appended with the values
     */
    private headers(): Headers {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        return headers;
    }

    private checkResponseStatus(response: Response): void {
        let allUserInputValues: string[] = [];
        if (response.status == 200) {
            createSuccesNotification("Welkom Succesvoll geregisrteerd");
        } else {
            allUserInputValues.push(this.emailAddress, this.password);
        }
    }
}