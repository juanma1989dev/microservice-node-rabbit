import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main/main-layout-component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/products/list/component').then((m) => m.ListProductsComponent),
      },
      {
        path: 'product/edit/:id',
        loadComponent: () =>
          import('./pages/products/show/component').then((m) => m.EditProductComponent),
      },
    ],
  },
];
