import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const monday = moment().startOf('week').format('YYYY-MM-DD');
    const sunday = moment().endOf('week').format('YYYY-MM-DD');

    this.dataService
      .getAppointmentsByDateRange(monday, sunday)
      .subscribe((appts) => {
        this.totalAppointments = appts.length;
        this.completedAppointments = appts.filter(
          (a) => a.status === 'Finished'
        ).length;
        this.cancelledAppointments = appts.length - this.completedAppointments;
      });
  }
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
