/**
 * @file HttpError tests
 * @author Ariel Weinberger
 */
import { HttpError } from '@app/lib/HttpError';

describe('HttpError', () => {

    it('constructs HttpError with status code and message', () => {
        const httpError: HttpError = new HttpError(409, 'Error message');
        expect(httpError.status).toEqual(409);
        expect(httpError.message).toEqual('Error message');
    });
});
