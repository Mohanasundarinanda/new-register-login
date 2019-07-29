import { Routes } from '@angular/router';
import { HomeComponent} from './home/home.component'
import { CustomerListComponent } from './customer-list/customer-list.component'
import { ErrorComponent} from './error.component'
import {MsalGuard} from "@azure/msal-angular";
import {UserDataComponent} from "./user-data/user-data.component";
import { RegistrationComponent } from './registration/registration.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: 'customer', component: CustomerListComponent, canActivate: [MsalGuard] },
  { path: 'regis', component: RegistrationComponent },
  // { path: 'userProfile' ,component: UserDataComponent, canActivate : [MsalGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];




