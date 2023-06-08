import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { InventoryHistory } from 'src/app/interfaces/inventory-history.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-user-medicine',
  templateUrl: './user-medicine.component.html',
  styleUrls: ['./user-medicine.component.scss'],
})
export class UserMedicineComponent implements OnInit {
  orders: any;
  medicine: any;

  today: Date = new Date();
  notification: { title: string; description: string; date: string } = {
    title: '',
    description: '',
    date: '',
  };
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private dataService: DataService
  ) {
    // this.dataService
    //   .getInventories()
    //   .subscribe((data) => (this.medicine = data));
  }

  ngOnInit() {
    console.log(this.orders, 'test orders from user medicine');
  }

  async approvedRequestedMedicine() {
    let newDate = moment(this.today).format('YYYY-MM-DD');
    const alert = await this.alertCtrl.create({
      subHeader: 'Request Confirmation',
      message: 'Are you sure you want to approved this request?',
      cssClass: 'secondary',
      buttons: [
        { text: 'CANCEL' },
        {
          text: 'OK',
          handler: (data) => {
            this.orders.order.map((data: any) => {
              console.log(data);
              const tmpArr = {
                name: data.name,
                description: data.description,
                quantity: data.quantity - data.orderQty,
              };

              this.dataService.updateInventory(tmpArr, data.id);
              const newHistory: InventoryHistory = {
                timestamp: Timestamp.now(),
                quantity: -data.orderQty,
                ending_quantity: data.quantity - data.orderQty,
              };
              this.dataService.addInventoryHistory(data.id, newHistory);
            });

            this.notification = {
              title: 'Request Confirmation',
              description:
                'I am delighted to inform you that your request has been approved. Kindly get your requested medicine from CSU Clinic.',
              date: newDate,
            };
            this.dataService.addToNotification(
              this.notification,
              this.orders.account.uid
            );

            this.orders.status = 'Approved';
            this.dataService.updateUserOrder(this.orders, this.orders.uid);

            this.modalCtrl.dismiss(null, 'cancel');
          },
        },
      ],
    });

    await alert.present();
  }

  async cancelRequestedMedicine() {
    let newDate = moment(this.today).format('YYYY-MM-DD');
    const alert = await this.alertCtrl.create({
      subHeader: 'Request Confirmation',
      message: 'Are you sure you want to cancel this request?',
      inputs: [
        {
          name: 'description',
          placeholder: 'Description',
          value: 'We regret to inform you that your request has been canceled.',
        },
      ],
      cssClass: 'secondary',
      buttons: [
        { text: 'CANCEL' },
        {
          text: 'OK',
          handler: (data) => {
            data.title = 'Request Cancelation';
            data.date = newDate;
            this.notification = data;
            this.dataService.addToNotification(
              this.notification,
              this.orders.account.uid
            );

            this.orders.status = 'Cancelled';
            this.dataService.updateUserOrder(this.orders, this.orders.uid);
            this.modalCtrl.dismiss(null, 'cancel');
          },
        },
      ],
    });

    await alert.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
