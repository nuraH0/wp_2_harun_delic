import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>&copy; 2025 Ipi Akademija. Sva prava zadržana.</p>
      <p>Kontakt: Harun Delic | Telefon: 123-456-7890</p>
    </footer>
  `,
  styleUrls: ['./footer.component.css']  
})
export class FooterComponent {}
