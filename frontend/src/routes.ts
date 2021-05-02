import { lazy } from 'react';

export const HOME = '/';
export const LATEST_LAUNCHES = '/latest-launches';
export const UPCOMING_LAUNCHES = '/upcoming-launches';
export const PAST_LAUNCHES = '/past-launch';

const HomePage = lazy(() => import('./home'));
const LatestLaunchesPage = lazy(() => import('./latest-launches'));
const UpcomingLaunchesPage = lazy(() => import('./upcoming-launches'));
const PastLaunchesPage = lazy(() => import('./past-launches'));

export const routes: {
  id: number;
  title: string;
  url: string;
  children: any
}[] = [
  {
    id: 1,
    title: 'HOME',
    url: HOME,
    children: HomePage
  },
  {
    id: 2,
    title: 'LATEST LAUNCHE',
    url: LATEST_LAUNCHES,
    children: LatestLaunchesPage
  },
  {
    id: 3,
    title: 'UPCOMING LAUNCHES',
    url: UPCOMING_LAUNCHES,
    children: UpcomingLaunchesPage
  },
  {
    id: 4,
    title: 'PAST LAUNCHES',
    url: PAST_LAUNCHES,
    children: PastLaunchesPage
  },
]
