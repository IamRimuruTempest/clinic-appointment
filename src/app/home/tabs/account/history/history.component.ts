import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  type: string = 'all';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
