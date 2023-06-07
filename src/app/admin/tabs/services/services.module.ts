import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPageRoutingModule } from './services-routing.module';

import { ServicesPage } from './services.page';
import { ServiceModalComponent } from './service-modal/service-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [ServicesPage, ServiceModalComponent],
})
export class ServicesPageModule {}
