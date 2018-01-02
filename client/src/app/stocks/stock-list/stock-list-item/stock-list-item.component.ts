import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stock-list-item',
    templateUrl: './stock-list-item.component.html',
    styleUrls: ['./stock-list-item.component.scss']
})
export class StockListItemComponent {
    @Input() stock: Stock;
    public edit = false;

    /**
     * Toggle edit mode
     */
    public toggleEdit () {
        this.edit = !this.edit;
    }
}
