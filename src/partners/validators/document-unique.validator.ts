import { Injectable} from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PartnersService } from "../partners.service";


@Injectable()
@ValidatorConstraint({async: true})
export class IsDocumentUniqueConstraint implements ValidatorConstraintInterface {
    
    constructor(private readonly partnerService: PartnersService) {}
    
    async validate(document: string): Promise<boolean>{
        const partner = await this.partnerService.findByDocument(document);
        return !partner;
        
    }
    
    defaultMessage(): string {
        return `Document already exists. Field "document" needs to be unique.`;
    }

}