import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {
  movies = [
    { title: 'The Shawshank Redemption', description: 'Two imprisoned men form a deep friendship...', genre: 'Drama', releaseDate: '2024-12-23', showDescription: false },
    { title: 'The Godfather', description: 'The aging patriarch of an organized crime dynasty...', genre: 'Crime, Drama', releaseDate: '2024-12-24', showDescription: false },
    { title: 'The Dark Knight', description: 'When the menace known as The Joker...', genre: 'Action, Crime, Drama', releaseDate: '2024-12-18', showDescription: false },
    { title: 'Forrest Gump', description: 'The presidencies of Kennedy and Johnson...', genre: 'Drama, Romance', releaseDate: '2024-12-06', showDescription: false },
    { title: 'Inception', description: 'A thief who enters the dreams of others...', genre: 'Action, Adventure, Sci-Fi', releaseDate: '2024-12-16', showDescription: false },
    { title: 'The Matrix', description: 'A computer hacker learns from mysterious rebels...', genre: 'Action, Sci-Fi', releaseDate: '2024-12-31', showDescription: false },
    { title: 'The Lion King', description: 'Lion prince Simba and his father...', genre: 'Animation, Adventure, Drama', releaseDate: '2024-12-24', showDescription: false },
    { title: 'Schindler\'s List', description: 'In German-occupied Poland during World War II...', genre: 'Biography, Drama, History', releaseDate: '2024-12-15', showDescription: false },
    { title: 'The Lord of the Rings: The Return of the King', description: 'Gandalf and Aragorn lead the World of Men...', genre: 'Action, Adventure, Drama', releaseDate: '2024-12-17', showDescription: false },
    { title: 'Fight Club', description: 'An insomniac office worker...', genre: 'Drama', releaseDate: '2024-12-15', showDescription: false },
    { title: 'Pulp Fiction', description: 'The lives of two mob hitmen...', genre: 'Crime, Drama', releaseDate: '2024-12-14', showDescription: false },
    { title: 'The Prestige', description: 'Two magicians engage in a bitter rivalry...', genre: 'Drama, Mystery, Sci-Fi', releaseDate: '2024-12-20', showDescription: false },
    { title: 'The Departed', description: 'An undercover cop and a mole...', genre: 'Crime, Drama, Thriller', releaseDate: '2024-12-06', showDescription: false },
    { title: 'Goodfellas', description: 'The story of Henry Hill...', genre: 'Biography, Crime, Drama', releaseDate: '2024-12-19', showDescription: false },
    { title: 'The Green Mile', description: 'A supernatural tale set on death row...', genre: 'Crime, Drama, Fantasy', releaseDate: '2024-12-10', showDescription: false },
    { title: 'Interstellar', description: 'A team of explorers travel through a wormhole...', genre: 'Adventure, Drama, Sci-Fi', releaseDate: '2024-12-07', showDescription: false },
    { title: 'The Wolf of Wall Street', description: 'A New York stockbroker refuses...', genre: 'Biography, Comedy, Crime', releaseDate: '2024-12-25', showDescription: false },
    { title: 'Se7en', description: 'Two detectives hunt a serial killer...', genre: 'Crime, Drama, Mystery', releaseDate: '2024-12-22', showDescription: false },
    { title: 'Gladiator', description: 'A betrayed Roman general seeks revenge...', genre: 'Action, Adventure, Drama', releaseDate: '2024-12-05', showDescription: false },
    { title: 'City of God', description: 'In the slums of Rio, two kids\' lives...', genre: 'Crime, Drama', releaseDate: '2024-12-08', showDescription: false }
  ];

  filteredMovies = [...this.movies]; // Inicijalno prikazuje sve filmove
  searchQuery = ''; // Pretraga po naslovu
  showSortOptions = false;

  constructor(public authService: AuthService) {}

  toggleDescription(movie: any) {
    movie.showDescription = !movie.showDescription;
  }

  toggleSortOptions() {
    this.showSortOptions = !this.showSortOptions;
  }

  sortByGenre() {
    this.filteredMovies.sort((a, b) => a.genre.localeCompare(b.genre));
  }

  sortByReleaseDate() {
    this.filteredMovies.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }

  filterByDate(event: Event) {
    const input = event.target as HTMLInputElement;
    const date = input?.value;
    if (date) {
      this.filteredMovies = this.movies.filter(movie => movie.releaseDate === date);
    } else {
      this.filteredMovies = [...this.movies];
    }
  }

  filterMoviesByTitle() {
    if (this.searchQuery) {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredMovies = [...this.movies]; // Vraća sve filmove ako je pretraga prazna
    }
  }
}