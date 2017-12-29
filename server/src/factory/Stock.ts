import * as logger from 'winston';

export class Stock {
    public id: number;
    public name: string;
    public uniqueSymbol: string;
    public currentPrice: number;

    constructor(id: number, name: string, uniqueSymbol: string) {
        this.id = id;
        this.name = name;
        this.uniqueSymbol = uniqueSymbol;
        this.currentPrice = 0;

        logger.info(`Stock ${name} (${uniqueSymbol}) has been created`);
    }
}
