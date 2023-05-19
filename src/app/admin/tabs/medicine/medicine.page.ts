import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserAccount } from 'src/app/interfaces/user-account.model';
import { ModalController } from '@ionic/angular';
import { UserMedicineComponent } from './user-medicine/user-medicine.component';
@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.page.html',
  styleUrls: ['./medicine.page.scss'],
})
export class MedicinePage implements OnInit {
  orders: any;
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.dataService
      .getPendingOrders()
      .subscribe((data) => (this.orders = data));
  }

  async openUserMedicine(orders: any) {
    const modal = await this.modalCtrl.create({
      component: UserMedicineComponent,
      componentProps: {
        orders: orders,
      },
    });
    return await modal.present();
  }
}
