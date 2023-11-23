import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { CompanyAdministratorHomeComponent } from './company-administrator-home/company-administrator-home.component';

@NgModule({
  declarations: [
    CompanyAdministratorHomeComponent
  ],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class CompanyAdministratorModule {}
