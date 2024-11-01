import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Partner } from 'src/partners/schemas/partners.schema';
import * as fs from 'fs';
import * as turf from '@turf/turf'

@Injectable()
export class ImportService{
    constructor(@InjectModel(Partner.name) private partnerModel: Model<Partner>) {}

    async populateDatabaseFromFile(filePath: string): Promise<void> {
        try {
            const count = await this.partnerModel.countDocuments();
            if(count > 0) {
                console.log('Data already exists in database.');
                return;
            }

            const data = fs.readFileSync(filePath, 'utf-8');
            const partners = JSON.parse(data);

            for (const entry of partners) {
                const { coverageArea } = entry;
                try {
                  const isValid = turf.booleanValid(turf.multiPolygon(coverageArea.coordinates));
                  if (!isValid) {
                    console.log(`Error edges crossing`);
                    continue; //continue to the next entry
                  }
            
                  //Tries to save in the database
                  const partner = new this.partnerModel(entry);
                  await partner.save();
            
                } catch (error) {
                    console.error('Error saving in the database', error);
                }
            }
        }catch(error){
            console.log(error);
        }
    }
}