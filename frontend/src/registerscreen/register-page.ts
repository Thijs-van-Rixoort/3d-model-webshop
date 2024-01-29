/**
 * @description This program creates the register page in the register-user.html file.
 * @author Thijs van Rixoort
 */

/**
 * Creates the registerpage.
 * @author Thijs van Rixoort
 */
function initRegisterScreen(): void {
    document.body.appendChild(createRegisterPageHeader("Registreren"));
    document.body.appendChild(createRegisterPageForm());
    document.body.appendChild(createRegisterPageOtherOptions());

    let footerSection: HTMLElement = document.createElement("section");

    footerSection.id = "footerSection";

    document.body.appendChild(footerSection);
}

/**
 * Creates a header containing a page title on the html page.
 * @author Thijs van Rixoort
 */
function createRegisterPageHeader(pageTitle: string): HTMLElement {
    let header: HTMLElement = document.createElement("header");
    let heading: HTMLHeadingElement = document.createElement("h1");

    heading.innerText = pageTitle;
    // heading.className = "center pageTitle";
    heading.className = "pageTitle";

    header.appendChild(heading);

    return header;
}

/**
 * Creates the form needed to register an account.
 * @author Thijs van Rixoort
 */
function createRegisterPageForm(): HTMLFormElement {
    let registerForm: HTMLFormElement = document.createElement("form");
    registerForm.className = "center registerForm";
    registerForm.method = "POST";

    registerForm.addEventListener("submit", checkInputRegisterValues);
    registerForm.addEventListener("submit", initSendRegistration); // NIET MIJN CODE ~ Thijs van Rixoort

    registerForm.appendChild(createSingleRegisterScreenInput("email", "e-mailadres", "email"));
    registerForm.appendChild(createRegisterScreenPasswordSection());
    registerForm.appendChild(createRegisterButton());

    return registerForm;
}

/**
 * Creates a single input element.
 * @param nameAndId The name and the id given to the input element.
 * @param placeholder The placeholder message that is given to the input element.
 * @param inputType The type of the input.
 * @returns the created input element.
 * @author Thijs van Rixoort
 */
function createSingleRegisterScreenInput(nameAndId: string, placeholder: string, inputType: string = "text"): HTMLInputElement {
    let input: HTMLInputElement = document.createElement("input");

    input.type = inputType;
    input.name = nameAndId;
    input.id = nameAndId;
    input.placeholder = placeholder;
    input.className = "inputField";

    return input;
}

/**
 * Creates the password section of the register page.
 * @returns an html section containing an input of type password and a section containing the minimum
 * requirements for that password.
 * @author Thijs van Rixoort
 */
function createRegisterScreenPasswordSection(): HTMLElement {
    let passwordSection: HTMLElement = document.createElement("section");
    let passwordInput: HTMLInputElement = createSingleRegisterScreenInput("password", "wachtwoord", "password");

    passwordSection.className = "formSection";

    passwordInput.addEventListener("input", updatePasswordRequirements);

    passwordSection.appendChild(passwordInput);
    passwordSection.appendChild(createMinimumRequirements());

    return passwordSection;
}

/**
 * Creates an html section element that contains h6 elements of each requirement.
 * @returns a section element containing the requirements.
 * @author Thijs van Rixoort
 */
function createMinimumRequirements(): HTMLElement {
    let requirementSection: HTMLElement = document.createElement("section");
    let requirementArray: string[] = ["Minimaal 8 karakters", "Minimaal 1 hoofdletter", "Minimaal 1 cijfer"];
    let requirementIdArray: string[] = ["minimumAmountOfCharacters", "containsUppercaseCharacter", "containsNumber"];

    requirementSection.className = "requirementSection";

    for (let i = 0; i < requirementArray.length; i++) {
        requirementSection.appendChild(createSingleRequirement(requirementArray[i], requirementIdArray[i]));
    }

    return requirementSection;
}

/**
 * Creates an h4 element with the classes "requirement" & "neutral".
 * @param requirementText The requirement text.
 * @param requirementId The requirement ID on the document.
 * @returns the created h4 element.
 */
function createSingleRequirement(requirementText: string, requirementId: string): HTMLHeadingElement {
    let requirementElement: HTMLHeadingElement = document.createElement("h4");

    requirementElement.className = "requirement neutral";
    requirementElement.id = requirementId;
    requirementElement.innerText = requirementText;

    return requirementElement;
}

/**
 * Creates an input of type "submit" with the text "register" on it and the id "registerButton".
 * @returns the created input element.
 * @author Thijs van Rixoort
 */
function createRegisterButton(): HTMLInputElement {
    let registerButton: HTMLInputElement = document.createElement("input");

    registerButton.type = "submit";
    registerButton.id = "registerButton";
    registerButton.value = "Registreer";
    registerButton.className = "buttonSubmit";

    return registerButton;
}

/**
 * Creates the buttons on the registerpage
 * @author Thijs van Rixoort
 */
function createRegisterPageOtherOptions(): HTMLElement {
    let otherOptionsSection: HTMLElement = document.createElement("section");

    otherOptionsSection.id = "otherOptions";
    otherOptionsSection.className = "center";

    otherOptionsSection.appendChild(createRegisterPageOptionAnchor("Al geregistreerd? Log hier in.", "./login.html"));
    otherOptionsSection.appendChild(createRegisterPageOptionAnchor("Registreer hier als verkoper.", "./registerSeller.html"));

    return otherOptionsSection;
}

/**
 * Creates an anchor element.
 * @param innerText The innerText of the anchor element.
 * @param href The URL to the file you want the anchor element to refer to.
 * @returns the created anchor element.
 * @author Thijs van Rixoort
 */
function createRegisterPageOptionAnchor(innerText: string, href: string): HTMLAnchorElement {
    let anchorElement: HTMLAnchorElement = document.createElement("a");

    anchorElement.innerText = innerText;
    anchorElement.href = href;

    return anchorElement;
}

initRegisterScreen();