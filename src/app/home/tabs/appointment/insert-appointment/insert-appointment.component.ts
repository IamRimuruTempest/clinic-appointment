import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { UserAccount } from 'src/app/interfaces/user-account.model';
import { formatISO } from 'date-fns';
import { UserRole } from 'src/app/enums/user-role.enum';
import { SelectOption } from 'src/app/interfaces/select-option.model';
import { Service } from 'src/app/interfaces/service.model';
import { Timestamp } from '@angular/fire/firestore';

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
export class InsertAppointmentComponent implements OnInit, OnDestroy {
  today = formatISO(new Date());
  serviceOptions: SelectOption[] = [
    {
      text: '',
      value: '',
    },
  ];
  @Input() account: UserAccount = {
    fullname: '',
    age: '',
    gender: '',
    schoolID: '',
    phoneNumber: '',
    course: '',
    college: '',
    role: UserRole.STUDENT,
  };
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
    schedule: {
      required: 'Schedule is required.',
    },
    condition: {
      required: 'Condition is required.',
    },
    service: {
      required: 'Service is required.',
    },
  };

  formGroup!: FormGroup;
  fullname = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required, Validators.maxLength(2)]);
  gender = new FormControl('', [Validators.required]);
  schedule = new FormControl('', [Validators.required]);
  condition = new FormControl('', [Validators.required]);
  service = new FormControl('', [Validators.required]);
  status: string = 'Pending';

  serviceSub: Subscription;
  services: Service[] = [];
  serviceSelected: Service | null = null;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private auth: Auth
  ) {
    this.formGroup = this.createFormGroup();
    console.log(this.today);
    this.serviceSub = this.dataService.getAllServices().subscribe((data) => {
      this.services = data;
      this.serviceOptions = data.map((s) => {
        return {
          value: s.id,
          text: s.name,
        } as SelectOption;
      });
    });
  }

  createFormGroup() {
    return this.formBuilder.group({
      fullname: this.fullname,
      age: this.age,
      gender: this.gender,
      schedule: this.schedule,
      condition: this.condition,
      service: this.service,
    });
  }

  ngOnInit() {
    this.uid = this.auth.currentUser?.uid!;
    console.log(this.title, 'title');

    this.fullname.setValue(this.account.fullname);
    this.age.setValue(this.account.age);
    this.gender.setValue(this.account.gender);

    if (this.title == 'Update' || this.title == 'View') {
      const schedule =
        this.appointment['schedule'] + 'T' + this.appointment['time'];
      this.fullname.setValue(this.appointment['fullName']);
      this.age.setValue(this.appointment['age']);
      this.gender.setValue(this.appointment['gender']);
      this.schedule.setValue(schedule);
      this.condition.setValue(this.appointment['condition']);
      this.service.setValue(this.appointment['service'].id);
      this.status = this.appointment['status'];
    }
  }

  ngOnDestroy(): void {
    this.serviceSub.unsubscribe();
  }

  async onSubmit(values: {
    fullname: string;
    age: number;
    gender: string;
    time: string;
    schedule: string;
    service: Service;
    condition: string;
    uid: string;
  }) {
    values.uid = this.uid;

    const loading = await this.loadingCtrl.create();
    await loading.present();

    const [schedule, time] = values.schedule.split('T');

    const newAppointment: Appointment = {
      fullName: values.fullname,
      age: values.age,
      gender: values.gender,
      time,
      schedule,
      timestamp: Timestamp.fromDate(new Date(values.schedule)),
      condition: values.condition,
      uid: values.uid,
      service: this.serviceSelected!,
      status: this.status,
    };
    console.log(newAppointment);

    if (this.title == 'Insert') {
      this.dataService.addAppontment(newAppointment);
      await this.modalCtrl.dismiss();
      // this.openThankYouComponent();
    } else {
      await this.dataService.updateAppointment(
        newAppointment,
        this.appointment['id']
      );
    }

    loading.dismiss();
  }

  async cancelUserAppointment(appointment: any) {
    appointment.status = 'Canceled';
    const loading = await this.loadingCtrl.create({ duration: 2000 });
    const alert = await this.alertCtrl.create({
      header: 'Cancel Appointment',
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

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  selectedService(serviceId: any) {
    const service = this.services.find((service) => service.id == serviceId);
    if (service) {
      console.log('selected: ', service);
      this.serviceSelected = service;
    }
  }
}
