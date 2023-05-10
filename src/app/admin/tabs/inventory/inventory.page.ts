import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: AddInventoryComponent,
      componentProps: {},
    });
    modal.present();
  }
}
