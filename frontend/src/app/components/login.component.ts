import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink,
  ],
  template: `
    <mat-card style="max-width:400px; margin:50px auto;">
      <h2>Logowanie</h2>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline" style="width:100%;">
          <input matInput placeholder="Email" formControlName="email">
        </mat-form-field>

        <mat-form-field appearance="outline" style="width:100%;">
          <input matInput type="password" placeholder="Hasło" formControlName="password">
        </mat-form-field>

        <button mat-raised-button color="primary" style="width:100%;">Zaloguj</button>
          <button mat-button color="accent" routerLink="/register" style="width:100%; margin-top:10px;">
          Nie masz konta? Zarejestruj się
        </button>
      </form>
    </mat-card>
  `
})
export class LoginComponent {

  form: any; // <-- deklarujemy, ale nie tworzymy jeszcze

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    // tutaj dopiero tworzymy form
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  submit() {
    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/reports']);
      },
      error: () => {
        this.snack.open('Niepoprawny email lub hasło', 'OK', { duration: 3000 });
      }
    });
  }
}
