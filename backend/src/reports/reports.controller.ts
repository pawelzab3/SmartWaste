import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';


@Controller('reports')
export class ReportsController {
constructor(private service: ReportsService) {}


@Get()
getAll() {
return this.service.findAll();
}


@Post()
create(@Body() body) {
return this.service.create(body);
}
}