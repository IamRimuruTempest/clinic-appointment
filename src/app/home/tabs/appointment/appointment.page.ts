import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonModal,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Appointment } from 'src/app/interfaces/appointment.model';
import { Auth } from '@angular/fire/auth';
import { InsertAppointmentComponent } from './insert-appointment/insert-appointment.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  // @ViewChild(IonModal)
  // modal!: IonModal;

  name: string = '';

  appointments: any[] = [];
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

  formGroup: FormGroup;
  fullname = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required, Validators.maxLength(2)]);
  gender = new FormControl('', [Validators.required]);
  time = new FormControl('', [Validators.required]);
  schedule = new FormControl('', [Validators.required]);
  condition = new FormControl('', [Validators.required]);

  constructor(
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController,
    private router: Router,
    public formBuilder: FormBuilder,
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
    this.getUserAppointments();
  }

  async getUserAppointments() {
    await this.dataService.getAppointments().subscribe((res) => {
      let tmpAppointment: any[] = [];
      res.forEach((element) => {
        if (element['uid'] == this.uid && element['status'] == '') {
          tmpAppointment.push(element);
        }
      });

      this.appointments = tmpAppointment;
      console.log(this.appointments, 'test 1 appointments');
    });
  }

  async insertUserAppointment() {
    const modal = await this.modalCtrl.create({
      component: InsertAppointmentComponent,
      componentProps: {
        title: 'Insert',
        page: 'Set Appointment',
      },
    });
    modal.present();
  }

  async updateUserAppointment(appointment: []) {
    const modal = await this.modalCtrl.create({
      component: InsertAppointmentComponent,
      componentProps: {
        title: 'Update',
        page: 'Update Appointment',
        appointment: appointment,
      },
    });
    return await modal.present();
  }

  async viewUserAppointment(appointment: []) {
    const modal = await this.modalCtrl.create({
      component: InsertAppointmentComponent,
      componentProps: {
        title: 'View',
        page: 'Appointment Information',
        appointment: appointment,
      },
    });
    return await modal.present();
  }
}
