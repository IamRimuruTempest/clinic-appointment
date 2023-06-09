import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./tabs/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'radio',
        loadChildren: () =>
          import('./tabs/radio/radio.module').then((m) => m.RadioPageModule),
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./tabs/library/library.module').then(
            (m) => m.LibraryPageModule
          ),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./tabs/search/search.module').then((m) => m.SearchPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
