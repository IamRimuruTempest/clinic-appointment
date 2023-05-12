import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { ModalController, AlertController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Auth } from '@angular/fire/auth'; 
import { Appointment } from 'src/app/interfaces/appointment.model';

import { ThankYouComponent } from './thank-you/thank-you.component';

@Component({
  selector: 'app-insert-appointment',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  templateUrl: './insert-appointment.component.html',
  styleUrls: ['./insert-appointment.component.scss'],
})
export class InsertAppointmentComponent implements OnInit {
  name!: string;

  title: any;
  page: any;
  appointment: any;

  uid: string = '';
  errorMessage: string = '';

  readread: string = 'Hello readonly';

  errorMessages = {
    fullname: {
      required: 'Fullname is required.',
    },
    age: {
      required: 'Age is required.',
    },
    gender: {
      required: 'Gender is required.',
    },
    time: {
      required: 'Time is required.',
    },
    schedule: {
      required: 'Schedule is required.',
    },
    condition: {
      required: 'Condition is required.',
    },
  };
  formGroup!: FormGroup;
  fullname = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required, Validators.maxLength(2)]);
  gender = new FormControl('', [Validators.required]);
  time = new FormControl('', [Validators.required]);
  schedule = new FormControl('', [Validators.required]);
  condition = new FormControl('', [Validators.required]);
  status: string = '';

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private auth: Auth
  ) {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      fullname: this.fullname,
      age: this.age,
      gender: this.gender,
      time: this.time,
      schedule: this.schedule,
      condition: this.condition,
    });
  }

  ngOnInit() {
    this.uid = this.auth.currentUser?.uid!;
    console.log(this.title, 'title');

    if (this.title == 'Update' || this.title == 'View') {
      this.fullname.setValue(this.appointment['fullName']);
      this.age.setValue(this.appointment['age']);
      this.gender.setValue(this.appointment['gender']);
      this.time.setValue(this.appointment['time']);
      this.schedule.setValue(this.appointment['schedule']);
      this.condition.setValue(this.appointment['condition']);
      this.status = this.appointment['status'];
    }
  }

  async onSubmit(values: {
    fullname: string;
    age: number;
    gender: string;
    time: string;
    schedule: string;
    condition: string;
    uid: string;
  }) {
    values.uid = this.uid;

    // const loading = await this.loadingCtrl.create();
    // await loading.present();

    const newAppointment: Appointment = {
      fullName: values.fullname,
      age: values.age,
      gender: values.gender,
      time: values.time,
      schedule: values.schedule,
      condition: values.condition,
      uid: values.uid,
      status: this.status,
    };

    if (this.title == 'Insert') {
      this.dataService.addAppontment(newAppointment);
      await this.modalCtrl.dismiss();
      this.openThankYouComponent();
    } else {
      await this.dataService.updateAppointment(
        newAppointment,
        this.appointment['id']
      );
    }

    // loading.dismiss();
  }

  async cancelUserAppointment(appointment: any) {
    appointment.status = 'Canceled';
    const loading = await this.loadingCtrl.create({ duration: 2000 });
    const alert = await this.alertCtrl.create({
      header: 'Cancel Appoinment',
      message: 'Do you want to cancel your appointment?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            loading.present();

            this.dataService.updateAppointment(appointment, appointment.id);

            loading.dismiss();
            this.modalCtrl.dismiss();
          },
        },
        {
          text: 'Cancel',
        },
      ],
    });
    await alert.present();
  }

  async openThankYouComponent() {
    const modal = await this.modalCtrl.create({
      component: ThankYouComponent,
    });
    return await modal.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
