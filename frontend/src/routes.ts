import { lazy } from 'react';

export const HOME = '/';
export const NEXT_LAUNCH = '/next-launches';
export const UPCOMING_LAUNCHES = '/upcoming-launches';
export const LAST_LAUNCH = '/last-launch';
export const LATEST_LAUNCHES = '/latest-launches';

const HomePage = lazy(() => import('./home'))
const UpcomingLaunchesPage = lazy(() => import('./upcoming-launches'));

export const routes: {
  id: number;
  title: string;
  url: string;
  children: () => React.LazyExoticComponent<() => JSX.Element>;
}[] = [
  {
    id: 1,
    title: 'HOME',
    url: HOME,
    children: () => HomePage
  },
  {
    id: 2,
    title: 'PRÓXIMOS LANÇAMENTOS',
    url: UPCOMING_LAUNCHES,
    children: () => UpcomingLaunchesPage
  },
  // {
  //   id: 3,
  //   title: 'ÚLTIMO LANÇAMENTO',
  //   url: LAST_LAUNCH
  // },
  // {
  //   id: 4,
  //   title: 'ÚLTIMOS_LANÇAMENTOS',
  //   url: LATEST_LAUNCHES
  // },
];
