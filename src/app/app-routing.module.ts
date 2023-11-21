import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';
import { RegistrationComponent } from './modules/pages/registration/registration.component';
import { RegisteredUserHomeComponent } from './modules/registered-user/registered-user-home/registered-user-home.component';
import { AuthGuardService } from './modules/hospital/services/auth-guard.service';
import { CompanyAdministratorHomeComponent } from './modules/company-administrator/company-administrator-home/company-administrator-home.component';
import { RegisteredUserCompanyDetailsComponent } from './modules/registered-user/registered-user-company-details/registered-user-company-details.component';
import { RegisteredUserScheduledTermsComponent } from './modules/registered-user/registered-user-scheduled-terms/registered-user-scheduled-terms.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'registered-user',
    component: RegisteredUserHomeComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_REGISTERED_USER'] },
  },
  {
    path: 'registered-user/company/:companyId',
    component: RegisteredUserCompanyDetailsComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_REGISTERED_USER'] },
  },
  {
    path: 'registered-user/scheduled-terms',
    component: RegisteredUserScheduledTermsComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_REGISTERED_USER'] },
  },
  {
    path: 'company-administrator',
    component: CompanyAdministratorHomeComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_COMPANY_ADMINISTRATOR'] },
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
