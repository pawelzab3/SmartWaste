import { Routes } from '@angular/router';
import { CreateReportComponent } from './components/create-report.component';

export const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full' },
  { path: 'report', component: CreateReportComponent }
];
