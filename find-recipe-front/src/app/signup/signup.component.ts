import { Component, OnInit } from '@angular/core';
import {
  catchError,
  debounceTime,
  EMPTY,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class signupComponent {
  public signupForm: FormGroup;

  public chargementEnCours: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public isInvalidField(formControlName: string): boolean {
    const field = this.signupForm.get(formControlName);
    return (field?.invalid && field?.touched) ?? true;
  }

  public signup(): void {
    
  }
}