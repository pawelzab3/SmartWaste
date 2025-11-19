import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReportService, Report } from '../services/reports.service';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  template: `
  <mat-card>

    <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
      <h2>Lista zgłoszeń</h2>
      <button mat-raised-button color="primary" routerLink="/reports/new">Nowe zgłoszenie</button>
    </div>

    <table mat-table [dataSource]="reports" class="mat-elevation-z4" *ngIf="reports.length; else empty">

      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let r">{{ r.id }}</td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Tytuł</th>
        <td mat-cell *matCellDef="let r">{{ r.title }}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let r">{{ r.status }}</td>
      </ng-container>

      <ng-container matColumnDef="createdAt">
        <th mat-header-cell *matHeaderCellDef>Data</th>
        <td mat-cell *matCellDef="let r">{{ r.createdAt | date:'short' }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Akcje</th>
        <td mat-cell *matCellDef="let r">

          <button mat-icon-button color="primary" [routerLink]="['/reports', r.id, 'edit']">
            <mat-icon>edit</mat-icon>
          </button>

          <button mat-icon-button color="warn" (click)="delete(r.id!)">
            <mat-icon>delete</mat-icon>
          </button>

        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>
    </table>

    <ng-template #empty>
      <p>Brak zgłoszeń. Dodaj swoje pierwsze.</p>
    </ng-template>

  </mat-card>
  `,
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];
  columns = ['id', 'title', 'status', 'createdAt', 'actions'];

  constructor(private srv: ReportService, private snack: MatSnackBar) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.srv.getAll().subscribe((data) => (this.reports = data));
  }

  delete(id: number) {
    if (!confirm('Na pewno usunąć?')) return;

    this.srv.delete(id).subscribe({
      next: () => {
        this.snack.open('Usunięto zgłoszenie', 'OK', { duration: 3000 });
        this.load();
      },
      error: () => {
        this.snack.open('Błąd przy usuwaniu', 'OK', { duration: 3000 });
      }
    });
  }
}
