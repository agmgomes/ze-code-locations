import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PartnersModule } from './partners/partners.module';
import { TesteeeModule } from './testeee/testeee.module';

@Module({
  imports: [PartnersModule, TesteeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
