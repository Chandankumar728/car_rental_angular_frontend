import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Storage } from './auth/components/services/storage/storage';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('car_rental_angular');

  get isAdminLoggedIn(): boolean {
    const result = Storage.isAdminLoggedIn();
    console.log('isAdminLoggedIn:', result);
    return result;
  }

  get isCustomer(): boolean {
    const result = Storage.isCustomer();
    console.log('isCustomer:', result);
    return result;
  }

  get isLoggedIn(): boolean {
    return window.localStorage.getItem('token') !== null;
  }

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    // Trigger change detection on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  logout(): void {
    Storage.logout();
    this.router.navigate(['/login']);
  }
    

  

}
  