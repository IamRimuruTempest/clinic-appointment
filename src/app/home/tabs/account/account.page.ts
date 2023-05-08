import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  logoutAccount() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  async openHelpComponent() {
    const modal = await this.modalCtrl.create({
      component: HelpComponent,
    });

    return await modal.present();
  }

  async openAboutComponent() {
    const modal = await this.modalCtrl.create({
      component: AboutComponent,
    });

    return await modal.present();
  }

  async openHistoryComponent() {
    const modal = await this.modalCtrl.create({
      component: HistoryComponent,
    });

    return await modal.present();
  }
}
