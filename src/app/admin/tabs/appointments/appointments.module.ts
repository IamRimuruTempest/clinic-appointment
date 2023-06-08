import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentsPageRoutingModule } from './appointments-routing.module';

import { AppointmentsPage } from './appointments.page';
import { UpdateStatusComponent } from './update-status/update-status.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentsPageRoutingModule,
    UpdateStatusComponent,
  ],
  declarations: [AppointmentsPage],
  exports: [UpdateStatusComponent],
})
export class AppointmentsPageModule {}
