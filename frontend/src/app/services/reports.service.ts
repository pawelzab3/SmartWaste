import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ReportService {
private API = 'http://localhost:3000/reports';


constructor(private http: HttpClient) {}


getAll() {
return this.http.get(this.API);
}


create(report: any) {
return this.http.post(this.API, report);
}
}