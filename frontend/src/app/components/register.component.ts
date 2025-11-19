import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  template: `
    <mat-card style="max-width:400px; margin:50px auto;">
      <h2>Rejestracja</h2>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline" style="width:100%;">
          <input matInput placeholder="Email" formControlName="email">
        </mat-form-field>

        <mat-form-field appearance="outline" style="width:100%;">
          <input matInput type="password" placeholder="Hasło" formControlName="password">
        </mat-form-field>

        <button mat-raised-button color="primary" style="width:100%;" [disabled]="form.invalid">
          Zarejestruj
        </button>
      </form>

      <button
        mat-button
        color="accent"
        style="width:100%; margin-top:10px;"
        routerLink="/login">
        Mam już konto → Zaloguj
      </button>

    </mat-card>
  `
})
export class RegisterComponent {

  form: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submit() {
    const { email, password } = this.form.value;

    this.auth.register(email!, password!).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.snack.open('Konto utworzone!', 'OK', { duration: 3000 });
        this.router.navigate(['/reports']);
      },
      error: (err) => {
        const msg = err.error?.message || 'Błąd rejestracji';
        this.snack.open(msg, 'Zamknij', { duration: 3000 });
      }
    });
  }
}
