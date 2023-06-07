import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPageRoutingModule } from './services-routing.module';

import { ServicesPage } from './services.page';
import { ServiceModalComponent } from './service-modal/service-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ServicesPageRoutingModule],
  declarations: [ServicesPage, ServiceModalComponent],
})
export class ServicesPageModule {}
