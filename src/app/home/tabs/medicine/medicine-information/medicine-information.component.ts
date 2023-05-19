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
  selector: 'app-medicine-information',
  templateUrl: './medicine-information.component.html',
  styleUrls: ['./medicine-information.component.scss'],
})
export class MedicineInformationComponent implements OnInit {
  medicine: any;
  quantity: number = 0;
  uid: string = '';
  constructor(
    private dataService: DataService,
    private auth: Auth,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    this.uid = this.auth.currentUser?.uid!;
  }

  ngOnInit() {
    // console.log(this.uid, 'test');
    // this.dataService.getUserCart(this.uid).subscribe((data) =>
    //   data.map((res) => {
    //     if (res.id == this.medicine.id) {
    //       console.log(res, 'Parehas sila');
    //     }
    //   })
    // );
    // console.log(this.medicine, 'test');
  }

  async addToCart() {
    const loading = await this.loadingCtrl.create();
    if (this.quantity == 0) {
      console.log('0 quantity');
    } else {
      this.medicine['orderQty'] = this.quantity;
      await loading.present();
      this.dataService.addToCart(this.medicine, this.uid);
      this.modalCtrl.dismiss(null, 'cancel');
      loading.dismiss();
    }
  }

  addQuantity() {
    if (this.quantity >= this.medicine['quantity']) {
      this.quantity;
    } else {
      this.quantity += 1;
    }
  }

  minusQuantity() {
    this.quantity -= 1;
    if (this.quantity < 0) {
      this.quantity = 0;
    }
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
