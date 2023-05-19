import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Inventory } from 'src/app/interfaces/inventory.model';
import { DataService } from 'src/app/services/data.service';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, filter } from 'rxjs';
import { UserAccount } from 'src/app/interfaces/user-account.model';

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
  orders: [account: Array<UserAccount>, order: Array<Inventory>] = [[], []];

  account: UserAccount = {
    fullname: '',
    age: '',
    address: '',
    gender: '',
    schoolID: '',
    phoneNumber: '',
    course: '',
    college: '',
  };

  constructor(
    private dataService: DataService,
    private auth: Auth,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
    this.uid = this.auth.currentUser!.uid!;
    this.authService.userAccount$
      .pipe(filter((use) => use !== null))
      .subscribe((user) => {
        this.account = user!;
        // console.log(this.account);
      });
  }

  ngOnInit() {
    this.dataService
      .getUserCart(this.uid)
      .subscribe(
        (data) => ((this.medicine = data), console.log(this.medicine))
      );
  }

  async addToOrder() {
    this.orders[0].push(this.account);

    this.medicine.map((data: any) => {
      this.orders[1].push(data);
    });

    // const loading = await this.loadingCtrl.create();
    // await loading.present();

    this.dataService.addToOrder(this.orders);

    this.medicine.map((element: any) => {
      // this.dataService.addToOrder(element, this.uid);
      // this.dataService.addToDummyOrder(element, this.uid);
      this.dataService.deleteUserCart(this.uid, element.id);
    });
    // this.modalCtrl.dismiss(null, 'cancel');
    // loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
