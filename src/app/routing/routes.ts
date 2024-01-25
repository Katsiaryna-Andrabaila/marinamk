import { PageNotFound } from '../../../app/not-found';
import { MainPage } from '../../pages/main';
import { Route } from './types';

export const publicRoutes: Route[] = [
    { path: '/', component: MainPage },
    { path: '/404', component: PageNotFound },
];

export const privateRoutes: Route[] = [
    { path: '/', component: MainPage },
    { path: '/404', component: PageNotFound },
];
