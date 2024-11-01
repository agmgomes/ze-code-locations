import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Partner } from './schemas/partners.schema';
import { Model } from 'mongoose';
import { CreatePartnerDto } from './dto/create.partner.dto';

@Injectable()
export class PartnersService {
    constructor(@InjectModel(Partner.name) private partnerModel: Model<Partner>) {}

    async create(partnerDto: CreatePartnerDto ): Promise<Partner> {
        const newPartner = new this.partnerModel(partnerDto);
        return await newPartner.save();
    }


    async getById(id: string) : Promise<Partner | null> {
        return null;
    }


    async findByDocument(document: string): Promise<Partner | null> {
        const partner = await this.partnerModel.findOne({"document" : document});
        return partner;
    }
}
