import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'appointments',
      },
      {
        path: 'appointments',
        loadChildren: () =>
          import('./tabs/appointments/appointments.module').then(
            (m) => m.AppointmentsPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./tabs/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./tabs/inventory/inventory.module').then(
            (m) => m.InventoryPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
