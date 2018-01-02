import { TestBed } from '@angular/core/testing';

import { FeedbackService } from './feedback.service';
import { MaterialModule } from './material.module';
import { MatSnackBar } from '@angular/material';

describe('StockService', () => {
    let feedbackService: FeedbackService;
    let snackBar;
    let snackBarOpenSpy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule
            ],
            providers: [
                FeedbackService,
                MatSnackBar
            ]
        });

        feedbackService = TestBed.get(FeedbackService);
        snackBar = TestBed.get(MatSnackBar);
        snackBarOpenSpy = spyOn(snackBar, 'open');
    });

    describe('send', () => {
        it('displays an Angular Material Snackbar notification', () => {
            feedbackService.send('Test message');
            expect(snackBar.open).toHaveBeenCalledWith('Test message', null, { duration: 3000 });
        });
    });
});
