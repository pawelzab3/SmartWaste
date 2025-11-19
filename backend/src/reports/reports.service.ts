import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';


@Injectable()
export class ReportsService {
constructor(
@InjectRepository(Report)
private repo: Repository<Report>,
) {}


findAll() {
return this.repo.find();
}


create(data: Partial<Report>) {
const report = this.repo.create(data);
return this.repo.save(report);
}
}