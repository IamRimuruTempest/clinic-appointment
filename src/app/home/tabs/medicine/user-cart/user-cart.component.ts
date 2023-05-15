import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Inventory } from 'src/app/interfaces/inventory.model';
import { DataService } from 'src/app/services/data.service';
import { Auth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
})
export class UserCartComponent implements OnInit {
  medicine: any;
  uid: string = '';
  constructor(
    private dataService: DataService,
    private auth: Auth,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    this.uid = this.auth.currentUser!.uid!;
  }

  ngOnInit() {
    this.dataService
      .getUserCart(this.uid)
      .subscribe(
        (data) => ((this.medicine = data), console.log(this.medicine))
      );
  }

  async addToOrder() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.medicine.map((element: any) => {
      console.log(element, 'test me');
      // this.dataService.addToOrder(element, this.uid);
      this.dataService.addToDummyOrder(element, this.uid);
      this.dataService.deleteUserCart(this.uid, element.id);
    });

    this.modalCtrl.dismiss(null, 'cancel');
    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
