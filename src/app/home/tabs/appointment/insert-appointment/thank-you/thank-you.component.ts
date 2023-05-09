import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async closeThankYouComponent() {
    const loading = await this.loadingCtrl.create({ duration: 2000 });
    await loading.present();
    loading.dismiss();
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
