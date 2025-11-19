import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { ReportListComponent } from './components/report-list.component';
import { CreateReportComponent } from './components/create-report.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'reports', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reports', component: ReportListComponent, canActivate: [authGuard] },
  { path: 'reports/new', component: CreateReportComponent, canActivate: [authGuard] },
  { path: 'reports/:id/edit', component: CreateReportComponent, canActivate: [authGuard] },
];
