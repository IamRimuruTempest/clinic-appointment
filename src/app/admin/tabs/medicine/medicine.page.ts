import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UserAccount } from 'src/app/interfaces/user-account.model';
@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.page.html',
  styleUrls: ['./medicine.page.scss'],
})
export class MedicinePage implements OnInit {
  // accounts: UserAccount[] = [];
  // accounts: any;
  orders: {} = {};
  constructor(private dataService: DataService) {
    // this.dataService.getAllOrders().subscribe((data) => {
    //   this.orders = data;
    //   console.log(this.orders, 'test data');
    // });
  }

  ngOnInit() {
    // this.dataService.getAllUser().subscribe((user) => {
    //   // this.accounts.push(...user);
    //   user.forEach((userOrders) => {
    //     console.log(this.dataService.getUserOrder(userOrders.uid!));
    //   });
    // });
  }
}
