export class HttpError extends Error {
    public status: number;
    public message: string;

    constructor (status: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, Error);
        this.status = status;
        this.message = message;
    }
}
