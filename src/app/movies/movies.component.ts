
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Movie {
  title: string;
  genre: string;
  releaseDate: string;
  description: string;
  imageUrl: string;
  showDescription: boolean;
  price: number;
  rating: number;
  comments: { name: string, text: string }[]; 
}

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent {

  cart: Movie[] = [];
  isFormIncomplete = false;
  isCartVisible = false;
  movieAddedMessage: string | null = null;
  showPopup: boolean = false;


  
  movies: Movie[] = [
    { 
      title: 'The Shawshank Redemption', 
      description: 'Two imprisoned men form a deep friendship...', 
      genre: 'Drama', 
      releaseDate: '2024-12-23', 
      showDescription: false, 
      imageUrl: 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg',
      price: this.getRandomPrice(),
      rating: 9.3,
      comments: [{ name: 'John Doe', text: 'A timeless classic!' }]
    },
    { 
      title: 'The Godfather', 
      description: 'The aging patriarch of an organized crime dynasty...', 
      genre: 'Crime, Drama', 
      releaseDate: '2024-12-24', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
      price: this.getRandomPrice(),
      rating: 9.2,
      comments: [{ name: 'Jane Smith', text: 'A masterpiece in cinema!' }]
    },
    { 
      title: 'The Dark Knight', 
      description: 'When the menace known as The Joker...', 
      genre: 'Action, Crime, Drama', 
      releaseDate: '2024-12-18', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/83/Dark_knight_rises_poster.jpg',
      price: this.getRandomPrice(),
      rating: 9.0,
      comments: [{ name: 'Alice Brown', text: 'The best Batman movie!' }]
    },
    { 
      title: 'Forrest Gump', 
      description: 'The presidencies of Kennedy and Johnson...', 
      genre: 'Drama, Romance', 
      releaseDate: '2024-12-06', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg',
      price: this.getRandomPrice(),
      rating: 8.8,
      comments: [{ name: 'Bob White', text: 'Incredibly emotional!' }]
    },
    { 
      title: 'Inception', 
      description: 'A thief who enters the dreams of others...', 
      genre: 'Action, Adventure, Sci-Fi', 
      releaseDate: '2024-12-16', 
      showDescription: false, 
      imageUrl: 'https://play-lh.googleusercontent.com/buKf27Hxendp3tLNpNtP3E-amP0o4yYV-SGKyS2u-Y3GdGRTyfNCIT5WAVs2OudOz6so5K1jtYdAUKI9nw8=w240-h480-rw',
      price: this.getRandomPrice(),
      rating: 8.8,
      comments: [{ name: 'David Green', text: 'Mind-bending and brilliant!' }]
    },
    { 
      title: 'The Matrix', 
      description: 'A computer hacker learns from mysterious rebels...', 
      genre: 'Action, Sci-Fi', 
      releaseDate: '2024-12-31', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
      price: this.getRandomPrice(),
      rating: 8.7,
      comments: [{ name: 'Sarah Clark', text: 'A revolutionary film!' }]
    },
    { 
      title: 'The Lion King', 
      description: 'Lion prince Simba and his father...', 
      genre: 'Animation, Adventure, Drama', 
      releaseDate: '2024-12-24', 
      showDescription: false, 
      imageUrl: 'https://preview.redd.it/official-30th-anniversary-poster-for-the-lion-king-v0-rrb3jwql5z4d1.jpeg?width=640&crop=smart&auto=webp&s=90b2e152e73f072169c9f0049d25ed86962c58db',
      price: this.getRandomPrice(),
      rating: 8.5,
      comments: [{ name: 'Emma Davis', text: 'A beautiful animated classic!' }]
    },
    { 
      title: 'Schindler\'s List', 
      description: 'In German-occupied Poland during World War II...', 
      genre: 'Biography, Drama, History', 
      releaseDate: '2024-12-15', 
      showDescription: false, 
      imageUrl: 'https://m.media-amazon.com/images/I/81+PRmABYGL._AC_SY300_SX300_.jpg',
      price: this.getRandomPrice(),
      rating: 9.0,
      comments: [{ name: 'Michael Harris', text: 'A heartbreaking story of humanity.' }]
    },
    { 
      title: 'The Lord of the Rings: The Return of the King', 
      description: 'Gandalf and Aragorn lead the World of Men...', 
      genre: 'Action, Adventure, Drama', 
      releaseDate: '2024-12-17', 
      showDescription: false, 
      imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_.jpg',
      price: this.getRandomPrice(),
      rating: 8.9,
      comments: [{ name: 'James Allen', text: 'Epic finale to a legendary trilogy!' }]
    },
    { 
      title: 'Fight Club', 
      description: 'An insomniac office worker...', 
      genre: 'Drama', 
      releaseDate: '2024-12-15', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg',
      price: this.getRandomPrice(),
      rating: 8.8,
      comments: [{ name: 'Linda Carter', text: 'A dark and thought-provoking film!' }]
    },
    { 
      title: 'Pulp Fiction', 
      description: 'The lives of two mob hitmen...', 
      genre: 'Crime, Drama', 
      releaseDate: '2024-12-14', 
      showDescription: false, 
      imageUrl: 'https://m.media-amazon.com/images/I/81UTs3sC5hL._AC_UF894,1000_QL80_.jpg',
      price: this.getRandomPrice(),
      rating: 8.9,
      comments: [{ name: 'Chris Martin', text: 'A cinematic masterpiece!' }]
    },
    { 
      title: 'The Prestige', 
      description: 'Two magicians engage in a bitter rivalry...', 
      genre: 'Drama, Mystery, Sci-Fi', 
      releaseDate: '2024-12-20', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg',
      price: this.getRandomPrice(),
      rating: 8.5,
      comments: [{ name: 'William Turner', text: 'A brilliant film with a shocking twist!' }]
    },
    { 
      title: 'The Departed', 
      description: 'An undercover cop and a mole...', 
      genre: 'Crime, Drama, Thriller', 
      releaseDate: '2024-12-06', 
      showDescription: false, 
      imageUrl: 'https://resizing.flixster.com/SRR1Y1vmMEDjfTaWUbad4ue3WT8=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p162564_p_v8_ag.jpg',
      price: this.getRandomPrice(),
      rating: 8.5,
      comments: [{ name: 'Nancy Wilson', text: 'A gripping thriller with top-notch performances.' }]
    },
    { 
      title: 'Goodfellas', 
      description: 'The story of Henry Hill...', 
      genre: 'Biography, Crime, Drama', 
      releaseDate: '2024-12-19', 
      showDescription: false, 
      imageUrl: 'https://resizing.flixster.com/L2rTMze6IaTIK7PoxWwv9D2wcIs=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p12720_v_v13_bc.jpg',
      price: this.getRandomPrice(),
      rating: 8.7,
      comments: [{ name: 'Karen Lee', text: 'A fantastic gangster film with superb acting.' }]
    },
    { 
      title: 'The Green Mile', 
      description: 'A supernatural tale set on death row...', 
      genre: 'Crime, Drama, Fantasy', 
      releaseDate: '2024-12-10', 
      showDescription: false, 
      imageUrl: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501192265/the-green-mile-9781501192265_lg.jpg',
      price: this.getRandomPrice(),
      rating: 8.6,
      comments: [{ name: 'Megan King', text: 'An emotional and touching story.' }]
    },
    { 
      title: 'Interstellar', 
      description: 'A team of explorers travel through a wormhole...', 
      genre: 'Adventure, Drama, Sci-Fi', 
      releaseDate: '2024-12-07', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
      price: this.getRandomPrice(),
      rating: 8.6,
      comments: [{ name: 'Matthew Scott', text: 'A visually stunning and thought-provoking film.' }]
    },
    { 
      title: 'The Wolf of Wall Street', 
      description: 'A New York stockbroker refuses...', 
      genre: 'Biography, Comedy, Crime', 
      releaseDate: '2024-12-25', 
      showDescription: false, 
      imageUrl: 'https://images.squarespace-cdn.com/content/v1/50a838b5e4b0d63ce68736ac/1389571528840-4KN1QLQS3HKF1ZTLTR2R/the_wolf_of_wall_street-620x918.jpg?format=1000w',
      price: this.getRandomPrice(),
      rating: 8.2,
      comments: [{ name: 'Samantha Johnson', text: 'A wild ride through greed and excess!' }]
    },
    { 
      title: 'Se7en', 
      description: 'Two detectives hunt a serial killer...', 
      genre: 'Crime, Drama, Mystery', 
      releaseDate: '2024-12-22', 
      showDescription: false, 
      imageUrl: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/se7en_2.png',
      price: this.getRandomPrice(),
      rating: 8.6,
      comments: [{ name: 'Olivia Harris', text: 'A chilling and unforgettable thriller.' }]
    },
    { 
      title: 'Gladiator', 
      description: 'A betrayed Roman general seeks revenge...', 
      genre: 'Action, Adventure, Drama', 
      releaseDate: '2024-12-05', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Gladiator_II_%282024%29_poster.jpg/220px-Gladiator_II_%282024%29_poster.jpg',
      price: this.getRandomPrice(),
      rating: 8.5,
      comments: [{ name: 'Luke Turner', text: 'A powerful and epic tale of vengeance.' }]
    },
    { 
      title: 'City of God', 
      description: 'In the slums of Rio, two kids\' lives...', 
      genre: 'Crime, Drama', 
      releaseDate: '2024-12-08', 
      showDescription: false, 
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/10/CidadedeDeus.jpg/220px-CidadedeDeus.jpg',
      price: this.getRandomPrice(),
      rating: 8.6,
      comments: [{ name: 'George Walker', text: 'A gripping and raw depiction of life in the slums.' }]
    }
  ];
  

   totalAmount = 0;
  filteredMovies = [...this.movies];
  searchQuery = '';
  showSortOptions = false;
  isModalOpen = false;
  newMovie = { title: '', genre: '', releaseDate: '', description: '', imageUrl: '' };
  selectedMovie: any = null;

  constructor(public authService: AuthService) {}


  // Dodavanje komentara filmu
addComment(movie: Movie, commentText: string) {
  if (!commentText) return;

  const newComment = { name: 'Anonymous', text: commentText };
  movie.comments.push(newComment);
  alert('Komentar je uspešno dodat.');
}


  // Funkcija za random cenu između 10 i 50
  getRandomPrice() {
    return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  }

  addToCart(movie: Movie) {
    this.cart.push(movie);  // Dodajemo film u korpu
    this.totalAmount += movie.price;  // Ažuriramo ukupnu cenu
    this.showPopup = true;  // Prikazujemo pop-up obavijest
    
    // Sakrij pop-up nakon 3 sekunde
    setTimeout(() => {
      this.showPopup = false;
    }, 700);
  }
  

  // Uklanjanje filma iz korpe
  removeFromCart(movie: Movie) {
    const index = this.cart.indexOf(movie);
    if (index > -1) {
      this.cart.splice(index, 1);  // Uklanjamo film iz korpe
      this.totalAmount -= movie.price;  // Ažuriramo ukupnu cenu
    }
  }

  // Pretraga po nazivu filma
  filterMoviesByTitle() {
    if (this.searchQuery) {
      this.filteredMovies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredMovies = [...this.movies];
    }
  }

  // Filtriranje po datumu
  filterByDate(event: Event) {
    const input = event.target as HTMLInputElement;
    const date = input?.value;
    if (date) {
      this.filteredMovies = this.movies.filter(movie => movie.releaseDate === date);
    } else {
      this.filteredMovies = [...this.movies];
    }
  }

  // Sortiranje filmova po žanru
  sortByGenre() {
    this.filteredMovies.sort((a, b) => a.genre.localeCompare(b.genre));
  }

  // Sortiranje filmova po datumu izlaska
  sortByReleaseDate() {
    this.filteredMovies.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }

  // Prikaz ili skrivanje opisa filma
  toggleDescription(movie: any) {
    if (this.selectedMovie === movie) {
      this.selectedMovie = null;
    } else {
      this.selectedMovie = movie;
    }
  }

  // Prikazivanje/sakrivanje opcija za sortiranje
  toggleSortOptions() {
    this.showSortOptions = !this.showSortOptions;
  }

  removeMovie(movie: any): void {
    const confirmed = window.confirm(`Da li ste sigurni da želite obrisati film "${movie.title}"?`);
    if (confirmed) {
      this.movies = this.movies.filter(m => m !== movie); 
      this.filteredMovies = this.filteredMovies.filter(m => m !== movie); 
      alert(`Film "${movie.title}" je obrisan.`);
    }
  }

  // Otvaranje modala za dodavanje filma
  openModal() {
    this.isModalOpen = true;
  }

  
  closeModal() {
    this.isModalOpen = false;
  }

  
  addMovie() {
    // Proverite da li su svi podaci popunjeni
    if (!this.newMovie.title || !this.newMovie.genre || !this.newMovie.releaseDate || !this.newMovie.description || !this.newMovie.imageUrl) {
      this.isFormIncomplete = true;  // Postavite isFormIncomplete na true ako neka polja nisu popunjena
      return;
    }
  
    // Ako su sva polja popunjena, dodajemo film
    this.movies.push({
      ...this.newMovie, 
      showDescription: false, 
      price: this.getRandomPrice(),
      rating: 0,  // Dodajemo podrazumevanu vrednost za rating
      comments: []  // Dodajemo prazan niz za komentare
    });
    this.filteredMovies = [...this.movies];  
    this.closeModal();
    alert(`Film "${this.newMovie.title}" je uspješno dodan.`);
  }
  

  toggleCart() {
    this.isCartVisible = !this.isCartVisible;
  }
}