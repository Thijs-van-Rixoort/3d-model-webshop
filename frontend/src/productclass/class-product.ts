/**
 * @author Jacky Schoen
 * @version 1.1
 * @description This file contains the Product class.
 */

class Product {

    // Properties
    private _name: string;
    private _price: number;
    private _images: string[];
    private _dimensions: number[];
    private _filament: string;
    private _filetype: string;
    private _seller: string;

    // Constructor
    constructor(name: string, price: number, images: string[], dimensions: number[], filament: string, filetype: string, seller: string, private _description?: string, private _createdOn?: string, private _id?: number, private _active?: number) {
        this._name = name;
        this._price = price;
        this._images = images;
        this._dimensions = dimensions;
        this._filament = filament;
        this._filetype = filetype;
        this._seller = seller;
    }

    // Methods
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }

    public get images(): string[] {
        return this._images;
    }
    public set images(value: string[]) {
        this._images = value;
    }

    public get dimensions(): number[] {
        return this._dimensions;
    }
    public set dimensions(value: number[]) {
        this._dimensions = value;
    }

    public get filament(): string {
        return this._filament;
    }
    public set filament(value: string) {
        this._filament = value;
    }

    public get filetype(): string {
        return this._filetype;
    }
    public set filetype(value: string) {
        this._filetype = value;
    }

    public get seller(): string {
        return this._seller;
    }
    public set seller(value: string) {
        this._seller = value;
    }

    public get description(): string | undefined {
        return this._description;
    }
    public set description(value: string | undefined) {
        this._description = value;
    }

    public get createdOn(): string | undefined {
        return this._createdOn;
    }

    public get id(): number | undefined {
        return this._id;
    }

    public get active(): number | undefined {
        return this._active;
    }
}