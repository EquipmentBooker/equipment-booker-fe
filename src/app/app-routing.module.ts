import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';
import { RegistrationComponent } from './modules/pages/registration/registration.component';
import { RegisteredUserHomeComponent } from './modules/registered-user/registered-user-home/registered-user-home.component';
import { AuthGuardService } from './modules/hospital/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'registered-user',
    component: RegisteredUserHomeComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_REGISTERED_USER'] },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
