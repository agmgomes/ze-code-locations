import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoDbConfig } from './database.config';
import { ImportService } from 'src/common/services/import.service';
import { Partner, PartnerSchema } from 'src/partners/schemas/partners.schema';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports : [ConfigModule],
            useFactory: getMongoDbConfig,
            inject: [ConfigService]
        }),
        MongooseModule.forFeature([{name: Partner.name, schema: PartnerSchema}])
    ],
    providers: [ImportService]
})
export class DatabaseModule implements OnModuleInit {
    constructor(private readonly importService: ImportService) { }

    async onModuleInit() {
        const shouldPopulate = process.argv.includes('--populate');
        if(shouldPopulate) {
            await this.importService.populateDatabaseFromFile('./src/data/partners.json');
        }
    }
}