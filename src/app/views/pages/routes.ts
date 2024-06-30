import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'drivers',
    loadComponent: () => import('./driver-list/driver-list.component').then(m => m.DriverListComponent),
    data: {
      title: 'Conductores'
    }
  },
  {
    path: 'drivers/create',
    loadComponent: () => import('./driver-form/driver-form.component').then(m => m.DriverFormComponent),
    data: {
      title: 'Conductor'
    }
  },
  {
    path: 'drivers/:id',
    loadComponent: () => import('./driver-form/driver-form.component').then(m => m.DriverFormComponent),
    data: {
      title: 'Conductor'
    }
  },
  {
    path: 'owners',
    loadComponent: () => import('./owner-list/owner-list.component').then(m => m.OwnerListComponent),
    data: {
      title: 'Propietarios'
    }
  },
  {
    path: 'owners/create',
    loadComponent: () => import('./owner-form/owner-form.component').then(m => m.OwnerFormComponent),
    data: {
      title: 'Conductor'
    }
  },
  {
    path: 'owners/:id',
    loadComponent: () => import('./owner-form/owner-form.component').then(m => m.OwnerFormComponent),
    data: {
      title: 'Conductor'
    }
  },
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  }
];
