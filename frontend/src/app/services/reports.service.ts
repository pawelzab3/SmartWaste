import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Report {
  id?: number;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private API = 'http://localhost:3000/reports';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(this.API);
  }

  get(id: number): Observable<Report> {
    return this.http.get<Report>(`${this.API}/${id}`);
  }

  create(data: Partial<Report>): Observable<Report> {
    return this.http.post<Report>(this.API, data);
  }

  update(id: number, data: Partial<Report>): Observable<Report> {
    return this.http.put<Report>(`${this.API}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
