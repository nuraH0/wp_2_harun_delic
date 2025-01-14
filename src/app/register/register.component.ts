import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  register() {
    if (this.username && this.password && this.email) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((user: any) => user.username === this.username);
      if (userExists) {
        this.errorMessage = 'Username already exists';
      } else {
        users.push({ username: this.username, password: this.password, email: this.email });
        localStorage.setItem('users', JSON.stringify(users));
        this.router.navigate(['/login']);
      }
    } else {
      this.errorMessage = 'All fields are required';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
