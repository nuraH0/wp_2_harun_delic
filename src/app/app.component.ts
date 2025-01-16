import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';  
import { CommonModule } from '@angular/common'; 
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from './theme.service'; // Importuj ThemeService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <app-navbar *ngIf="isLoggedIn()"></app-navbar>
    <router-outlet></router-outlet>
    <app-footer *ngIf="isMoviesPage"></app-footer> 

    <!-- Toggle switch za tamni/svijetli mod -->
    <div class="toggle-container">
      <label class="switch">
        <input type="checkbox" (change)="toggleTheme($event)" [checked]="isDarkMode" />
        <span class="slider"></span>
      </label>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMoviesPage = false;
  isDarkMode = false; // Inicijalno stanje teme

  constructor(private router: Router, private themeService: ThemeService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isMoviesPage = event.urlAfterRedirects === '/movies';
      }
    });
  }

  ngOnInit(): void {
    // Učitaj trenutnu temu prilikom inicijalizacije
    this.themeService.loadCurrentTheme();
    this.isDarkMode = document.body.classList.contains('dark-mode');
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';  // Provjera statusa prijave
  }

  // Metoda za prebacivanje između tamnog i svijetlog moda
  toggleTheme(event: any): void {
    this.isDarkMode = event.target.checked; // Ažuriraj stanje teme prema preklopniku
    this.themeService.toggleDarkMode(this.isDarkMode);
  }
}
