import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import * as olCoordinate from 'ol/coordinate';
import MapBrowserEvent from 'ol/MapBrowserEvent';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  public newRegisteredUser: RegisteredUser = new RegisteredUser();
  public confirmPassword: string = '';
  public isConfirmIconShown: boolean = false;
  public isErrorIconShown: boolean = false;
  private map!: Map;

  constructor(
    private registeredUserService: RegisteredUserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const baseLayer = new TileLayer({
      source: new OSM(),
    });

    this.map = new Map({
      target: 'map',
      layers: [baseLayer],
      view: new View({
        center: olProj.fromLonLat([20.586622970513595, 44.40675082316616]),
        zoom: 4,
      }),
    });

    this.map.on('click', (event) => {
      this.onMapClick(event);
    });
  }

  private onMapClick(event: MapBrowserEvent<any>): void {
    const coordinate = this.map.getEventCoordinate(event.originalEvent);
    const lonLat = olProj.toLonLat(coordinate);
    this.newRegisteredUser.address.longitude = lonLat[0];
    this.newRegisteredUser.address.latitude = lonLat[1];
  }

  public handleConfirmPassword() {
    if (this.newRegisteredUser.password === this.confirmPassword) {
      this.isConfirmIconShown = true;
      this.isErrorIconShown = false;
    } else if (this.newRegisteredUser.password !== this.confirmPassword) {
      this.isConfirmIconShown = false;
      this.isErrorIconShown = true;
    }
  }

  public handleNewUser() {
    if (this.validateRegistrationForm()) {
      this.registeredUserService
        .createRegisteredUser(this.newRegisteredUser)
        .subscribe((res) => {
          this.toastr.success(
            'User created successfully.\n Confirmation link is sent to your e-mail.',
            'Success'
          );
          this.router.navigate(['/']);
        });
    } else {
      this.toastr.error('Please, fill in all fields.', 'Error');
    }

    return;
  }

  public validateRegistrationForm() {
    if (
      this.newRegisteredUser.name !== '' &&
      this.newRegisteredUser.surname !== '' &&
      this.newRegisteredUser.email !== '' &&
      this.newRegisteredUser.password !== '' &&
      this.newRegisteredUser.phoneNumber !== '' &&
      this.newRegisteredUser.companyInfo !== '' &&
      this.newRegisteredUser.profession !== '' &&
      this.newRegisteredUser.address.street !== '' &&
      this.newRegisteredUser.address.number !== '' &&
      this.newRegisteredUser.address.city !== '' &&
      this.newRegisteredUser.address.country !== '' &&
      this.newRegisteredUser.address.longitude !== 0 &&
      this.newRegisteredUser.address.latitude !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
