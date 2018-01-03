/**
 * @file HTTP error handling class definition.
 * @author Ariel Weinberger
 */

/**
 * Error handling class for HTTP-specific errors, that also includes a status code.
 * Useful for when an error has to be thrown and is meant to be routed to
 * an Express router and the status code might be different depending on the
 * scope from which the HttpError has been thrown.
 */
export class HttpError extends Error {
    public status: number;
    public message: string;

    /**
     * Create a new HttpError class instance.
     * @param {number} status
     * @param {string} message
     */
    constructor (status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
