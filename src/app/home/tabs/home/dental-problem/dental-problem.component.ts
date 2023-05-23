import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  standalone: true,
  imports: [CommonModule, IonicModule],
  selector: 'app-dental-problem',
  templateUrl: './dental-problem.component.html',
  styleUrls: ['./dental-problem.component.scss'],
})
export class DentalProblemComponent implements OnInit {
  title: any;
  dentalProblem: any;
  content: any;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
