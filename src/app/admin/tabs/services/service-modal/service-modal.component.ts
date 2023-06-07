import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss'],
})
export class ServiceModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async closeModal() {
    this.modalCtrl.dismiss();
  }
}
