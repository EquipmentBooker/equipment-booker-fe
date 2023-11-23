import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-administrator-home',
  templateUrl: './system-administrator-home.component.html',
  styleUrls: ['./system-administrator-home.component.css'],
})
export class SystemAdministratorHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public handleAppealsClick() {
    this.router.navigate(['/system-administrator/appeals']);
  }

  public handleAdministratorAppealsClick() {
    this.router.navigate([
      '/system-administrator/company-administrator-appeals',
    ]);
  }
}
