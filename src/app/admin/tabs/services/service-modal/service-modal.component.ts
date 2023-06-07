import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Service } from 'src/app/interfaces/service.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss'],
})
export class ServiceModalComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.minLength(5)]);
  description = new FormControl('', [
    Validators.required,
    Validators.minLength(20),
  ]);
  price = new FormControl(0, [Validators.required, Validators.min(0)]);
  formGroup = new FormGroup({
    name: this.name,
    description: this.description,
    price: this.price,
  });
  errorMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Should be at least 5 characters long.',
    },
    description: {
      required: 'Description is required.',
      minlength: 'Should be at least 20 characters long.',
    },
    price: {
      required: 'Price is required.',
      min: 'Negative value not allowed.',
    },
  };
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async closeModal() {
    this.modalCtrl.dismiss();
  }
  async submit() {
    const values = this.formGroup.value as Service;
    console.log(values);
    const loading = await this.loadingCtrl.create();
    await loading.present();
    try {
      await this.dataService.addService(values);
      console.log('Success add service');

      const toast = await this.toastCtrl.create({
        message: 'Successfully added service',
        duration: 3000,
      });
      await toast.present();
      this.modalCtrl.dismiss();
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Failed to add service, please try again.',
        duration: 3000,
      });
      await toast.present();
    }
    await loading.dismiss();
  }
}
