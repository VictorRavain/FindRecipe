import { Component, OnInit, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IngredientsService } from '../services/ingredient.service';

@Component({
  standalone: true,
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  imports: [ NgFor, NgIf ]
})
export class IngredientsComponent implements OnInit {
  isMobileView: boolean = false;  // Controls when to show the burger icon
  ingredients: any[] = []; // To hold the list of ingredients
  isLoading: boolean = true; // To show loading state

  constructor(
    private IngredientsService: IngredientsService,
  ) {
    this.checkWindowWidth(); // Check initial window width
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth(); // Update on window resize
  }

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.IngredientsService.getIngredients().subscribe((data: any[]) => {
      this.ingredients = data;
      this.isLoading = false;
    });
  }

  get categorizedIngredients() {
    const categories = this.ingredients.reduce((acc, ingredient) => {
      if (!acc[ingredient.type]) {
        acc[ingredient.type] = [];
      }
      acc[ingredient.type].push(ingredient);
      return acc;
    }, {});
  
    return Object.keys(categories).map((type) => ({
      type,
      ingredients: categories[type],
    }));
  }

  deleteIngredient(ingredient: any): void {
    // Remove the ingredient locally
    this.ingredients = this.ingredients.filter((item) => item !== ingredient);

    // Optionally, call a service to delete from the database
    this.IngredientsService.deleteIngredient(ingredient.id).subscribe({
      next: () => console.log(`${ingredient.name} deleted successfully`),
      error: (err: any) => console.error('Error deleting ingredient:', err),
    });
  }
  

  // Function to check window width and determine mobile view
  private checkWindowWidth() {
    this.isMobileView = window.innerWidth < 768; // Adjust the width as needed
  }
}
