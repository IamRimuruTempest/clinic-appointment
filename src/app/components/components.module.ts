import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [InputComponent, SelectComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [InputComponent, SelectComponent],
})
export class ComponentsModule {}
