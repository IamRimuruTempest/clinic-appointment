import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { NotificationPageModule } from './notification/notification.module';
const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'notification',
        component: NotificationPageModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
