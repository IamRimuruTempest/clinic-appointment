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
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Auth } from '@angular/fire/auth';
import { Appointment } from 'src/app/interfaces/appointment.model';
import { title } from 'process';

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
  appointment: any;

  uid: string = '';
  errorMessage: string = '';

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

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
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

    if (this.title == 'Update') {
      this.fullname.setValue(this.appointment['fullName']);
      this.age.setValue(this.appointment['age']);
      this.gender.setValue(this.appointment['gender']);
      this.time.setValue(this.appointment['time']);
      this.schedule.setValue(this.appointment['schedule']);
      this.condition.setValue(this.appointment['condition']);
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

    const loading = await this.loadingCtrl.create();
    await loading.present();

    const newAppointment: Appointment = {
      fullName: values.fullname,
      age: values.age,
      gender: values.gender,
      time: values.time,
      schedule: values.schedule,
      condition: values.condition,
      uid: values.uid,
    };

    if (this.title == 'Insert') {
      this.dataService.addAppontment(newAppointment);
    } else {
      this.dataService.updateAppointment(
        newAppointment,
        this.appointment['id']
      );
    }

    this.modalCtrl.dismiss();
    loading.dismiss();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
