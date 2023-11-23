import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SystemAdministratorHomeComponent } from './system-administrator-home/system-administrator-home.component';
import { SystemAdministratorAppealsComponent } from './system-administrator-appeals/system-administrator-appeals.component';
import { SystemAdministratorCompanyAdministratorAppealsComponent } from './system-administrator-company-administrator-appeals/system-administrator-company-administrator-appeals.component';

@NgModule({
  declarations: [SystemAdministratorHomeComponent, SystemAdministratorAppealsComponent, SystemAdministratorCompanyAdministratorAppealsComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class SystemAdministratorModule {}
