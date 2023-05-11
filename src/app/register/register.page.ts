import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserCredential } from '@angular/fire/auth';
import { DataService } from '../services/data.service';
import { UserAuth } from '../interfaces/user.model';
import { UserAccount } from '../interfaces/user-account.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  type: string = 'personal';
  errorMessage: string = '';

  errorMessages = {
    fullname: {
      required: 'Full Name is required.',
    },
    age: {
      required: 'Age is required.',
    },
    gender: {
      required: 'Gender is required.',
    },
    schoolID: {
      required: 'School ID is required.',
    },
    phoneNumber: {
      required: 'Phone Number is required.',
    },
    address: {
      required: 'Address is required.',
    },
    course: {
      required: 'Course is required.',
    },
    college: {
      required: 'College is required.',
    },
    email: {
      required: 'Email is required.',
      pattern: 'Please enter a valid email.',
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 8 characters long.',
    },
  };

  formGroup: FormGroup;
  fullname = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required]);
  gender = new FormControl('', [Validators.required]);
  schoolID = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  course = new FormControl('', [Validators.required]);
  college = new FormControl('', [Validators.required]);
  email = new FormControl('test@gmail.com', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
  ]);
  password = new FormControl('Pass123@', [
    Validators.minLength(8),
    Validators.required,
  ]);

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    public router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private dataService: DataService
  ) {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      fullname: this.fullname,
      age: this.age,
      gender: this.gender,
      schoolID: this.schoolID,
      phoneNumber: this.phoneNumber,
      address: this.address,
      course: this.course,
      college: this.college,
      email: this.email,
      password: this.password,
    });
  }

  async onSubmit(values: {
    fullname: string;
    schooldID: string;
    phoneNumber: string;
    address: string;
    course: string;
    college: string;
    age: string;
    gender: string;
    email: string;
    password: string;
  }) {
    if (this.formGroup.invalid) {
      console.log('Invalid form');
      return;
    }
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.authService
      .register(values.email, values.password)
      .then(async (user: UserCredential) => {
        // Success register
        console.log(user);
        const uid = user.user.uid;
        // create user on firestore
        const newUser: UserAccount = {
          uid,
          email: values.email,
          fullname: values.fullname,
          age: values.age,
          gender: values.gender,
          schoolID: values.schooldID,
          phoneNumber: values.phoneNumber,
          address: values.address,
          course: values.course,
          college: values.college,
        };
        await this.dataService.addUser(newUser);
        loading.dismiss();
        this.router.navigate(['home']);
      })
      .catch(async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Register failed',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();
      });
  }
}
