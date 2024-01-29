function toggleFilter() {
    let coll = document.querySelectorAll(".collapsible");
    let i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            // this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block"
            }
        });
    }
}
toggleFilter();

function filament(querySelectorAllId: string) {
    let filamentInput = document.querySelectorAll(querySelectorAllId)!;
    let filamentTypes: string[] = ["eSUN PLA+", "Inland PLA+", "Hatchbox PLA", "Eryone PLA", "Prusament PLA", "Overture PLA", "Amolen PLA"];
    filamentInput[0].textContent = filamentTypes[0];
    filamentInput[1].textContent = filamentTypes[1];
    filamentInput[2].textContent = filamentTypes[2];
    filamentInput[3].textContent = filamentTypes[3];
    filamentInput[4].textContent = filamentTypes[4];
    filamentInput[5].textContent = filamentTypes[5];
    filamentInput[6].textContent = filamentTypes[6];
}
filament("#filamentLabel");

function fileTypes(querySelectorAllId: string) {
    let fileTypesId = document.querySelectorAll(querySelectorAllId)!;
    let fileTypes: string[] = ["STL", "OBJ", "3DS", "VRML", "SCAD", "3MF", "GCODE", "FBX"];
    fileTypesId[0].textContent = fileTypes[0];
    fileTypesId[1].textContent = fileTypes[1];
    fileTypesId[2].textContent = fileTypes[2];
    fileTypesId[3].textContent = fileTypes[3];
    fileTypesId[4].textContent = fileTypes[4];
    fileTypesId[5].textContent = fileTypes[5];
}
fileTypes("#fileTypeLabel");

function fileTypesContinue(querySelectorAllId: string) {
    let fileTypesId = document.querySelectorAll(querySelectorAllId)!;
    let fileTypes: string[] = ["STL", "OBJ", "3DS", "VRML", "SCAD", "3MF", "GCODE", "FBX"];
    fileTypesId[6].textContent = fileTypes[6];
    fileTypesId[7].textContent = fileTypes[7];
}
fileTypesContinue("#fileTypeLabel");

function onChangeDelete(querySelectorAllId: string) {
    let fileTypesId = document.querySelectorAll("#filament")!;
    let filamentInput = document.getElementById("filament")! as HTMLInputElement;
    let infosection = document.getElementById("infoSection")!;
    fileTypesId.forEach(fileType => {
        fileType.addEventListener("change", () => {
            if (filamentInput.checked) {
                infosection.style.display = "none";
            } else {
                infosection.style.display = "block";
            }
        })
    })
}
onChangeDelete("#filament");

function deleteFilterType(ElementName: string): any {
    let deleteFilterButton = document.getElementById("deleteFilter")! as HTMLButtonElement;
    let filterType = document.getElementsByName(ElementName)! as any;
    deleteFilterButton.addEventListener("click", () => {
        for (let x = 0; x < filterType.length; x++) {
            filterType[x].checked = false;
        }
    })
    return filterType;
}

deleteFilterType("filetype");
deleteFilterType("filament");
deleteFilterType("Afmeting");
deleteFilterType("Verkoper");