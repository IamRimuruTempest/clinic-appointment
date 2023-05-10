import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertController,
  IonicModule,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { Inventory } from 'src/app/interfaces/inventory.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class AddInventoryComponent implements OnInit {
  errorMessages = {
    name: {
      required: 'Name is required.',
    },
    description: {
      required: 'Description is required.',
    },
    quantity: {
      required: 'Quantity is required.',
    },
  };
  formGroup!: FormGroup;
  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  quantity = new FormControl('', [
    Validators.required,
    Validators.maxLength(4),
  ]);

  constructor(
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastCtrl: ToastController
  ) {
    this.formGroup = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      name: this.name,
      description: this.description,
      quantity: this.quantity,
    });
  }

  ngOnInit() {}

  async onSubmit(values: Inventory) {
    console.log(values);

    const loading = await this.loadingCtrl.create();
    await loading.present();

    try {
      await this.dataService.addInventory({ ...values });
      loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: 'Successfully added inventory.',
        duration: 3000,
      });
      await toast.present();
      this.modalCtrl.dismiss();
    } catch (ex: any) {
      loading.dismiss();

      const alert = await this.alertCtrl.create({
        header: 'Add failed',
        message: ex.message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
