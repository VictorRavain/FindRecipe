import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-ingredient',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.scss'
})
export class AddIngredientComponent {
  showModal = false;
  scannedData: any = null;
  searchQuery: string = '';
  queryResults: any = [];

  newIngredient = {
    name: '',
    type: '',
    quantite: null,
    unite: '',
    image: '',
  };

  constructor(
    private http : HttpClient,
    private IngredientsComponent : IngredientsComponent,
  ){}

  async startScan() {
    await BarcodeScanner.checkPermission({ force: true });
    await BarcodeScanner.hideBackground();
    console.log("result3");

    try {
      const result = await BarcodeScanner.startScan();
      if (!result.hasContent) {
        alert('No barcode detected. Try again.');
      } else {
        console.log('Barcode content:', result.content);
      }
    } catch (error) {
      console.error('Scanner error:', error);
    }

    BarcodeScanner.showBackground();
  }

  // fetchProductInfo(barcode: string) {
  //   console.log("result2");
  //   const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  //   this.http.get(apiUrl).subscribe((response: any) => {
  //     this.scannedData = response.product || { error: 'Product not found' };
  //   });
  // }

  fetchIngredients() {
    if (this.searchQuery.trim() === '') {
      this.newIngredient.name = '';
      return;
    }

    const apiKey = environment.apiKey;
    const apiUrl = `https://api.spoonacular.com/food/ingredients/search?query=${this.searchQuery}&number=1&apiKey=${apiKey}`;

    this.http.get(apiUrl).subscribe((response: any) => {
      this.queryResults = response.results;
      console.log(response.results);
    });
  }

  selectIngredient(ingredient: any) {
    console.log('Selected Ingredient:', ingredient);
    this.newIngredient.name = ingredient.name;
    this.newIngredient.image = 'https://spoonacular.com/cdn/ingredients_100x100/' + ingredient.image;
    this.searchQuery = ingredient.name;
    this.queryResults = [];
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.newIngredient.name && this.newIngredient.type && this.newIngredient.quantite && this.newIngredient.unite) {
      console.log('New Ingredient:', this.newIngredient);
      this.IngredientsComponent.addIngredient(this.newIngredient);
      this.closeModal();
    } else {
      alert('Please fill in all the fields.');
    }
  }
}