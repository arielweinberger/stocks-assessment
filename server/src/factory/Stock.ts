import * as logger from 'winston';

export class Stock {
    public id: number;
    public name: string;
    public uniqueSymbol: string;
    public _price: number;
    public lastUpdate: Date;

    constructor(id: number, name: string, uniqueSymbol: string) {
        this.id = id;
        this.name = name;
        this.uniqueSymbol = uniqueSymbol;
        this.price = 0;

        logger.info(`Stock ${name} (${uniqueSymbol}) has been created`);
    }

    get price (): number {
        return this._price;
    }

    set price (value: number) {
        this._price = value;
        this.lastUpdate = new Date();
    }
}
