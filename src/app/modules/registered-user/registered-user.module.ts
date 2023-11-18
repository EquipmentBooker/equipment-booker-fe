import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { RegisteredUserHomeComponent } from './registered-user-home/registered-user-home.component';
import { RegisteredUserCompanyDetailsComponent } from './registered-user-company-details/registered-user-company-details.component';

@NgModule({
  declarations: [RegisteredUserHomeComponent, RegisteredUserCompanyDetailsComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class RegisteredUserModule {}
