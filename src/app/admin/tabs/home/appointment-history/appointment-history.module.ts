import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentHistoryPageRoutingModule } from './appointment-history-routing.module';

import { AppointmentHistoryPage } from './appointment-history.page';
import { AppointmentsPageModule } from '../../appointments/appointments.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentHistoryPageRoutingModule,
    AppointmentsPageModule,
  ],
  declarations: [AppointmentHistoryPage],
})
export class AppointmentHistoryPageModule {}
