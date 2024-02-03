import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { RegisteredUserHomeComponent } from './registered-user-home/registered-user-home.component';
import { RegisteredUserCompanyDetailsComponent } from './registered-user-company-details/registered-user-company-details.component';
import { RegisteredUserScheduledTermsComponent } from './registered-user-scheduled-terms/registered-user-scheduled-terms.component';
import { RegisteredUserCreateAppealComponent } from './registered-user-create-appeal/registered-user-create-appeal.component';
import { RegisteredUserCompanyAdministratorAppealsComponent } from './registered-user-company-administrator-appeals/registered-user-company-administrator-appeals.component';
import { RegisteredUserAppealAnswersComponent } from './registered-user-appeal-answers/registered-user-appeal-answers.component';

@NgModule({
  declarations: [RegisteredUserHomeComponent, RegisteredUserCompanyDetailsComponent, RegisteredUserScheduledTermsComponent, RegisteredUserCreateAppealComponent, RegisteredUserCompanyAdministratorAppealsComponent, RegisteredUserAppealAnswersComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class RegisteredUserModule {}
