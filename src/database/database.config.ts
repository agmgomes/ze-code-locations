import { ConfigService } from "@nestjs/config"

export const getMongoDbConfig = async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URI'),
    dbName: configService.get<string>('MONGO_DB_NAME')
});