import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryPageRoutingModule } from './inventory-routing.module';

import { InventoryPage } from './inventory.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ViewInventoryComponent } from './view-inventory/view-inventory.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InventoryPage,
    AddInventoryComponent,
    ViewInventoryComponent,
    AddComponent,
  ],
})
export class InventoryPageModule {}
