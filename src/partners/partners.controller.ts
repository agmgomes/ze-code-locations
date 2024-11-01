import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create.partner.dto';
import { Partner } from './schemas/partners.schema';

@Controller('/partners')
export class PartnersController {
    constructor(private readonly partnerService: PartnersService) {}
    
    @Post()
    async createPartner(@Body() createPartnerDto: CreatePartnerDto): Promise<Partner | null> {
        return await this.partnerService.create(createPartnerDto);
    }
    
    @Get('/:id')
    async getPartnerById(@Param('id') id:string): Promise<Partner | null> {
        return null;
    }

}