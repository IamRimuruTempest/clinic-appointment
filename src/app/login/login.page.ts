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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  errorMessage: string = '';

  errorMessages = {
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
    private alertCtrl: AlertController
  ) {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  async onSubmit(values: { email: string; password: string }) {
    if (this.formGroup.invalid) {
      console.log('Invalid form');
      return;
    }
    const loading = await this.loadingCtrl.create();
    await loading.present();
    console.log(values);
    this.authService
      .login(values.email, values.password)
      .then(async (user) => {
        if (user) {
          // Success login
          loading.dismiss();
          this.router.navigate(['home']);
        } else {
          console.log('Error');
        }
      })
      .catch(async (err) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Login failed',
          message: err.message,
          buttons: ['OK'],
        });
        await alert.present();
      });
  }
}
