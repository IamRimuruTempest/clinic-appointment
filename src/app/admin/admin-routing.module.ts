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
        redirectTo: 'home',
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
      {
        path: 'medicine',
        loadChildren: () =>
          import('./tabs/medicine/medicine.module').then(
            (m) => m.MedicinePageModule
          ),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./tabs/services/services.module').then(
            (m) => m.ServicesPageModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./tabs/home/home.module').then((m) => m.HomePageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
