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
import { firstValueFrom } from 'rxjs';
import { UserRole } from '../enums/user-role.enum';

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
    try {
      const user = await this.authService.login(values.email, values.password);
      if (!user) {
        console.log('Error');
        return;
      }
      const account = await firstValueFrom(this.authService.userAccount$);

      // Success login
      switch (account?.role) {
        case UserRole.STUDENT:
          this.router.navigate(['home']);
          break;
        case UserRole.ADMIN:
          this.router.navigate(['admin']);
          break;
        default:
          this.router.navigate(['home']);
      }
      loading.dismiss();
    } catch (ex: any) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Login failed',
        message: ex.message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
