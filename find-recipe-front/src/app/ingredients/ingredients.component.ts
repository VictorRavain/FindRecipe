import { Component, OnInit, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { IngredientsService } from '../services/ingredient.service';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';

@Component({
  standalone: true,
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  imports: [ NgFor, NgIf, AddIngredientComponent ]
})
export class IngredientsComponent implements OnInit {
  isMobileView: boolean = false;  // Controls when to show the burger icon
  isLoading: boolean = true; // To show loading state

  ingredients: any[] = []; // To hold the list of ingredients

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

  addIngredient(ingredient: any): void {
    this.IngredientsService.addIngredient(ingredient).subscribe(
      (createdIngredient) => {
        // Append the new ingredient to the list
        this.ingredients.push(createdIngredient);
      },
      (error) => {
        console.error('Failed to add ingredient:', error);
      }
    );
  }
  

  // Function to check window width and determine mobile view
  private checkWindowWidth() {
    this.isMobileView = window.innerWidth < 768; // Adjust the width as needed
  }
}
