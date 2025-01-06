import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Add CommonModule and FormsModule
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movie = {
    title: '',
    genre: '',
    releaseDate: '',
    description: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  addMovie() {
    console.log('Movie added:', this.movie);
  }
}
