import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService, Report } from '../services/reports.service';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  template: `
  <mat-card>
    <h2>{{ isEdit ? 'Edytuj zgłoszenie' : 'Nowe zgłoszenie' }}</h2>

    <form [formGroup]="form" (ngSubmit)="submit()">

      <mat-form-field appearance="outline" style="display:block; margin-bottom:12px;">
        <input matInput placeholder="Tytuł" formControlName="title">
      </mat-form-field>

      <mat-form-field appearance="outline" style="display:block; margin-bottom:12px;">
        <textarea matInput rows="4" placeholder="Opis" formControlName="description"></textarea>
      </mat-form-field>

      <mat-form-field appearance="outline" style="display:block; margin-bottom:12px;" *ngIf="isEdit">
        <input matInput placeholder="Status" formControlName="status">
      </mat-form-field>

      <button mat-raised-button color="primary" [disabled]="form.invalid">
        {{ isEdit ? 'Zapisz zmiany' : 'Wyślij' }}
      </button>

    </form>
  </mat-card>
  `,
})
export class CreateReportComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  private currentId?: number;

  constructor(
    private fb: FormBuilder,
    private srv: ReportService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['new'],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.currentId = Number(id);

      this.srv.get(this.currentId).subscribe(report => {
        this.form.patchValue(report);
      });
    }
  }

  submit() {
    const req = this.isEdit && this.currentId
      ? this.srv.update(this.currentId, this.form.value)
      : this.srv.create(this.form.value);

    req.subscribe({
      next: () => {
        this.snack.open(
          this.isEdit ? 'Zapisano zmiany' : 'Zgłoszenie wysłane!',
          'OK',
          { duration: 3000 }
        );
        this.router.navigate(['/reports']);
      },
      error: () => this.snack.open('Błąd podczas zapisu', 'Zamknij', { duration: 3000 })
    });
  }
}
