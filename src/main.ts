import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { MoviesComponent } from './app/movies/movies.component';
import { RegisterComponent } from './app/register/register.component';
import { authGuard } from './app/auth.guard';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent }, 
      { path: 'register', component: RegisterComponent },
      { path: 'movies', component: MoviesComponent, canActivate: [authGuard] },
    ]),
    FormsModule
  ],
});
