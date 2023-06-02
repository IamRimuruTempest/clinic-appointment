import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';
@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  uid: string = '';
  notifications: any;
  constructor(
    private modalCtrl: ModalController,
    private auth: Auth,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.uid = this.auth.currentUser?.uid!;
    this.dataService
      .getUserNotifications(this.uid)
      .subscribe(
        (res) => (
          (this.notifications = res),
          console.log(this.notifications, 'test notifications')
        )
      );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
