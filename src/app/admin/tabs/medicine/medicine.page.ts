import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.page.html',
  styleUrls: ['./medicine.page.scss'],
})
export class MedicinePage implements OnInit {
  // accounts: [] = [];
  accounts: any;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllUser().subscribe((user) => {
      this.accounts = user;
      console.log(this.accounts, 'test');
      // this.accounts.push(user);
      // user.map((userOrders) => {
      //   this.dataService.getUserOrder(userOrders.uid!).subscribe((order) => {
      //     // console.log(order, 'test');
      //     // console.log(user);

      //   });
      // });
    });
  }
}
