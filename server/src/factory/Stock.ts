/**
 * @file Stock class definition.
 * @author Ariel Weinberger
 */

import * as logger from 'winston';

/**
 * Class representing a stock.
 */
export class Stock {
    public id: number;
    public name: string;
    public uniqueSymbol: string;
    public price: number;
    public lastUpdate: Date;

    /**
     * Create a new stock instance.
     * @param {number} id
     * @param {string} name
     * @param {string} uniqueSymbol
     * @param {number} price
     */
    constructor (id: number, name: string, uniqueSymbol: string, price: number) {
        this.id = id;
        this.name = name;
        this.uniqueSymbol = uniqueSymbol;
        this.price = price;

        logger.info(`Stock ${name} (${uniqueSymbol}) has been created`);
    }

    /**
     * Set stock price. This will set "lastUpdate" to the current timestamp.
     * @param {number} value
     */
    public setPrice (value: number): void {
        this.price = value;
        this.lastUpdate = new Date();
    }
}
