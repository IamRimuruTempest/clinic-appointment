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
import { firstValueFrom, take } from 'rxjs';
import { UserRole } from '../enums/user-role.enum';
import { DataService } from '../services/data.service';

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
    private alertCtrl: AlertController,
    private dataService: DataService
  ) {
    this.formGroup = this.createFormGroup();
    this.checkAdmin();
  }

  async checkAdmin() {
    (await this.authService.getAdmin())
      .pipe(take(1))
      .subscribe(async (admins) => {
        if (admins.length == 0) {
          console.log('No Admin found, inserting...');
          const user = await this.authService.register(
            'admin@csuclinic.com',
            'Pass123@'
          );
          const newUser = {
            uid: user.user.uid,
            email: 'admin@csuclinic.com',
            fullname: 'Admin',
            age: '23',
            gender: 'Male',
            schoolID: '999999',
            phoneNumber: '09888876876',
            address: 'Admin Address',
            course: 'BSCS',
            college: 'CICS',
            role: UserRole.ADMIN,
          };
          await this.dataService.addUser(newUser);
          await this.authService.logout();
          console.log('Insert done');
        }
      });
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
