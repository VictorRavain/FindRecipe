import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = `${environment.apiUrl}/recette`;

  constructor(private http: HttpClient) {}

  // Fetch recipes by selected ingredients
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
