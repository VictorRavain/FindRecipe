import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loginComponent } from './login/login.component';
import { signupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: loginComponent },
    { path: 'signup', component: signupComponent },
];
