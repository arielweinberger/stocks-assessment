/*
tslint:disable no-any
 */

/**
 * @file MockResponse class
 * @author Ariel Weinberger
 */

export class MockResponse {
    public data: { json: any, status: number } = {
        json: {},
        status: null
    };

    public status (code: number): MockResponse {
        this.data.status = code;

        return this;
    }

    public json (data: any): MockResponse {
        this.data.json = data;

        return this;
    }
}
