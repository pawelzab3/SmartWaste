import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '../services/reports.service';

@Component({
  selector: 'app-create-report',
  template: `
  <mat-card>
    <h2>Zgłoś problem</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field>
        <input matInput placeholder="Tytuł" formControlName="title">
      </mat-form-field>

      <mat-form-field>
        <textarea matInput placeholder="Opis" formControlName="description"></textarea>
      </mat-form-field>

      <button mat-raised-button color="primary">Wyślij</button>
    </form>
  </mat-card>
  `
})
export class CreateReportComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private srv: ReportService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  submit() {
    this.srv.create({
      ...this.form.value,
      status: 'new'
    }).subscribe(() => console.log('Wysłano!'));
  }
}
