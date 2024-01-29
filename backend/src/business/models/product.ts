export namespace businessmodel {
    /**
     * The product businessmodel.
     * @author Thijs van Rixoort
     */
    export class Product {
        constructor(
            public name: string,
            public price: number,
            public images: string[],
            public dimensions: number[],
            public filament: string,
            public filetype: string,
            public seller: string,
            public description: string,
            public createdOn: string,
            public id: number,
            public active: number) { 
        }
    }
}