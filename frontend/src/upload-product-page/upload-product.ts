/**
 * @author Thijs van Rixoort
 * @description This program ties the upload form to the backend.
 */

/**
 * Binds an eventlistener to the uploadform.
 * @author Thijs van Rixoort
 */
function init_upload_page(): void {
    let uploadForm: HTMLFormElement = (document.getElementById("uploadForm") as HTMLFormElement);

    uploadForm.addEventListener("submit", async (event: Event) => {
        event.preventDefault();
        let productData: HTMLFormControlsCollection = uploadForm.elements;
        let product: Product = new Product((
            productData.namedItem("title")! as HTMLInputElement).value,
            +(productData.namedItem("price")! as HTMLInputElement).value,
            [(productData.namedItem("image[]")! as HTMLInputElement).value],
            [+(productData.namedItem("x")! as HTMLInputElement).value,
            +(productData.namedItem("y")! as HTMLInputElement).value,
            +(productData.namedItem("z")! as HTMLInputElement).value],
            (productData.namedItem("filament")! as HTMLInputElement).value,
            (productData.namedItem("filetype")! as HTMLInputElement).value.toUpperCase(),
            "seller_1", (productData.namedItem("description")! as HTMLInputElement).value
        );

        let response: Response = await new StoreProductInDatabase().serialize(product);

        generateUploadNotification(await response.json());
    });
}

async function generateUploadNotification(responseData: { succesfullyAddedProduct: boolean }): Promise<void> {



    if (responseData.succesfullyAddedProduct) {
        createSuccesNotification("Het product is succesvol toegevoegd aan de database.")
    } else {
        createErrorNotification("Sorry, het toevoegen van het product is niet gelukt. Check of je alle informatie hebt ingevuld!")
    }
}

init_upload_page();