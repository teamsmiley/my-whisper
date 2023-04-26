//src\app\app.component.ts
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  items: MenuItem[];

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {
    this.items = [
      {
        label: 'LOGOUT',
        icon: 'pi pi-power-off',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  ngOnInit() {
    this.auth.user$.subscribe((profile) => {});
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
}
