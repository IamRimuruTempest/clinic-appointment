import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterValidators } from 'src/app/validators/password.validator';
import { firstValueFrom } from 'rxjs';
import { UserAccount } from 'src/app/interfaces/user-account.model';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {
  old_password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);
  new_password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);
  confirm_password = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);

  errorMessages = {
    password: {
      required: 'Password is required.',
      minlength: 'Must be at least 8 characters long.',
    },
    new_password: {
      required: 'New password is required.',
      minlength: 'Must be at least 8 characters long.',
    },
    confirm_password: {
      required: 'Confirm password is required.',
      minlength: 'Must be at least 8 characters long.',
      noMatch: 'Passwords do not match.',
    },
  };
  formGroup: FormGroup;

  errorMessage: string = '';

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {
    this.formGroup = this.createForm();
  }

  ngOnInit() {}

  cancel() {
    this.modalCtrl.dismiss();
  }

  createForm() {
    const matchingPasswordGroup = new FormGroup(
      {
        new_password: this.new_password,
        confirm_password: this.confirm_password,
      },
      [RegisterValidators.match('new_password', 'confirm_password')]
    );

    return this.formBuilder.group({
      old_password: this.old_password,
      matchingPasswordGroup,
    });
  }

  async submit(values: {
    old_password: string;
    matchingPasswordGroup: {
      new_password: string;
      confirm_password: string;
    };
  }) {
    console.log(values);
    const user: UserAccount | null = await firstValueFrom(
      this.authService.userAccount$
    );
    if (!user) return;

    try {
      await this.authService.login(user.email!, values.old_password);
      await this.authService.changePassword(
        values.matchingPasswordGroup.new_password
      );
      await this.presentAlert();
      this.modalCtrl.dismiss();
    } catch (err: any) {
      this.handleError(err);
    }
  }

  handleError(err: any) {
    switch (err.code) {
      case 'auth/wrong-password':
        this.errorMessage = 'Wrong password, please try again.';
        break;
      default:
        this.errorMessage = err.message;
    }
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: 'Password has been updated!',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
