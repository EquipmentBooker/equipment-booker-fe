import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/pages/home/home.component';
import { RegistrationComponent } from './modules/pages/registration/registration.component';
import { RegisteredUserHomeComponent } from './modules/registered-user/registered-user-home/registered-user-home.component';
import { AuthGuardService } from './modules/hospital/services/auth-guard.service';
import { RegisteredUserCompanyDetailsComponent } from './modules/registered-user/registered-user-company-details/registered-user-company-details.component';
import { RegisteredUserScheduledTermsComponent } from './modules/registered-user/registered-user-scheduled-terms/registered-user-scheduled-terms.component';
import { RegisteredUserCreateAppealComponent } from './modules/registered-user/registered-user-create-appeal/registered-user-create-appeal.component';
import { SystemAdministratorHomeComponent } from './modules/system-administrator/system-administrator-home/system-administrator-home.component';
import { CompanyAdministratorHomeComponent } from './modules/company-administrator/company-administrator-home/company-administrator-home.component';
import { SystemAdministratorAppealsComponent } from './modules/system-administrator/system-administrator-appeals/system-administrator-appeals.component';
import { RegisteredUserCompanyAdministratorAppealsComponent } from './modules/registered-user/registered-user-company-administrator-appeals/registered-user-company-administrator-appeals.component';
import { SystemAdministratorCompanyAdministratorAppealsComponent } from './modules/system-administrator/system-administrator-company-administrator-appeals/system-administrator-company-administrator-appeals.component';

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
    path: 'registered-user/company-appeal',
    component: RegisteredUserCreateAppealComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_REGISTERED_USER'] },
  },
  {
    path: 'registered-user/company-administrator-appeal',
    component: RegisteredUserCompanyAdministratorAppealsComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_REGISTERED_USER'] },
  },
  {
    path: 'company-administrator',
    component: CompanyAdministratorHomeComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_COMPANY_ADMINISTRATOR'] },
  },
  {
    path: 'system-administrator',
    component: SystemAdministratorHomeComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_SYSTEM_ADMINISTRATOR'] },
  },
  {
    path: 'system-administrator/appeals',
    component: SystemAdministratorAppealsComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_SYSTEM_ADMINISTRATOR'] },
  },
  {
    path: 'system-administrator/company-administrator-appeals',
    component: SystemAdministratorCompanyAdministratorAppealsComponent,
    canActivate: [AuthGuardService],
    data: { roles: ['ROLE_SYSTEM_ADMINISTRATOR'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
