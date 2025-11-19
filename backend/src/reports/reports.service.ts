import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private repo: Repository<Report>,
  ) {}

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const report = await this.repo.findOne({ where: { id } });
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  create(data: Partial<Report>) {
    const report = this.repo.create(data);
    return this.repo.save(report);
  }

  async update(id: number, data: Partial<Report>) {
    const report = await this.findOne(id);
    Object.assign(report, data);
    return this.repo.save(report);
  }

  async remove(id: number) {
    const report = await this.findOne(id);
    return this.repo.remove(report);
  }
}
