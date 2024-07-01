import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userisAuthenticated = false;
  private authListenerSubs!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userisAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userisAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {}
}
