import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Inventory } from 'src/app/interfaces/inventory.model';
import { DataService } from 'src/app/services/data.service';
import { Auth } from '@angular/fire/auth';
@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Inventory[] = [];
  uid: string = '';
  constructor(
    private dataService: DataService,
    private auth: Auth,
    private modalCtrl: ModalController
  ) {
    this.uid = this.auth.currentUser!.uid!;
  }

  ngOnInit() {
    this.dataService.getUserOrder(this.uid).subscribe((data) => {
      console.log(data);
      this.orders = data;
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
