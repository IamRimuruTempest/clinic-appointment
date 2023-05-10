import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { UpdateInformationComponent } from './update-information/update-information.component';
@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openUpdateInformationComponent() {
    const modal = await this.modalCtrl.create({
      component: UpdateInformationComponent,
    });

    return await modal.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}