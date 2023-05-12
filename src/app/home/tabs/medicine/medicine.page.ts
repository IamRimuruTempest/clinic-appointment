import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Inventory } from 'src/app/interfaces/inventory.model';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { MedicineInformationComponent } from './medicine-information/medicine-information.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.page.html',
  styleUrls: ['./medicine.page.scss'],
})
export class MedicinePage implements OnInit {
  inventoryList: Inventory[] = [];
  inventorySub: Subscription;
  constructor(
    private auth: Auth,
    private dataService: DataService,
    private modalCtrl: ModalController
  ) {
    this.inventorySub = this.dataService
      .getInventories()
      .subscribe(
        (data) => ((this.inventoryList = data), console.log(this.inventoryList))
      );
  }

  ngOnInit() {}

  async openMedicineInformation(medicine: any) {
    const modal = await this.modalCtrl.create({
      // breakpoints: [0, 0.25, 0.5, 0.75],
      initialBreakpoint: 0.7,
      component: MedicineInformationComponent,
      componentProps: {
        medicine: medicine,
      },
    });
    return await modal.present();
  }

  async openUserCart() {
    UserCartComponent;
    const modal = await this.modalCtrl.create({
      component: UserCartComponent,
      componentProps: {},
    });
    return await modal.present();
  }

  doSomething() {
    console.log('Hello World!');
  }
}
