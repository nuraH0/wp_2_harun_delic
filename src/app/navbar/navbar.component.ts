import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMoviesPage: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {
    // Provera da li je trenutna stranica "movies"
    this.router.events.subscribe(() => {
      this.isMoviesPage = this.router.url.includes('movies');
    });
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }

  isLoggedIn() {
    return this.authService.isLoggedIn(); 
  }
}
