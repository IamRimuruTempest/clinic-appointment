import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InventoryHistory } from 'src/app/interfaces/inventory-history.model';
import { Inventory } from 'src/app/interfaces/inventory.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss'],
})
export class ViewInventoryComponent implements OnInit, OnDestroy {
  inventory: Inventory | null = null;
  inventory_history: InventoryHistory[] = [];
  historySub: Subscription | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.historySub = this.dataService
      .getInventoryHistory(this.inventory?.id!)
      .subscribe(
        (inventoryHistory) => (this.inventory_history = inventoryHistory)
      );
  }

  ngOnDestroy(): void {
    this.historySub!.unsubscribe();
  }

  public formatDate(t: Date): string {
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const seconds = ('0' + t.getSeconds()).slice(-2);
    const time = `${date}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    return time;
  }
}
