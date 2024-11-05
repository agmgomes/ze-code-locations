import { Injectable, NotFoundException } from '@nestjs/common';
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
        const foundPartner = await this.partnerModel.findById(id).select('-__v');
        
        if(!foundPartner) {
            throw new NotFoundException(`Partner with id: ${id} not found`);
        }
        
        return foundPartner;
    }

    async getNearestPartnerByLocation(longitude: number, latitude: number) : Promise<Partner> {
        const foundPartner = await this.partnerModel.findOne({
            address: {
                $near: {
                    $geometry: {type: "Point", coordinates: [longitude, latitude]}
                },
            },
            coverageArea: {
                $geoIntersects: {
                    $geometry: {type: "Point", coordinates: [longitude, latitude]}
                },
            },
        }).select('tradingName address');

        if(!foundPartner){
            throw new NotFoundException(`No partner near the location:[${longitude}, ${latitude}]`)
        }

        return foundPartner;
    }


    async findByDocument(document: string): Promise<Partner | null> {
        const partner = await this.partnerModel.findOne({"document" : document});
        return partner;
    }
}
