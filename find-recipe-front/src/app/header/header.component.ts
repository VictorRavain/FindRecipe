import { Component, HostListener  } from '@angular/core';
import { RouterLink } from '@angular/router';
import { loginComponent } from '../login/login.component';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, loginComponent,InscriptionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen: boolean = false;  // Controls whether the burger menu is open
  isMobileView: boolean = false;  // Controls when to show the burger icon
  isLoginModalOpen = false; 
  isSignupModalOpen = false;

  openLoginModal() {
    this.isLoginModalOpen = true;
    this.isSignupModalOpen = false; // Close signup modal if it's open
  }

  openSignupModal() {
    this.isSignupModalOpen = true;
    this.isLoginModalOpen = false; // Close login modal if it's open
  }

  closeModal() {
    this.isLoginModalOpen = false;
    this.isSignupModalOpen = false;
  }

  constructor() {
    this.checkWindowWidth(); // Check initial window width
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth(); // Update on window resize
  }

  // Function to toggle the burger menu
  onBurgerClick() {
    this.isOpen = !this.isOpen;
  }

  // Function to check window width and determine mobile view
  private checkWindowWidth() {
    this.isMobileView = window.innerWidth < 768; // Adjust the width as needed
  }
}
