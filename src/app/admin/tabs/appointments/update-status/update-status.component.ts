import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent implements OnInit {
  appointment: any;
  id: string = '';
  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.id = this.appointment['id'];
    console.log(this.appointment, 'test appointment');
  }

  async alertCancelAppointmnet() {
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
            data.uid = this.id;
            this.dataService.addToNotification(data);
            this.CancelAppointment('Canceled');
          },
        },
      ],
    });

    await alert.present();
  }

  async CancelAppointment(status: string) {
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
