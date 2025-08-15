export interface IMenu {
  label: string;
  route: string;
}

export const MENU: IMenu[] = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Repository',
    route: '/repository',
  },
  {
    label: 'Simplexity',
    route: '/simplexity',
  },
];

export type TRoute = (typeof MENU)[number]['route'];
