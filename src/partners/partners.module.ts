import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from './schemas/partners.schema';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { ValidationModule } from './validators/validation.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Partner.name, schema: PartnerSchema}]),
        forwardRef(() => ValidationModule)
    ],
    providers: [
        PartnersService
    ],
    controllers: [PartnersController],
    exports: [PartnersService]
})
export class PartnersModule {}