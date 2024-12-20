import { RouterLink } from '@angular/router';
import { Component, HostListener  } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { IngredientsService } from '../services/ingredient.service';
import { RecipeService } from '../services/recette.service';
import { NgFor, CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, NgFor, CommonModule, FormsModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  ingredients: any[] = []; // To hold the list of ingredients
  selectedIngredients: any[] = [];
  filteredIngredients: any[] = [];

  recipes: any[] = [];
  selectedRecipe: any[] = [];
  filteredRecipes: any[] = [];

  isMobileView: boolean = false;  // Controls when to show the burger icon

  selectedOption: string = 'Ingrédients';  // Default selected 
  alternativeOption: string = 'Recettes';  // Default alternative option

  isDropdownOpen: boolean = false;
  isListDropdownOpen: boolean = false;
  placeholder: string = "Ajoutez un ingrédient";

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(
    private IngredientsService: IngredientsService,
    private RecipeService: RecipeService,
    private http : HttpClient,
  ) {
    this.checkWindowWidth(); // Check initial window width
    this.loadIngredients();
    this.loadRecipe();
  }

  ngOnInit(): void {
    // Subscribe to the searchSubject and debounce API calls
    this.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
      this.filterQuery(query);
    });
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

  loadIngredients(): void {
    this.IngredientsService.getIngredients().subscribe((data: any[]) => {
      this.ingredients = data;
    });
  }

  // Triggered on every input change
  onSearchQueryChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }

  loadRecipe(): void {
    this.RecipeService.getRecipes().subscribe((data: any[]) => {
      this.recipes = data;
    });
  }

  filterQuery(query: string): void {
    if(this.selectedOption == 'Ingrédients'){
      if (query.trim() === '') {
        this.filteredIngredients = [];
      } else {
        this.filteredIngredients = this.ingredients.filter((ingredient) =>
          ingredient.name.toLowerCase().startsWith(query.toLowerCase())
        );
      }
    }else if(this.selectedOption == 'Recettes'){
      const apiKey = environment.apiKey;
      const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=3&sort=popularity&sortDirection=desc&apiKey=${apiKey}`;

      this.http.get(apiUrl).subscribe((response: any) => {
        this.filteredRecipes = response.results;
        console.log(response.results);
      });
    }
  }

  selectIngredient(results: any): void {
    if(this.selectedOption == 'Ingrédients'){
      // If not already in selectedIngredient add it
      if (!this.selectedIngredients.find((i) => i.name === results.name)) {
        this.selectedIngredients.push(results);
      }
      this.filteredIngredients = [];
      this.getRecipes();
    }else if(this.selectedOption == 'Recettes'){
      if (!this.selectedRecipe.find((i) => i.name === results.name)) {
        this.selectedRecipe.push(results);
      }
      this.filteredIngredients = [];
      this.getRecipes();
    }
  }

  removeIngredient(ingredient: any): void {
    this.selectedIngredients = this.selectedIngredients.filter(
      (i) => i.name !== ingredient.name
    );
    this.getRecipes();
  }

  // Fetch recipes based on selected ingredients
  getRecipes() {
    if (this.selectedIngredients.length === 0) {
      this.selectedIngredients = []; // No ingredients, no recipes
    }
    // Filter recipes that contain at least one of the selected ingredients
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.ingredients.some((ingredient: { id: any; }) =>
        this.selectedIngredients.some((selectedIngredient) =>
          selectedIngredient.id === ingredient.id 
        )
      )
    );
  }

  // Toggles the dropdown visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

    // Toggles the List dropdown visibility
    toggleListDropdown() {
      this.isListDropdownOpen = !this.isListDropdownOpen;
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
