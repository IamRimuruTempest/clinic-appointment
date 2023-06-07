import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { DataService } from 'src/app/services/data.service';
import { Inventory } from 'src/app/interfaces/inventory.model';
import { Subscription } from 'rxjs';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit, OnDestroy {
  inventoryList: Inventory[] = [];
  inventorySub: Subscription;
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {
    this.inventorySub = this.dataService
      .getInventories()
      .subscribe((data) => (this.inventoryList = data));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.inventorySub.unsubscribe();
  }

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddInventoryComponent,
      componentProps: {},
    });
    modal.present();
  }

  async updateInventory(item: Inventory) {
    const modal = await this.modalCtrl.create({
      component: AddInventoryComponent,
      componentProps: {
        action: 'Update',
        inventory: item,
      },
    });
    modal.present();
  }

  async viewInventory(item: Inventory) {
    const modal = await this.modalCtrl.create({
      component: ViewInventoryComponent,
      componentProps: {
        inventory: item,
      },
    });
    modal.present();
  }
}
