import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'equipo',
        loadComponent:()=>import('./club-list/club/club.component').then(m=>m.ClubComponent)
    },
    {
        path: 'jugador',
        loadComponent:()=>import('./jugador/jugador.component').then(m=>m.JugadorComponent)
    },
    {
        path:'torneo',
        loadComponent:()=>import('./tournament-list/tournament-list.component').then(m=>m.TournamentListComponent)
    },
    {
        path:'**',
        redirectTo:''
    }
];
