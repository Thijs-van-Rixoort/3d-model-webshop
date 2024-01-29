
let generated = document.createElement("div");
generated.innerText = `SET FOREIGN_KEY_CHECKS=0;`;
(document.getElementById("ProductScript") as HTMLElement).appendChild(generated)





function createDummyProducts2() {

  let filamentTypes: string[] = [
    "eSUN PLA+",
    "Inland PLA+",
    "Hatchbox PLA",
    "Eryone PLA",
    "Prusament PLA",
    "Overture PLA",
    "Amolen PLA",
  ];
  let fileTypes: string[] = [
    "STL",
    "OBJ",
    "3DS",
    "VRML",
    "SCAD",
    "3MF",
    "GCODE",
    "FBX",
  ];
  let wow = [];
  for (let i = 0; i < 120; i++) {
    let data = new Product(`Product ${Math.floor(Math.random() * 900)}`, Math.ceil(Math.random() * 99) + 0.99, [
      generateRandomImagePathing(),
      generateRandomImagePathing(),
      generateRandomImagePathing(),
    ], [
      Math.ceil(Math.random() * 100),
      Math.ceil(Math.random() * 100),
      Math.ceil(Math.random() * 100),
    ], filamentTypes[i % filamentTypes.length], fileTypes[i % fileTypes.length], "Thijs", "Product Description");
    wow.push(data);



    let numberA = Math.ceil(Math.random() * 26)
    let randomlenght = Math.ceil(Math.random() * 26)
    let cool = function () {
      for (let i: number = 0; i < randomlenght; i++) {
        var wowza = (String.fromCharCode(96 + numberA));
        let supercool = [];
        supercool.push(wowza)
        return supercool;
      }

    }
    let generated = document.createElement("div");
    generated.innerText = `INSERT INTO feag.product (id,name,price,description,x_length,y_length,z_length,created_on,filetype_id,seller_id,filament_id,active) VALUES (0,"${data.name}",${data.price},"${cool()}",${Math.ceil(Math.random() * 22)},${Math.ceil(Math.random() * 28)},${Math.ceil(Math.random() * 12)},0${Math.ceil(Math.random() * 9)}0${Math.ceil(Math.random() * 9)}0${Math.ceil(Math.random() * 9)},${Math.ceil(Math.random() * 10)},${Math.ceil(Math.random() * 2)},${Math.ceil(Math.random() * 10)},1);`;


    (document.getElementById("ProductScript") as HTMLElement).appendChild(generated)
  }

  let generated = document.createElement("div");
  generated.innerText = `SELECT * FROM feag.product`;
  (document.getElementById("ProductScript") as HTMLElement).appendChild(generated)
}

function generateRandomImagePathing(): string {
  return `../assets/images/placeholder_${Math.ceil(Math.random() * 20)}.png`;
}

createDummyProducts();














// const cool = async () => {
//   const sqldata: any = await (new StoreProductInDatabase()).deserializeAllProducts();
//   console.log((sqldata))


//   let cool = JSON.parse(JSON.stringify(sqldata))

//   console.log((cool))
//   console.log(typeof(cool) + "a")

//   return cool
// }


// const cool2 = async () => {
// await console.log(cool() + "wss")
// };
// cool2();



let wow = async () => {

  const cool = await (new StoreProductInDatabase()).deserializeAllProducts();
  console.log(cool)
}

wow()