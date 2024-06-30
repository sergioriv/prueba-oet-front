import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Vehiculos',
    url: '/vehicles',
    iconComponent: { name: 'cil-notes' },
  },
  {
    name: 'Conductores',
    url: '/drivers',
    iconComponent: { name: 'cil-people' },
  },
  {
    name: 'Propietarios',
    url: '/owners',
    iconComponent: { name: 'cil-people' },
  }
];
