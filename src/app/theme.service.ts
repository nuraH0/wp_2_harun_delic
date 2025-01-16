// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Ovaj servis je globalno dostupan u aplikaciji
})
export class ThemeService {

  constructor() {}

  // Metoda za prebacivanje između tamnog i svijetlog moda
  toggleDarkMode(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.body.classList.add('dark-mode'); // Aktivira dark mode
      localStorage.setItem('theme', 'dark'); // Spremi temu u localStorage
    } else {
      document.body.classList.remove('dark-mode'); // Deaktivira dark mode
      localStorage.setItem('theme', 'light'); // Spremi temu u localStorage
    }
  }

  // Metoda za učitavanje trenutne teme (ako je prethodno spremljena)
  loadCurrentTheme(): void {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode'); // Primijeni dark mode ako je spremljeno
    }
  }
}
