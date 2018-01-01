import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class FeedbackService {
    private readonly DEFAULT_DURATION = 3000;

    constructor (private snackBar: MatSnackBar) {}

    send (text: string) {
        return this.snackBar.open(text, null,{
            duration: this.DEFAULT_DURATION
        });
    }
}
