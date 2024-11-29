import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isMobileView: boolean = false;  // Controls when to show the burger icon
  selectedOption: string = 'Ingrédients';  // Default selected 
  alternativeOption: string = 'Recettes';  // Default alternative option
  isDropdownOpen: boolean = false;
  placeholder: string = "Ajoutez un ingrédient";

  constructor() {
    this.checkWindowWidth(); // Check initial window width
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth(); // Update on window resize
  }

  // Closes the dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    // Close the dropdown if the click is outside of the button or dropdown
    if (!targetElement.closest('.button-container') && !targetElement.closest('.select-menu')) {
      this.isDropdownOpen = false;
    }
  }

  // (Optional) Close the dropdown if the window loses focus
  @HostListener('window:blur')
  onWindowBlur() {
    this.isDropdownOpen = false;
  }

  // Toggles the dropdown visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Sets the selected option and updates the alternative option
  selectOption(option: string) {
    this.selectedOption = option;
    this.placeholder = option === "Ingrédients" ? "Ajoutez un ingrédient" :" Rechercher une recette";
    this.alternativeOption = option === 'Ingrédients' ? 'Recettes' : 'Ingrédients';
    this.isDropdownOpen = false;
  }

  // Function to check window width and determine mobile view
  private checkWindowWidth() {
    this.isMobileView = window.innerWidth < 768; // Adjust the width as needed
  }
}
