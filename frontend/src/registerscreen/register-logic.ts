/**
 * @author Thijs van Rixoort
 * @description This program contains the logic for registering a new account.
 */

/**
 * Checks if the user inputs on the register page are valid.
 * @param event The event object used for preventing the default submit behaviour of a form.
 * @author Thijs van Rixoort
 */
function checkInputRegisterValues(event: Event): void {
    event.preventDefault();

    let userEmail: string = (document.getElementById("email")! as HTMLInputElement).value;
    let userPassword: string = (document.getElementById("password")! as HTMLInputElement).value;

    if (isEmailValid(userEmail) && isPasswordValid(userPassword)) {
        registerNewUser(userEmail, userPassword);
    } else {
        createErrorNotification("Het e-mailadres is al gekoppeld aan een account of het e-mailadres/wachtwoord voldoet niet aan de eisen!");
    }
}

/**
 * Checks if the email the user put in the email entry is connected to another account already.
 * @param inputEmail The email that is being checked.
 * @returns true if the email is not found, false if it is found.
 * @author Thijs van Rixoort
 */
function isEmailValid(inputEmail: string): boolean {
    let returnBoolean: boolean = true;
    let storedUsers: User[] = new StoreUserInLocalStorage().deserialize();

    storedUsers.forEach(user => {
        if (user.emailAddress === inputEmail) {
            returnBoolean = false;
        }
    });

    return returnBoolean && inputEmail.length > 0;
}

/**
 * Checks if a give password meets all the minimum password requirements.
 * @param password The password that is being checked.
 * @returns a boolean
 * @author Thijs van Rixoort
 */
function isPasswordValid(password: string): boolean {
    let hasUppercaseLetter: boolean = passwordContainsUppercaseCharacter(password);
    let hasNumber: boolean = passwordContainsNumber(password);
    let hasMinimumAmountOfCharacters: boolean = passwordContainsMinimumAmountOfCharacters(password);

    return hasUppercaseLetter && hasNumber && hasMinimumAmountOfCharacters && password.length > 0;
}

/**
 * Checks if there is an uppercase character in a string.
 * @param password the string that is checked.
 * @returns true if the string contains an uppercase character, else false.
 * @author Thijs van Rixoort
 */
function passwordContainsUppercaseCharacter(password: string): boolean {
    let returnBoolean: boolean = false;

    for (let character of password) {
        if (isNaN(+character) && character === character.toUpperCase() && character !== character.toLowerCase()) {
            returnBoolean = true;
        }
    }

    return returnBoolean;
}

/**
 * Checks if there is a number in a string.
 * @param password the string that is checked.
 * @returns true if the string contains a number, else false.
 * @author Thijs van Rixoort
 */
function passwordContainsNumber(password: string): boolean {
    let returnBoolean: boolean = false;

    for (let character of password) {
        if (!(isNaN(+character)) && character !== " ") {
            returnBoolean = true;
        }
    }

    return returnBoolean;
}

/**
 * Checks if there is a string has a length of 8 or more.
 * @param password the string that is checked.
 * @returns true if the string is at least 8 characters long, else false.
 * @author Thijs van Rixoort
 */
function passwordContainsMinimumAmountOfCharacters(password: string): boolean {
    return password.length >= 8 ? true : false;
}

/**
 * Updates the requirements that are visible on the html page.
 * @param event The event object containing the password.
 * @author Thijs van Rixoort
 */
function updatePasswordRequirements(event: Event): void {
    let inputPassword: string = (event.target as HTMLInputElement).value;
    let requirements: string[] = ["minimumAmountOfCharacters", "containsUppercaseCharacter", "containsNumber"];
    let requirementChecks: Function[] = [passwordContainsMinimumAmountOfCharacters, passwordContainsUppercaseCharacter, passwordContainsNumber];

    for (let i: number = 0; i < requirements.length; i++) {
        let requirement: HTMLHeadingElement = (document.getElementById(requirements[i]) as HTMLHeadingElement)!;
        updateSinglePasswordRequirement(inputPassword, requirement, requirementChecks[i]);
    }
}

/**
 * Updates a single requirement on the registerUser html page.
 * @param password The password that is being checked.
 * @param requirement The requirement that is being checked.
 * @param passwordCheck The function that checks the requirement.
 * @author Thijs van Rixoort
 */
function updateSinglePasswordRequirement(password: string, requirement: HTMLHeadingElement, passwordCheck: Function): void {
    if (passwordCheck(password)) {
        requirement.classList.remove("neutral", "error");
        requirement.classList.add("succes");
    } else {
        requirement.classList.remove("neutral", "succes");
        requirement.classList.add("error");
    }
}

/**
 * Creates a new user and saves them in the current storage.
 * @param email The email used for the user.
 * @param password The password user for the user.
 * @author Thijs van Rixoort
 */
function registerNewUser(email: string, password: string): void {
    new StoreUserInLocalStorage().serialize(new User(email, password, []));
    createSuccesNotification("Je account is geregistreerd en we hebben je ingelogd. Welkom!");
    setTimeout(() => { window.location.href = "./product-overview.html" }, 3150);
}

/**
 * here sending the registration form to the database
 * @author Ömer Aynaci
 */
async function initSendRegistration(): Promise<void> {

    let registrationFormSubmission: User = createNewRegistrationSubmission();
    let allUserInputValues: string[] = registrationFormSubmission.giveUserInputArray();
    await registrationFormSubmission.sendRegistrationToBackend(allUserInputValues);

    allUserInputValues = [];
}

/**
 * getting the user inputs and checking if the values are correct, if they are then its going to put the values in an array
 * @author Ömer Aynaci
 * @returns {string[]} the array with the user input fields (email, password)
 */
function createNewRegistrationSubmission(): User {
    let emailValue: string = (document.getElementById('email')! as HTMLInputElement).value;
    let passwordValue: string = (document.getElementById('password')! as HTMLInputElement).value;

    let registrationFromSubmission: User = new User(emailValue, passwordValue);

    return registrationFromSubmission;
}