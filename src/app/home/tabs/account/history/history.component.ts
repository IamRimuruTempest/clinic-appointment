import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Auth } from '@angular/fire/auth';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  type: string = 'all';

  uid: string = '';
  recentAppointments: any[] = [];
  canceledAppointments: any[] = [];

  constructor(
    private dataService: DataService,
    private auth: Auth,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.uid = this.auth.currentUser?.uid!;
    this.getRecentAppointments();
    this.getCanceledAppointments();
  }

  getRecentAppointments() {
    this.dataService.getAppointments().subscribe((res) => {
      let tmpRecentAppointments: any[] = [];
      res.forEach((element) => {
        if (element['uid'] == this.uid && element['status'] == 'Finished') {
          tmpRecentAppointments.push(element);
        }
      });

      this.recentAppointments = tmpRecentAppointments;
    });
  }

  getCanceledAppointments() {
    this.dataService.getAppointments().subscribe((res) => {
      let tmpCanceledAppointments: any[] = [];
      res.forEach((element) => {
        if (element['uid'] == this.uid && element['status'] == 'Canceled') {
          tmpCanceledAppointments.push(element);
        }
      });

      this.canceledAppointments = tmpCanceledAppointments;
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
