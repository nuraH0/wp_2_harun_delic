import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(username: string, password: string): boolean {
    // Proveri za admin korisnika
    if (username === 'admin' && password === '1234') {
      const adminUser = { username: 'admin', role: 'admin' };
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userDetails', JSON.stringify(adminUser));
      return true;
    }

    // Proveri za ostale korisnike
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: any) => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userDetails', JSON.stringify(user));
      return true;
    }
    return false; // Prijava neuspješna
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('userDetails') || '{}');
    return user.role === 'admin'; // Provjerava da li je korisnik admin
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userDetails');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserDetails(): { username: string; email: string } | null {
    const userDetails = localStorage.getItem('userDetails');
    return userDetails ? JSON.parse(userDetails) : null;
  }
}
