import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RegistrationComponent } from './registration/registration.component';
import { DeliveryMapComponent } from './delivery-map/delivery-map.component';

@NgModule({
  declarations: [HomeComponent, RegistrationComponent, DeliveryMapComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
})
export class PagesModule {}
