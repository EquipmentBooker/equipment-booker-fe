import { Component, OnInit } from '@angular/core';
import { RegisteredUser } from '../../hospital/model/registered-user.model';
import { RegisteredUserService } from '../../hospital/services/registered-user.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private registeredUserService: RegisteredUserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

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
        });
      return;
    }

    this.toastr.error('Please, fill in all fields.', 'Error');
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
