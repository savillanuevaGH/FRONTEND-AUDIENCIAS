import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mi-aplicacion';
  showWelcomeMessage: boolean = true; // Variable para controlar si mostrar el mensaje
  
  constructor(private router: Router) {}
  
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  
  toggleSidebar() {
    this.sidenav.toggle(); // Alterna la visibilidad de la barra lateral
  }
  
  navigate(route: string) {
    this.router.navigate([route]);
  }
  ngOnInit() {
    // Suscribirse a los cambios de la ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      // Mostrar el mensaje solo en la ruta principal o la ruta que desees
      this.showWelcomeMessage = this.router.url === '/';
    });
  }
}
