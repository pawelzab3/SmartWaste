import { Routes } from '@angular/router';
import { ReportListComponent } from './components/report-list.component';
import { CreateReportComponent } from './components/create-report.component';

export const routes: Routes = [
  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  { path: 'reports', component: ReportListComponent },
  { path: 'reports/new', component: CreateReportComponent },
  { path: 'reports/:id/edit', component: CreateReportComponent },
];
