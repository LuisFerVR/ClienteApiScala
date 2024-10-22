import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    {
        path: '',
        component: HeaderComponent
    },
    {
        path: 'equipo',
        loadComponent:()=>import('./club-list/club/club.component').then(m=>m.ClubComponent)
    },
    {
        path: 'jugador',
        loadComponent:()=>import('./club-list/club/club.component').then(m=>m.ClubComponent)
    },
    {
        path: 'torneo',
        loadComponent:()=>import('./club-list/club/club.component').then(m=>m.ClubComponent)
    }
];
