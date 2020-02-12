﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];

export const appRoutingModule = RouterModule.forRoot(routes);