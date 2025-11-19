import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'smartwaste',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ReportsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
