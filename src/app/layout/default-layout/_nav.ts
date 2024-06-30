import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Conductores',
    url: '/pages/drivers',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Propietarios',
    url: '/pages/owners',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Vehiculos',
    url: '/pages/vehicles',
    iconComponent: { name: 'cil-list' },
  }
];
