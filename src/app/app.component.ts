import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';  
import { CommonModule } from '@angular/common'; 
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <app-navbar *ngIf="isLoggedIn()"></app-navbar>
    <router-outlet></router-outlet>
    <app-footer *ngIf="isMoviesPage"></app-footer> 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMoviesPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isMoviesPage = event.urlAfterRedirects === '/movies';
      }
    });
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
