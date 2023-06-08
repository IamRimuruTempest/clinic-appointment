import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { UserMedicineComponent } from '../../medicine/user-medicine/user-medicine.component';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orders: any;
  ordersSubscription: Subscription;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) {
    const monday = moment().startOf('week').format('YYYY-MM-DD');
    const sunday = moment().endOf('week').format('YYYY-MM-DD');

    this.ordersSubscription = this.dataService
      .getOrdersByDateRange(monday, sunday)
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  ngOnInit() {}

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
