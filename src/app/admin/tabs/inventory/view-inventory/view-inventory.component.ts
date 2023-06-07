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
}
