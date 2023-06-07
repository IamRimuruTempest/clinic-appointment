import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServiceModalComponent } from './service-modal/service-modal.component';
import { DataService } from 'src/app/services/data.service';
import { Service } from 'src/app/interfaces/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  services$: Observable<Service[]>;
  constructor(
    private modalCtrl: ModalController,
    private dataService: DataService
  ) {
    this.services$ = this.dataService.getAllServices();
  }

  ngOnInit() {}

  async openAddModal() {
    const modal = await this.modalCtrl.create({
      component: ServiceModalComponent,
      componentProps: {},
    });
    modal.present();
  }

  async viewService(service: Service) {}

  async updateService(service: Service) {}
}
