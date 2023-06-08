import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment.model';
import { UpdateStatusComponent } from '../../appointments/update-status/update-status.component';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.page.html',
  styleUrls: ['./appointment-history.page.scss'],
})
export class AppointmentHistoryPage implements OnInit {
  appointmentHistory: Appointment[] = [];

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController
  ) {
    const monday = moment().startOf('week').format('YYYY-MM-DD');
    const sunday = moment().endOf('week').format('YYYY-MM-DD');

    this.dataService
      .getAppointmentsByDateRange(monday, sunday)
      .subscribe(
        (data) => (
          (this.appointmentHistory = data),
          console.log(this.appointmentHistory, 'Appointments History')
        )
      );

    // console.log(moment(this.today).format('YYYY-MM-DD'));
  }
  ngOnInit() {}
  async openUpdateStatus(appointment: any) {
    const modal = await this.modalCtrl.create({
      component: UpdateStatusComponent,
      componentProps: {
        status: appointment.status,
        appointment: appointment,
      },
    });
    return await modal.present();
  }
}
