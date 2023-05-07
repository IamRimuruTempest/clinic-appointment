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

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

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
    // this.getUserAppointment();
    this.uid = this.auth.currentUser?.uid!;
    this.dataService.getAppointments().subscribe((res) => {
      let tmpAppointment: any[] = [];
      res.forEach((element) => {
        if (element['uid'] == this.uid) {
          tmpAppointment.push(element);
        }
      });

      this.appointments = tmpAppointment;
    });
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

    this.dataService.addAppontment(newAppointment);
    this.appointments = [];
    this.modal.dismiss();
    loading.dismiss();
  }

  async updateUserAppointment(appointment: any) {
    console.log(appointment, 'test appointment');
  }

  doSomething() {
    console.log('Hello World Appointment Page!');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    await loading.present();
    await loading.onDidDismiss();
    this.modal.dismiss();
  }

  async cancelAppointment() {
    const alert = await this.alertCtrl.create({
      header: 'Cancel Appoinment',
      message: 'Do you want to cancel your appointment?',
      buttons: ['OK', 'Cancel'],
    });

    await alert.present();
  }
}
