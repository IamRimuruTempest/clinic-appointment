import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Appointment } from 'src/app/interfaces/appointment.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit, OnDestroy {
  pendingAppointments: Appointment[] = [];
  sub: Subscription;
  constructor(private dataService: DataService) {
    this.sub = this.dataService
      .getPendingAppointments()
      .subscribe(
        (data) => ((this.pendingAppointments = data), console.log(data))
      );
  }

  ngOnDestroy(): void {
    console.log('destroyed');
    this.sub.unsubscribe();
  }

  ngOnInit() {}
}
