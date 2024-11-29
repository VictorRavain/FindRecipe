import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../services/ingredient.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  ingredients: any[] = []; // To hold the list of ingredients
  isLoading: boolean = true; // To show loading state

  constructor(
    private IngredientsService: IngredientsService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.IngredientsService.getIngredients().subscribe((data: any[]) => {
      this.ingredients = data;
      this.isLoading = false;
    });
  }
}
