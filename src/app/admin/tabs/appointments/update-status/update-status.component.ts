import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent implements OnInit {
  status: any;
  appointment: any;
  today: Date = new Date();
  id: string = '';
  uid: string = '';
  notification: { title: string; description: string; date: string } = {
    title: '',
    description: '',
    date: '',
  };
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.id = this.appointment['id'];
    this.uid = this.appointment['uid'];
    console.log(this.appointment, 'test appointment');
    console.log(this.status, 'test status');
  }

  async alertFinishedAppointment() {
    let newDate = moment(this.today).format('YYYY-MM-DD');
    const alert = await this.alertCtrl.create({
      subHeader: 'Finish Appointment',
      message: 'Are you sure you want to finish this appointment?',
      cssClass: 'secondary',
      buttons: [
        { text: 'CANCEL' },
        {
          text: 'OK',
          handler: () => {
            this.updateAppointmentStatus('Finished');
          },
        },
      ],
    });
    await alert.present();
  }

  async alertConfirmAppoitment() {
    let newDate = moment(this.today).format('YYYY-MM-DD');
    const alert = await this.alertCtrl.create({
      subHeader: 'Appointment Confirmation',
      message: 'Are you sure you want to confirm this appointment?',
      cssClass: 'secondary',
      buttons: [
        { text: 'CANCEL' },
        {
          text: 'OK',
          handler: () => {
            this.notification = {
              title: 'Appointment Confirmation',
              description:
                'I am pleased to inform you that your appointment has been confirmed. We look forward to meeting you on the scheduled date.',
              date: newDate,
            };
            this.dataService.addToNotification(this.notification, this.uid);
            this.updateAppointmentStatus('Approved');
          },
        },
      ],
    });
    await alert.present();
  }

  async alertCancelAppointmnet() {
    let newDate = moment(this.today).format('YYYY-MM-DD');
    const alert = await this.alertCtrl.create({
      subHeader: 'Appointment Cancelation',
      inputs: [
        {
          name: 'description',
          placeholder: 'Description',
          value:
            'Due to unforseen circumtances, your scheduled appointment at CSU-Dental Clinic has been canceled!.',
        },
      ],
      buttons: [
        { text: 'CANCEL' },
        {
          text: 'OK',
          handler: (data) => {
            data.title = 'Appointment Cancelation';
            data.date = newDate;
            this.notification = data;
            this.dataService.addToNotification(this.notification, this.uid);
            this.updateAppointmentStatus('Canceled');
          },
        },
      ],
    });

    await alert.present();
  }

  async updateAppointmentStatus(status: string) {
    this.appointment['status'] = status;

    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.dataService.updateAppointment(this.appointment, this.id);
    this.modalCtrl.dismiss();
    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
