import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  totalAppointments: number = 0;
  cancelledAppointments: number = 0;
  completedAppointments: number = 0;

  aptSubscription: Subscription;

  totalOrders: number = 0;
  cancelledOrders: number = 0;
  completedOrders: number = 0;

  ordersSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {
    const monday = moment().startOf('week').format('YYYY-MM-DD');
    const sunday = moment().endOf('week').format('YYYY-MM-DD');

    this.aptSubscription = this.dataService
      .getAppointmentsByDateRange(monday, sunday)
      .subscribe((appts) => {
        this.totalAppointments = appts.length;
        this.completedAppointments = appts.filter(
          (a) => a.status === 'Finished'
        ).length;
        this.cancelledAppointments = appts.length - this.completedAppointments;
      });
    this.ordersSubscription = this.dataService
      .getOrdersByDateRange(monday, sunday)
      .subscribe((orders) => {
        this.totalOrders = orders.length;
        this.completedOrders = orders.filter(
          (a) => a.status === 'Approved'
        ).length;
        this.cancelledOrders = orders.length - this.completedOrders;
      });
  }

  ngOnInit() {}
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
