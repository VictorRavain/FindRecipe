import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';
import { InscriptionSuccess } from '../types/inscriptionSuccess.interface';
import { SuccessService } from '../services/success.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, tap} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class loginComponent implements OnInit {
  public succesInscription: InscriptionSuccess | null | undefined;

  @Output() close = new EventEmitter<void>();
  @Output() switchToSignup = new EventEmitter<void>();

  public loginForm: FormGroup;

  public chargementEnCours: boolean = false;

  public loginError: Error | undefined;

  public constructor(

    private successService: SuccessService,
    private fb: FormBuilder,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.succesInscription = this.successService.getInscriptionData();

    if (this.succesInscription) {
      this.loginForm.get('email')?.setValue(this.succesInscription.email);
    }
  }

  public isInvalidField(formControlName: string): boolean {
    const field = this.loginForm.get(formControlName);
    return (field?.invalid && field?.touched) ?? true;
  }

  public login(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.chargementEnCours = true;
      this.authService
        .login(email, password)
        .pipe(
          tap((res) => {
            this.authService.saveToken(res.token);
            this.chargementEnCours = false;
            this.closeModal();
          }),
          catchError((error: HttpErrorResponse) => {
            this.loginError = error.error;
            this.chargementEnCours = false;
            this.cdr.detectChanges(); 
            return EMPTY;
          }),
        )
        .subscribe();
    }
  }

  closeModal() {
    this.close.emit();
  }

  switchSignup() {
    this.switchToSignup.emit();
  }
}