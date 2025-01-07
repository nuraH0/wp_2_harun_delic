import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/']); 
  }

  isLoggedIn() {
    return this.authService.isLoggedIn(); 
  }
}
