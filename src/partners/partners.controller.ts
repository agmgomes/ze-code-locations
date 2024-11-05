import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create.partner.dto';
import { Partner } from './schemas/partners.schema';
import { FindPartnerByIdDto } from './dto/findbyid.partner.dto';
import { LocationDto } from './dto/location.dto';

@Controller('partners')
export class PartnersController {
    constructor(private readonly partnerService: PartnersService) {}
    
    @Post('create')
    async createPartner(@Body() createPartnerDto: CreatePartnerDto): Promise<Partner | null> {
        return await this.partnerService.create(createPartnerDto);
    }
    
    @Get('id/:id')
    async getPartnerById(@Param()  params: FindPartnerByIdDto): Promise<Partner | null> {
        return await this.partnerService.getById(params.id);
    }

    @Get('nearest')
    async getNearestPartnerByLocation(@Query() locationDto: LocationDto) : Promise<Partner | null > {
        const {longitude, latitude} = locationDto;
        return await this.partnerService.getNearestPartnerByLocation(longitude, latitude);
    }

}