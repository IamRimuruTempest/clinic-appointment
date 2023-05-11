import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { InventoryPage } from './inventory.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [InventoryPage, AddInventoryComponent],
})
export class InventoryPageModule {}
