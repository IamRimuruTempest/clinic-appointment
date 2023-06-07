import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceModalComponent } from './service-modal/service-modal.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: ServiceModalComponent,
      componentProps: {},
    });
    modal.present();
  }
}
