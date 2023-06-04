import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './search-page-component/hamburger.css',
    './search-page-component/search-page.component.css',
  ],
})
export class AppComponent {
  title = 'weather-app';
  constructor(private modalService: NgbModal, private router: Router) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  isOpen: boolean = false;

  toggleNav() {
    this.isOpen = !this.isOpen;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
