import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentPageRoutingModule } from './appointment-routing.module';

import { AppointmentPage } from './appointment.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { InsertAppointmentComponent } from './insert-appointment/insert-appointment.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppointmentPageRoutingModule,
    ComponentsModule,
    InsertAppointmentComponent,
  ],
  declarations: [AppointmentPage],
})
export class AppointmentPageModule {}
